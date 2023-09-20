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
  iconUrl = 'https://s3.eu-central-1.amazonaws.com/bbxt-static-icons/type-id/png_16';
  priceCurrency = '$'
  constructor(private assetSrv: AssetService) { }

  ngOnInit(): void {
    this.fetchAssets();
  }

  fetchAssets() {
    this.assetSrv.fetchCryptoAssets().subscribe(assets => {
      this.assets = assets;      
    })
  }

}
