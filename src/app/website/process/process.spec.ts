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

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 5 structured development process steps matching orbital layout', () => {
    expect(component.steps.length).toBe(5);
    expect(component.steps[0].id).toBe('01');
    expect(component.steps[0].name).toBe('Secure by Design');
    expect(component.steps[1].id).toBe('02');
    expect(component.steps[1].name).toBe('AI-Powered Development');
    expect(component.steps[2].id).toBe('03');
    expect(component.steps[2].name).toBe('Clean Code Quality');
    expect(component.steps[3].id).toBe('04');
    expect(component.steps[3].name).toBe('Tested Before Release');
    expect(component.steps[4].id).toBe('05');
    expect(component.steps[4].name).toBe('Reliable Deployment');
  });

  it('should switch active step on selectStep and update activeStep computed signal', () => {
    expect(component.activeStepIndex()).toBe(0);
    expect(component.activeStep().id).toBe('01');
    expect(component.activeStep().name).toBe('Secure by Design');

    component.selectStep(2);
    expect(component.activeStepIndex()).toBe(2);
    expect(component.activeStep().id).toBe('03');
    expect(component.activeStep().name).toBe('Clean Code Quality');
    expect(component.activeStep().deliverables.length).toBeGreaterThan(0);
  });

  it('should cycle to the next step and wrap around', () => {
    component.selectStep(4);
    expect(component.activeStepIndex()).toBe(4);
    component.nextStep();
    expect(component.activeStepIndex()).toBe(0);
  });

  it('should pause and resume autoplay on hover', () => {
    expect(component.isPaused()).toBe(false);
    component.pauseAutoPlay();
    expect(component.isPaused()).toBe(true);
    component.resumeAutoPlay();
    expect(component.isPaused()).toBe(false);
  });
});
