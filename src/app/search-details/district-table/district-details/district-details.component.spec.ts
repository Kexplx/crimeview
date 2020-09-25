import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictDetailsComponent } from './district-details.component';

describe('DistrictDetailsComponent', () => {
  let component: DistrictDetailsComponent;
  let fixture: ComponentFixture<DistrictDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistrictDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistrictDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
