import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { IAsset } from 'src/app/interfaces/asset.interface';
import { AssetService } from 'src/app/services/asset.service';
import { IStore } from 'src/app/store/store.interface';

@Component({
  selector: 'app-favourite-assets',
  templateUrl: './favourite-assets.component.html',
  styleUrls: ['./favourite-assets.component.sass']
})
export class FavouriteAssetsComponent implements OnInit {
  assets: IAsset[] | undefined;
  constructor(
    private assetSrv: AssetService,
    private store: Store<IStore>
  ) { 
  }

  ngOnInit(): void {
    this.fetchFavouriteAssets()
  }
  fetchFavouriteAssets() {
    this.store.select('favouriteAssets').pipe(take(1)).subscribe(favouriteAssets => {
      if(favouriteAssets && favouriteAssets.length) {
        const assetIds = favouriteAssets.join(',');
        this.fetchAssets(assetIds);      
      } else {
        this.assets = [];
      }
    })
  }
  fetchAssets(assetIds: string) {
    const params = {filter_asset_id: assetIds}
    this.assetSrv.fetchAssets(params).subscribe(assets => {
      this.assets = assets;      
    })
  }

  deleteFavouriteAsset(asset: IAsset) {
    this.assets = this.assets?.filter(ast => ast.asset_id !== asset.asset_id);
    this.assetSrv.deleteFavouriteAsset(asset)
  }

}
