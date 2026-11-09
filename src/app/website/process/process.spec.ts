import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Process } from './process';

describe('Process', () => {
  let component: Process;
  let fixture: ComponentFixture<Process>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Process],
    }).compileComponents();

    fixture = TestBed.createComponent(Process);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 5 structured development process steps', () => {
    expect(component.steps.length).toBe(5);
    expect(component.steps[0].id).toBe('01');
    expect(component.steps[4].id).toBe('05');
  });

  it('should switch active step on selectStep', () => {
    expect(component.activeStepIndex()).toBe(0);
    component.selectStep(2);
    expect(component.activeStepIndex()).toBe(2);
  });
});

