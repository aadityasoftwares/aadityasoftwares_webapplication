import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Hero } from './hero';

describe('Hero', () => {
  let component: Hero;
  let fixture: ComponentFixture<Hero>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Hero],
    }).compileComponents();

    fixture = TestBed.createComponent(Hero);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle video modal on play button click', () => {
    expect(component.isVideoModalOpen()).toBe(false);
    component.onPlay();
    expect(component.isVideoModalOpen()).toBe(true);
    component.closeVideoModal();
    expect(component.isVideoModalOpen()).toBe(false);
  });

  it('should have 5 development steps with initial active step 01', () => {
    expect(component.steps.length).toBe(5);
    expect(component.activeStepIndex()).toBe(0);
    expect(component.activeStep().id).toBe('01');
    expect(component.activeStep().name).toBe('Secure by Design');
  });

  it('should update active step when selectStep is called', () => {
    component.selectStep(2);
    expect(component.activeStepIndex()).toBe(2);
    expect(component.activeStep().id).toBe('03');
    expect(component.activeStep().tag).toBe('Maintainable');
  });

  it('should advance cyclically when nextStep is called', () => {
    component.selectStep(4);
    expect(component.activeStep().id).toBe('05');
    component.nextStep();
    expect(component.activeStepIndex()).toBe(0);
    expect(component.activeStep().id).toBe('01');
  });

  it('should pause and resume autoplay on hover events', () => {
    expect(component.isPaused()).toBe(false);
    component.pauseAutoPlay();
    expect(component.isPaused()).toBe(true);
    component.resumeAutoPlay();
    expect(component.isPaused()).toBe(false);
  });
});

