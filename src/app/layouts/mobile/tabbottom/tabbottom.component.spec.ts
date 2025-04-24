import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabbottomComponent } from './tabbottom.component';

describe('TabbottomComponent', () => {
  let component: TabbottomComponent;
  let fixture: ComponentFixture<TabbottomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabbottomComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabbottomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
