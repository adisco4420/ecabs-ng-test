import { createReducer, on } from '@ngrx/store';
import { AssetActions} from './asset.actions';

const favouriteAssetsLocal = localStorage.getItem('Favourite-Assets');
const initialFavouriteAssetsState: string[] = favouriteAssetsLocal ? JSON.parse(favouriteAssetsLocal) : []

export const favouriteAssetReducer = createReducer(
    initialFavouriteAssetsState,
    on(AssetActions.saveFavourite, (state, {asset}) => {
        return [...state, asset.asset_id]
    }),
    on(AssetActions.deleteFavourite, (state, {asset}) => {
        return state.filter(item => item !== asset.asset_id);
    }),
);

let initialFavouriteAssetsPriceState: any = {}
if(initialFavouriteAssetsState.length) {
    initialFavouriteAssetsState.forEach(asset => {
        initialFavouriteAssetsPriceState[asset] = {price: 0};
    })
}

export const favouriteAssetsPriceReducer = createReducer(
    initialFavouriteAssetsPriceState,
    on(AssetActions.fetchFavouriteAssetsPrice, (state, {asset_trade_data}) => {
        const prev_state = JSON.parse(JSON.stringify(state));
        const { symbol_id } = asset_trade_data;
        const asset_id = symbol_id.split('_')[2];
        prev_state[asset_id] = asset_trade_data
        return prev_state;
    }),
);