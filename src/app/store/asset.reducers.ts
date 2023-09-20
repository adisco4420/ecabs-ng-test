import { createReducer, on } from '@ngrx/store';
import { saveFavourite, deleteFavourite } from './asset.actions';

const favouriteAssetsLocal = localStorage.getItem('Favourite-Assets');
const initialFavouriteAssetsState: string[] = favouriteAssetsLocal ? JSON.parse(favouriteAssetsLocal) : []

export const favouriteAssetReducer = createReducer(
    initialFavouriteAssetsState,
    on(saveFavourite, (state, {asset}) => {
        return [...state, asset.asset_id]
    }),
    on(deleteFavourite, (state, {asset}) => {
        return state.filter(item => item !== asset.asset_id);
    }),
);