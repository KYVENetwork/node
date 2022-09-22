import { IBackend } from "../types/interfaces";

import crypto from "crypto";
import bcrypt from "bcryptjs";
import prompts from "prompts";
import fs from "fs";
import path from "path/posix";

interface IFile {
  passhash: string;
  salt: string;
  iv: string;
  content: string;
}

export class Keys implements IBackend {
  private path: string = path.join(
    process.env.KYSOR_HOME || process.env.HOME!,
    ".kysor"
  );
  private fileName: string = "staker.info";

  private encryptionAlgo: string = "aes-256-cbc";
  private encryptionEncoding: BufferEncoding = "base64";
  private bufferEncryption: BufferEncoding = "utf-8";

  public async init() {
    try {
      if (fs.existsSync(path.join(this.path, this.fileName))) {
        console.log("Already initialized KYSOR!");
        return;
      }

      const password = await this.choosePassword();
      const passhash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
      const salt = crypto.randomBytes(16).toString(this.encryptionEncoding);
      const iv = crypto.randomBytes(16).toString(this.encryptionEncoding);
      const content = JSON.stringify({});

      this.writeFile(
        {
          passhash,
          salt,
          iv,
          content,
        },
        this.path
      );
    } catch (err) {
      console.log(`Could not initialized KYSOR: ${err}`);
    }
  }

  public async add(name: string, mnemonic: string) {
    try {
      if (!fs.existsSync(path.join(this.path, this.fileName))) {
        console.log("KYSOR needs to be initialized with: ./kysor init");
      }

      const file = this.readFile(this.path);
      let content = JSON.parse(file.content);

      if (content[name]) {
        console.log(`Already added key with name ${name}`);
      }

      const password = await this.validatePassword();

      content[name] = this.aesEncrypt(
        JSON.stringify(mnemonic),
        password,
        file.salt,
        file.iv
      );

      file.content = JSON.stringify(content);
      this.writeFile(file, this.path);

      console.log(`Added key: ${name}`);
    } catch (err) {
      console.log(`Could not add key: ${err}`);
    }
  }

  public async remove(name: string) {
    try {
      if (!fs.existsSync(path.join(this.path, this.fileName))) {
        console.log("KYSOR needs to be initialized with: ./kysor init");
      }

      const file = this.readFile(this.path);
      let content = JSON.parse(file.content);

      if (!content[name]) {
        console.log(`Key with name "${name}" not found`);
        return;
      }

      delete content[name];

      file.content = JSON.stringify(content);
      this.writeFile(file, this.path);

      console.log(`Removed key: ${name}`);
    } catch (err) {
      console.log(`Could not remove key: ${err}`);
    }
  }

  public async get(name: string): Promise<string | null> {
    try {
      if (!fs.existsSync(path.join(this.path, this.fileName))) {
        console.log("KYSOR needs to be initialized with: ./kysor init");
      }

      const file = this.readFile(this.path);
      let content = JSON.parse(file.content);

      if (!content[name]) {
        console.log(`Key with name "${name}" not found`);
        return null;
      }

      const password = await this.validatePassword();

      return JSON.parse(
        this.aesDecrypt(content[name], password, file.salt, file.iv)
      );
    } catch (err) {
      return null;
    }
  }

  public async list(): Promise<void> {
    try {
      if (!fs.existsSync(path.join(this.path, this.fileName))) {
        console.log("KYSOR needs to be initialized with: ./kysor init");
      }

      const file = this.readFile(this.path);
      let content = JSON.parse(file.content);

      if (Object.keys(content).length) {
        for (let key of Object.keys(content)) {
          console.log(key);
        }
      } else {
        console.log("Found 0 keys");
      }
    } catch (err) {
      console.log(`Could not list keys: ${err}`);
    }
  }

  public async reset(): Promise<void> {
    try {
      if (!fs.existsSync(path.join(this.path, this.fileName))) {
        console.log("KYSOR needs to be initialized with: ./kysor init");
      }

      fs.unlinkSync(path.join(this.path, this.fileName));

      await this.init();

      console.log(`Resetted file backend`);
    } catch (err) {
      console.log(`Could not reset file backend: ${err}`);
    }
  }

  private writeFile(file: IFile, dirPath: string): void {
    const content = Buffer.from(JSON.stringify(file)).toString(
      this.encryptionEncoding
    );

    fs.mkdirSync(dirPath, {
      recursive: true,
    });

    fs.writeFileSync(path.join(dirPath, this.fileName), content);
  }

  private readFile(dirPath: string): IFile {
    const content = fs.readFileSync(
      path.join(dirPath, this.fileName),
      this.bufferEncryption
    );

    return JSON.parse(
      Buffer.from(content, this.encryptionEncoding).toString(
        this.bufferEncryption
      )
    );
  }

  private async validatePassword(): Promise<string> {
    const file = this.readFile(this.path);

    const { password } = await prompts(
      {
        type: "password",
        name: "password",
        message: "Enter your password",
        validate: (value) =>
          bcrypt.compareSync(value, file.passhash)
            ? true
            : `Password is incorrect`,
      },
      {
        onCancel: () => {
          throw Error("Aborted password input");
        },
      }
    );

    return password;
  }

  private async choosePassword(): Promise<string> {
    const { password1 } = await prompts(
      {
        type: "password",
        name: "password1",
        message: "Choose your password",
        validate: (value) =>
          value.length < 8
            ? `Password needs to be at least 8 characters`
            : true,
      },
      {
        onCancel: () => {
          throw Error("Aborted password input");
        },
      }
    );

    await prompts(
      {
        type: "password",
        name: "password2",
        message: "Repeat your password",
        validate: (pass2) => {
          return password1 === pass2 ? true : `Passwords need to be the same`;
        },
      },
      {
        onCancel: () => {
          throw Error("Aborted password input");
        },
      }
    );

    return password1;
  }

  private aesEncrypt(
    message: string,
    key: string,
    salt: string,
    iv: string
  ): string {
    const cipherKey = crypto.scryptSync(key, salt, 32);
    const cipherIv = Buffer.from(iv, this.encryptionEncoding);

    const cipher = crypto.createCipheriv(
      this.encryptionAlgo,
      cipherKey,
      cipherIv
    );
    let encrypted = cipher.update(
      message,
      this.bufferEncryption,
      this.encryptionEncoding
    );
    encrypted += cipher.final(this.encryptionEncoding);
    return encrypted;
  }

  private aesDecrypt(message: string, key: string, salt: string, iv: string) {
    const buff = Buffer.from(message, this.encryptionEncoding);
    const cipherKey = crypto.scryptSync(key, salt, 32);
    const cipherIv = Buffer.from(iv, this.encryptionEncoding);

    const decipher = crypto.createDecipheriv(
      this.encryptionAlgo,
      cipherKey,
      cipherIv
    );
    const deciphered =
      Buffer.from(decipher.update(buff)).toString(this.bufferEncryption) +
      Buffer.from(decipher.final()).toString(this.bufferEncryption);

    return deciphered;
  }
}
