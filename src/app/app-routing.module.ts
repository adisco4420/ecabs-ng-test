import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { FavouriteAssetsComponent } from './components/favourite-assets/favourite-assets.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'favourite', component: FavouriteAssetsComponent },
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
