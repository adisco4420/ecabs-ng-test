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
  socket = new WebSocket('ws://ws.coinapi.io/v1/');

  constructor(
    private http: HttpClient,
    private store: Store<IStore>
    ) { 
      this.initializeSocket();
    }

  fetchAssets(params?: any): Observable<IAsset[]> {
    const headers = {'X-CoinAPI-Key': this.api_key}
    return this.http.get<IAsset[]>(`${this.base_url}/assets`, {headers, params}).pipe(map(assets => {
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
  initializeSocket() {    
    this.store.select('favouriteAssets').subscribe(assets => {
      if(assets && assets.length) {
        const asset_ids = assets.map(asset => `${asset}/USD`)
        this.socket.onopen =  (event) => {
          this.socket.send(JSON.stringify({
            type: "hello",
            apikey: this.api_key,
            subscribe_filter_asset_id: asset_ids,
            subscribe_data_type: ["trade"],
            subscribe_filter_symbol_id: ["COINBASE_"]
          }));
        };
      }
    })
  }
  getSocketMessage() {
    return new Observable((subcriber) => {
      this.socket.onmessage = (event) => {              
        const data = JSON.parse(event.data);
        subcriber.next(data);
        this.socket.onerror = (error) => {
          console.log(`WebSocket error: ${error}`);
        };
      }
    })


  }


}
