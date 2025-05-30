import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachTabsComponent } from './coach-tabs.component';

describe('CoachTabsComponent', () => {
  let component: CoachTabsComponent;
  let fixture: ComponentFixture<CoachTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoachTabsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoachTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
