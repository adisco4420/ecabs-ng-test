import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouriteAssetsComponent } from './favourite-assets.component';

describe('FavouriteAssetsComponent', () => {
  let component: FavouriteAssetsComponent;
  let fixture: ComponentFixture<FavouriteAssetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavouriteAssetsComponent ]
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
