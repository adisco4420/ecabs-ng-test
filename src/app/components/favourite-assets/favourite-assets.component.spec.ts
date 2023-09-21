import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { FavouriteAssetsComponent } from './favourite-assets.component';
import { AssetService } from 'src/app/services/asset.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('FavouriteAssetsComponent', () => {
  let component: FavouriteAssetsComponent;
  let fixture: ComponentFixture<FavouriteAssetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        FavouriteAssetsComponent 
      ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        AssetService,
        provideMockStore({}),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavouriteAssetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
