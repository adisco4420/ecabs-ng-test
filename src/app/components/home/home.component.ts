import { Component, OnInit } from '@angular/core';
import { IAsset } from 'src/app/interfaces/asset.interface';
import { AssetService } from 'src/app/services/asset.service';

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

  constructor(private assetSrv: AssetService) { }

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
    this.favouriteAssets = this.assetSrv.fetchFavouriteAssets();
  }
  searchAsset() {
    this.pagination.currentPage = 1;
    const searchTerm = this.searchTerm.toLowerCase();
    this.assets = this.unFilteredAssets?.filter(asset => asset.name.toLowerCase().includes(searchTerm))    
  }
  saveFavouriteAsset(asset: IAsset) {
    this.assetSrv.saveFavouriteAsset(asset);
    this.fetchFavouriteAssets();
  }
  deleteFavouriteAsset(asset: IAsset) {
    this.assetSrv.deleteFavouriteAsset(asset)
    this.fetchFavouriteAssets();
  }
  pageChange(event: number) {
    this.pagination.currentPage = event;
  }

}
