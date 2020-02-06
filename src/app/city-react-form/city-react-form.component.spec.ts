import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CityReactFormComponent } from './city-react-form.component';

describe('CityReactFormComponent', () => {
  let component: CityReactFormComponent;
  let fixture: ComponentFixture<CityReactFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CityReactFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CityReactFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
