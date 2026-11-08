import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AboutPage } from './about-page';

describe('AboutPage', () => {
  let component: AboutPage;
  let fixture: ComponentFixture<AboutPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutPage],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  }, 30000);

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 4 foundational commitments', () => {
    expect(component.commitments.length).toBe(4);
    expect(component.commitments[0].title).toBe('Clean Formulations');
    expect(component.commitments[1].title).toBe('Thoughtful Sourcing');
    expect(component.commitments[2].title).toBe('Daily Reliability');
    expect(component.commitments[3].title).toBe('Science-Informed');
  });

  it('should have 4 sequential process stages', () => {
    expect(component.processStages.length).toBe(4);
    expect(component.processStages[0].step).toBe('01');
    expect(component.processStages[0].title).toBe('Research');
    expect(component.processStages[3].step).toBe('04');
    expect(component.processStages[3].title).toBe('Deliver');
  });

  it('should have 3 practice routine cards with 100% IP and agility', () => {
    expect(component.practiceCards.length).toBe(3);
    expect(component.practiceCards[0].title).toBe('Morning Velocity');
    expect(component.practiceCards[1].title).toBe('Daily Balance');
    expect(component.practiceCards[2].title).toBe('Enduring Partnership');
  });
});
