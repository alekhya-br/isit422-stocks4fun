import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotesearchComponent } from './quotesearch.component';
import {Component, DebugElement} from "@angular/core";

import {By} from "@angular/platform-browser";

describe('QuotesearchComponent', () => {
  let component: QuotesearchComponent;
  let fixture: ComponentFixture<QuotesearchComponent>;
  let inputElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotesearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotesearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
});


