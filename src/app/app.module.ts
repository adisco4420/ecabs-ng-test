import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/core/header/header.component';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { favouriteAssetReducer, favouriteAssetsPriceReducer } from './store/asset.reducers';
import { EffectsModule } from '@ngrx/effects';
import { AssetEffects } from './effects/asset.effects';
import { FavouriteAssetsCardComponent } from './components/favourite-assets-card/favourite-assets-card.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FavouriteAssetsCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule,
    StoreModule.forRoot({
      favouriteAssets: favouriteAssetReducer,
      favouriteAssetsPrice: favouriteAssetsPriceReducer
    }),
    EffectsModule.forRoot([AssetEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
