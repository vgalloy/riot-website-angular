/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FindBarComponent } from './find-bar.component';

describe('FindBarComponent', () => {
  let component: FindBarComponent;
  let fixture: ComponentFixture<FindBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
