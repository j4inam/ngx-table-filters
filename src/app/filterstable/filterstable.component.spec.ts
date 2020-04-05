import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterstableComponent } from './filterstable.component';

describe('FilterstableComponent', () => {
  let component: FilterstableComponent;
  let fixture: ComponentFixture<FilterstableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterstableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterstableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
