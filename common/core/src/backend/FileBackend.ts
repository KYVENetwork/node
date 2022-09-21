import { IBackend } from "../types";

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

export class FileBackend implements IBackend {
  public name = "FileBackend";

  // When the option "--use-password" is false we store the secrets openly.
  // To make the code more clear we still use the encrypted file backend but use
  // a public default password which is the same as storing the secrets unencrypted.
  private defaultPassword: string = "kyve";

  private defaultPath: string = path.join(process.env.HOME!, ".kyve-node");
  private fileName: string = "accounts.info";

  private encryptionAlgo: string = "aes-256-cbc";
  private encryptionEncoding: BufferEncoding = "base64";
  private bufferEncryption: BufferEncoding = "utf-8";

  public async add(
    name: string,
    secret: string,
    usePassword: boolean,
    customPath: string | undefined
  ) {
    const dirPath = customPath || this.defaultPath;
    let password;

    if (!fs.existsSync(path.join(dirPath, this.fileName))) {
      password = await this.choosePassword(usePassword);
      await this.createFileBackend(password, dirPath);
    }

    try {
      const file = this.readFile(dirPath);

      let content = JSON.parse(file.content);

      if (content[name]) {
        console.log(`${name} already found`);
        return;
      }

      if (!password) {
        password = await this.validatePassword(usePassword, dirPath);
      }

      content[name] = this.aesEncrypt(
        JSON.stringify(secret),
        password,
        file.salt,
        file.iv
      );

      file.content = JSON.stringify(content);
      this.writeFile(file, dirPath);

      console.log(`Added: ${name}`);
    } catch (err) {
      console.log(`Could not add: ${err}`);
    }
  }

  public async remove(
    name: string,
    usePassword: boolean,
    customPath: string | undefined
  ) {
    const dirPath = customPath || this.defaultPath;
    let password;

    if (!fs.existsSync(path.join(dirPath, this.fileName))) {
      password = await this.choosePassword(usePassword);
      await this.createFileBackend(password, dirPath);
    }

    try {
      const file = this.readFile(dirPath);

      let content = JSON.parse(file.content);

      if (!content[name]) {
        console.log(`"${name}" not found`);
        return;
      }

      delete content[name];

      file.content = JSON.stringify(content);
      this.writeFile(file, dirPath);

      console.log(`Removed: ${name}`);
    } catch (err) {
      console.log(`Could not remove: ${err}`);
    }
  }

  public async get(
    name: string,
    usePassword: boolean,
    customPath: string | undefined
  ): Promise<string | null> {
    const dirPath = customPath || this.defaultPath;
    let password;

    if (!fs.existsSync(path.join(dirPath, this.fileName))) {
      password = await this.choosePassword(usePassword);
      await this.createFileBackend(password, dirPath);
    }

    try {
      const file = this.readFile(dirPath);

      let content = JSON.parse(file.content);

      if (!content[name]) {
        console.log(`"${name}" not found`);
        return null;
      }

      if (!password) {
        password = await this.validatePassword(usePassword, dirPath);
      }

      return JSON.parse(
        this.aesDecrypt(content[name], password, file.salt, file.iv)
      );
    } catch (err) {
      return null;
    }
  }

  public async getMultiple(
    names: string[],
    usePassword: boolean,
    customPath: string | undefined
  ): Promise<string[]> {
    const dirPath = customPath || this.defaultPath;
    let password;

    if (!fs.existsSync(path.join(dirPath, this.fileName))) {
      password = await this.choosePassword(usePassword);
      await this.createFileBackend(password, dirPath);
    }

    try {
      const file = this.readFile(dirPath);

      let content = JSON.parse(file.content);

      for (let name of names) {
        if (!content[name]) {
          console.log(`"${name}" not found`);
          null;
        }
      }

      if (!password) {
        password = await this.validatePassword(usePassword, dirPath);
      }

      let secrets: any[] = [];

      for (let name of names) {
        secrets.push(
          JSON.parse(
            this.aesDecrypt(content[name], password, file.salt, file.iv)
          )
        );
      }

      return secrets;
    } catch (err) {
      return [];
    }
  }

  public async list(
    usePassword: boolean,
    customPath: string | undefined
  ): Promise<void> {
    const dirPath = customPath || this.defaultPath;
    let password;

    if (!fs.existsSync(path.join(dirPath, this.fileName))) {
      password = await this.choosePassword(usePassword);
      await this.createFileBackend(password, dirPath);
    }

    try {
      const file = this.readFile(dirPath);

      let content = JSON.parse(file.content);

      for (let key of Object.keys(content)) {
        console.log(key);
      }
    } catch (err) {
      console.log(`Could not list: ${err}`);
    }
  }

  public async reset(customPath: string | undefined): Promise<void> {
    const dirPath = customPath || this.defaultPath;

    if (!fs.existsSync(path.join(dirPath, this.fileName))) {
      console.log(`File backend not found`);
    }

    try {
      fs.unlinkSync(path.join(dirPath, this.fileName));

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

  private async createFileBackend(
    password: string,
    dirPath: string
  ): Promise<void> {
    try {
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
        dirPath
      );
    } catch (err) {
      console.log(`Could not create file backend: ${err}`);
    }
  }

  private async validatePassword(
    usePassword: boolean,
    dirPath: string
  ): Promise<string> {
    const file = this.readFile(dirPath);

    if (usePassword) {
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

    if (!bcrypt.compareSync(this.defaultPassword, file.passhash)) {
      throw Error("Password is incorrect");
    }

    return this.defaultPassword;
  }

  private async choosePassword(usePassword: boolean): Promise<string> {
    if (usePassword) {
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

    return this.defaultPassword;
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
