import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAsset } from 'src/app/interfaces/asset.interface';
import { AssetActions } from 'src/app/store/asset.actions';
import { IStore } from 'src/app/store/store.interface';

@Component({
  selector: 'app-favourite-assets-card',
  templateUrl: './favourite-assets-card.component.html',
  styleUrls: ['./favourite-assets-card.component.sass']
})
export class FavouriteAssetsCardComponent implements OnInit {
  @Input() assets: IAsset[] | undefined = [];
  @Input() favouriteAssets: string[] = [];
  favouriteAssetsPrice: any = {}
  constructor(
    private store: Store<IStore>
  ) { 
    this.fetchFavouriteAssetsPrice();
  }

  ngOnInit(): void {
    this.store.dispatch({ type: AssetActions.onLoadFavouriteAssetsPrice});
  }
  fetchFavouriteAssetsPrice() {
    this.store.select('favouriteAssetsPrice').subscribe(favouriteAssetsPrice => {
      this.favouriteAssetsPrice = favouriteAssetsPrice;
    })
  }
  getPrice(asset: string) {
    let price: any = 0;
    const favouriteAsset = this.favouriteAssetsPrice[asset];
    const findAsset = this.assets?.find(ast => ast.asset_id === asset);
    if(favouriteAsset && favouriteAsset.price) {
      price = this.favouriteAssetsPrice[asset].price;
    } else if(findAsset && findAsset.price_usd) {
      price = findAsset?.price_usd;
    }
    return price;
  }


}
