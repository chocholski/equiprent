import { Injectable } from '@angular/core';
import { StringBuilder } from 'src/app/tools/stringBuilder';

@Injectable()
export class FileService {

  constructor() { }

  public convertFileToBase64String(file: ArrayBuffer): string {
    const bytes = new Uint8Array(file);
    const dataBuilder = new StringBuilder();

    for (let i = 0; i < bytes.length; i++) {
      dataBuilder.append(String.fromCharCode(bytes[i]));
    }

    return btoa(dataBuilder.toString());
  }

  public async getArrayBuffer(file: File) {
    const arrayBuffer = (await this.getFixedArrayBuffer(file)) as ArrayBuffer;
    if (!arrayBuffer || (arrayBuffer && arrayBuffer.byteLength == 0)) {
      return undefined;
    }

    return arrayBuffer;
  }

  private async getFixedArrayBuffer(file: File) {
    return new Promise(function (resolve) {
      const reader = new FileReader();
      reader.onloadend = function () {
        resolve(reader.result);
      };
      reader.readAsArrayBuffer(file);
    });
  }
}