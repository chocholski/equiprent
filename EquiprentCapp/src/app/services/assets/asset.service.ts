import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AssetService {

  constructor(private readonly httpClient: HttpClient) { }

  async doesAssetExistAsync(assetUrl: string): Promise<boolean> {
    try {
      await lastValueFrom(this.httpClient.head(assetUrl, { observe: 'response' }));
      return true;
    } catch (error) {
      return false;
    }
  }
}