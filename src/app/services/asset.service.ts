import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, map } from 'rxjs';
import { IAsset } from '../interfaces/asset.interface';

@Injectable({
  providedIn: 'root'
})
export class AssetService {
  private base_url = environment.COIN_API_BASE_URL;
  private api_key = environment.COIN_API_KEY;


  constructor(private http: HttpClient) { }

  fetchCryptoAssets(): Observable<IAsset[]> {
    const headers = {'X-CoinAPI-Key': this.api_key}
    return this.http.get<IAsset[]>(`${this.base_url}/assets`, {headers}).pipe(map(assets => {
      return assets.filter(asset => asset.type_is_crypto)
    }))
  }

}
