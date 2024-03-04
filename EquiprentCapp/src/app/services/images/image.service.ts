import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AssetService } from '../assets/asset.service';
import { Assets } from 'src/app/assets';

@Injectable()
export class ImageService {

  constructor(
    private readonly assetService: AssetService,
    private readonly httpClient: HttpClient,
    private readonly sanitizer: DomSanitizer) {
  }

  public getImageUrlForFile(file: string | undefined): SafeUrl | undefined {
    return file
      ? this.sanitizer.bypassSecurityTrustUrl(`data:image/jpg;base64, ${file}`)
      : undefined;
  }

  public async getImageUrlWithAssetImageAsync(assetImageFilePath: string) {
    if (await this.assetService.doesAssetExistAsync(assetImageFilePath)) {
      return this.sanitizer.bypassSecurityTrustUrl(assetImageFilePath);
    }

    return undefined;
  }

  public async getNotFoundImageUrlAsync() {
    return await this.getImageUrlWithAssetImageAsync(Assets.images.notFound.path);
  }
}