import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncryptpassComponent } from './encryptpass.component';

describe('EncryptpassComponent', () => {
  let component: EncryptpassComponent;
  let fixture: ComponentFixture<EncryptpassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EncryptpassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EncryptpassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
