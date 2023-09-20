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
  pagination = { itemsPerPage: 20, currentPage: 1 };
  unFilteredAssets: IAsset[] | undefined;
  searchTerm = ''

  constructor(private assetSrv: AssetService) { }

  ngOnInit(): void {
    this.fetchAssets();
  }

  fetchAssets() {
    this.assetSrv.fetchCryptoAssets().subscribe(assets => {
      this.unFilteredAssets = this.assets = assets;
    })
  }
  searchAsset() {
    this.pagination.currentPage = 1;
    const searchTerm = this.searchTerm.toLowerCase();
    this.assets = this.unFilteredAssets?.filter(asset => asset.name.toLowerCase().includes(searchTerm))    
  }
  pageChange(event: number) {
    this.pagination.currentPage = event;
  }

}
