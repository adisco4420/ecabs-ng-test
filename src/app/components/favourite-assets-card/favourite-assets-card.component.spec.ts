import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouriteAssetsCardComponent } from './favourite-assets-card.component';

describe('FavouriteAssetsCardComponent', () => {
  let component: FavouriteAssetsCardComponent;
  let fixture: ComponentFixture<FavouriteAssetsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavouriteAssetsCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavouriteAssetsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
