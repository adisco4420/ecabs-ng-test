import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { FavouriteAssetsCardComponent } from './favourite-assets-card.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('FavouriteAssetsCardComponent', () => {
  let component: FavouriteAssetsCardComponent;
  let fixture: ComponentFixture<FavouriteAssetsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavouriteAssetsCardComponent ],
      providers: [
        provideMockStore({}),
      ],
      schemas: [NO_ERRORS_SCHEMA],
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
