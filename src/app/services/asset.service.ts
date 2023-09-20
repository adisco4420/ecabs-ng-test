import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, map } from 'rxjs';
import { IAsset } from '../interfaces/asset.interface';
import { Store } from '@ngrx/store';
import { IStore } from '../store/store.interface';
import { AssetActions } from '../store/asset.actions';

@Injectable({
  providedIn: 'root'
})
export class AssetService {
  private base_url = environment.COIN_API_BASE_URL;
  private api_key = environment.COIN_API_KEY;
  private localStorageKey = 'Favourite-Assets'


  constructor(
    private http: HttpClient,
    private store: Store<IStore>
    ) { }

  fetchAssets(): Observable<IAsset[]> {
    const headers = {'X-CoinAPI-Key': this.api_key}
    return this.http.get<IAsset[]>(`${this.base_url}/assets`, {headers}).pipe(map(assets => {
      return assets.filter(asset => asset.type_is_crypto)
    }))
  }
  saveFavouriteAsset(asset: IAsset) {
    const assets = this.fetchFavouriteAssets();
    const result = JSON.stringify([...assets, asset.asset_id]);
    localStorage.setItem(this.localStorageKey, result);
    this.store.dispatch(AssetActions.saveFavourite({asset}))

  }
  deleteFavouriteAsset(asset: IAsset) {
    const assetIds = this.fetchFavouriteAssets();
    const result = assetIds.filter(assetId => assetId !== asset.asset_id);
    localStorage.setItem(this.localStorageKey, JSON.stringify(result));
    this.store.dispatch(AssetActions.deleteFavourite({asset}))
  }
  fetchFavouriteAssets(): string[]  {
    const assetIds = localStorage.getItem(this.localStorageKey);
    let result: any  = [];
    if(assetIds) {
      result = JSON.parse(assetIds)
    }
    return result
  }
}
