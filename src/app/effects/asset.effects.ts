import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError, take } from 'rxjs/operators';
import { AssetService } from '../services/asset.service';
import { AssetActions } from '../store/asset.actions';
 
@Injectable()
export class AssetEffects {
   
  constructor(
    private actions$: Actions,
    private assetSrv: AssetService
  ) {}
 
  loadFavouriteAssetsPrice$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AssetActions.onLoadFavouriteAssetsPrice),
      exhaustMap(() => this.assetSrv.getSocketMessage()
        .pipe(
          map((asset_trade_data: any) => AssetActions.fetchFavouriteAssetsPrice({asset_trade_data})),
          catchError(() => of({ type: '[Assets API] Assets Loaded Error' }))
        )
      )
    )
  );

}
