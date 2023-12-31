import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAsset } from 'src/app/interfaces/asset.interface';
import { AssetService } from 'src/app/services/asset.service';
import { AssetActions } from 'src/app/store/asset.actions';
import { IStore } from 'src/app/store/store.interface';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  assets: IAsset[] | undefined;
  pagination = { itemsPerPage: 20, currentPage: 1 };
  unFilteredAssets: IAsset[] | undefined;
  searchTerm = '';
  favouriteAssets: string[] = [];

  constructor(
    private assetSrv: AssetService,
    private store: Store<IStore>) {}


  ngOnInit(): void {
    this.fetchAssets();
    this.fetchFavouriteAssets();
  }

  fetchAssets() {
    this.assetSrv.fetchAssets().subscribe(assets => {
      this.unFilteredAssets = this.assets = assets;
    })
  }
  isFavouriteAsset(asset: IAsset) {
    return this.favouriteAssets.indexOf(asset.asset_id) >= 0;
  }
  fetchFavouriteAssets() {
    this.store.select('favouriteAssets').subscribe(favouriteAssets => {
      this.favouriteAssets = favouriteAssets;
    })
  }
  searchAsset() {
    this.pagination.currentPage = 1;
    const searchTerm = this.searchTerm.toLowerCase();
    this.assets = this.unFilteredAssets?.filter(asset => asset.name.toLowerCase().includes(searchTerm))    
  }
  saveFavouriteAsset(asset: IAsset) {
    this.assetSrv.saveFavouriteAsset(asset);
    this.store.dispatch({ type: AssetActions.onLoadFavouriteAssetsPrice });
  }
  deleteFavouriteAsset(asset: IAsset) {
    this.assetSrv.deleteFavouriteAsset(asset)
  }
  pageChange(event: number) {
    this.pagination.currentPage = event;
  }

}
