import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GifViewrComponent } from './gif-viewr.component';

describe('GifViewrComponent', () => {
  let component: GifViewrComponent;
  let fixture: ComponentFixture<GifViewrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GifViewrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GifViewrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
