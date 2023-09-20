import { createAction, props } from '@ngrx/store';
import { IAsset, IAssetTradeData } from '../interfaces/asset.interface';

export const saveFavourite = createAction(
    '[Asset Component] SaveFavourite',
    props<{asset: IAsset}>()
);
export const deleteFavourite = createAction(
    '[Asset Component] DeleteFavourite',
    props<{asset: IAsset}>()
);

export const fetchFavouriteAssetsPrice = createAction(
    '[Asset Component] FetchFavouriteAssetsPrice',
    props<{asset_trade_data: IAssetTradeData}>()
);
export const onLoadFavouriteAssetsPrice = '[Assets Page] Load Favourite Assets Price';



export const AssetActions = {
    saveFavourite, 
    deleteFavourite,
    fetchFavouriteAssetsPrice,
    onLoadFavouriteAssetsPrice
}