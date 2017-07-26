import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullNavbarComponent } from './full-navbar.component';

describe('FullNavbarComponent', () => {
  let component: FullNavbarComponent;
  let fixture: ComponentFixture<FullNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
