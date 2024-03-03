import { Injectable } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Injectable()
export class ImageService {

  constructor(private readonly sanitizer: DomSanitizer) {
  }

  public getImageSourceForFile(file: string | undefined): SafeUrl | undefined {
    return file
      ? this.sanitizer.bypassSecurityTrustUrl(`data:image/jpg;base64, ${file}`)
      : undefined;
  }
}