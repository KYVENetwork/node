import { IBackend } from "../types";

import crypto from "crypto";
import bcrypt from "bcryptjs";
import prompts from "prompts";
import fs from "fs";

interface IFile {
  passhash: string;
  salt: string;
  iv: string;
  content: string;
}

export class FileBackend implements IBackend {
  public name = "FileBackend";

  private filePath: string = "./accounts.info";
  private encryptionAlgo: string = "aes-256-cbc";
  private encryptionEncoding: BufferEncoding = "base64";
  private bufferEncryption: BufferEncoding = "utf-8";

  public async add(name: string, secret: string) {
    if (!(secret.length === 12 || secret.length === 24)) {
      console.log(`Mnemonic has an invalid format: ${secret}`);
      return;
    }

    let password;

    if (!fs.existsSync(this.filePath)) {
      password = await this.choosePassword();
      await this.createFileBackend(password);
    }

    try {
      const file = this.readFile();

      let content = JSON.parse(file.content);

      if (content[name]) {
        console.log(`Account with name ${name} already found`);
        return;
      }

      if (!password) {
        password = await this.validatePassword();
      }

      content[name] = this.aesEncrypt(
        JSON.stringify(secret),
        password,
        file.salt,
        file.iv
      );

      file.content = JSON.stringify(content);
      this.writeFile(file);

      console.log(`Added account: ${name}`);
    } catch (err) {
      console.log(`Could not add account: ${err}`);
    }
  }

  public async remove(name: string) {
    let password;

    if (!fs.existsSync(this.filePath)) {
      password = await this.choosePassword();
      await this.createFileBackend(password);
    }

    try {
      const file = this.readFile();

      let content = JSON.parse(file.content);

      if (!content[name]) {
        console.log(`Account with name ${name} not found`);
        return;
      }

      delete content[name];

      file.content = JSON.stringify(content);
      this.writeFile(file);

      console.log(`Removed account: ${name}`);
    } catch (err) {
      console.log(`Could not remove account: ${err}`);
    }
  }

  public async reveal(name: string) {
    let password;

    if (!fs.existsSync(this.filePath)) {
      password = await this.choosePassword();
      await this.createFileBackend(password);
    }

    try {
      const file = this.readFile();

      let content = JSON.parse(file.content);

      if (!content[name]) {
        console.log(`Account with name ${name} not found`);
        return;
      }

      if (!password) {
        password = await this.validatePassword();
      }

      const secret = this.aesDecrypt(
        content[name],
        password,
        file.salt,
        file.iv
      );

      console.log(JSON.parse(secret));
    } catch (err) {
      console.log(`Could not reveal account: ${err}`);
    }
  }

  public async get(name: string): Promise<string | null> {
    let password;

    if (!fs.existsSync(this.filePath)) {
      password = await this.choosePassword();
      await this.createFileBackend(password);
    }

    try {
      const file = this.readFile();

      let content = JSON.parse(file.content);

      if (!content[name]) {
        console.log(`Account with name ${name} not found`);
        return null;
      }

      if (!password) {
        password = await this.validatePassword();
      }

      return JSON.parse(
        this.aesDecrypt(content[name], password, file.salt, file.iv)
      );
    } catch (err) {
      return null;
    }
  }

  public async list() {
    let password;

    if (!fs.existsSync(this.filePath)) {
      password = await this.choosePassword();
      await this.createFileBackend(password);
    }

    try {
      const file = this.readFile();

      let content = JSON.parse(file.content);

      const keys = Object.keys(content);

      if (keys.length) {
        for (let key of Object.keys(content)) {
          console.log(key);
        }
      } else {
        console.log(`Found ${Object.keys(content).length} accounts`);
      }
    } catch (err) {
      console.log(`Could not list accounts: ${err}`);
    }
  }

  private writeFile(file: IFile): void {
    const content = Buffer.from(JSON.stringify(file)).toString(
      this.encryptionEncoding
    );

    fs.writeFileSync(this.filePath, content);
  }

  private readFile(): IFile {
    const content = fs.readFileSync(this.filePath, this.bufferEncryption);
    return JSON.parse(
      Buffer.from(content, this.encryptionEncoding).toString(
        this.bufferEncryption
      )
    );
  }

  private async createFileBackend(password: string): Promise<void> {
    try {
      const passhash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
      const salt = crypto.randomBytes(16).toString(this.encryptionEncoding);
      const iv = crypto.randomBytes(16).toString(this.encryptionEncoding);
      const content = JSON.stringify({});

      this.writeFile({
        passhash,
        salt,
        iv,
        content,
      });
    } catch (err) {
      console.log(`Could not create file backend: ${err}`);
    }
  }

  private async validatePassword(): Promise<string> {
    const file = this.readFile();

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
