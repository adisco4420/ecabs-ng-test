import { createAction, props } from '@ngrx/store';
import { IAsset } from '../interfaces/asset.interface';

export const saveFavourite = createAction(
    '[Asset Component] SaveFavourite',
    props<{asset: IAsset}>()
);
export const deleteFavourite = createAction(
    '[Asset Component] DeleteFavourite',
    props<{asset: IAsset}>()
);

export const AssetActions = {
    saveFavourite, 
    deleteFavourite
}