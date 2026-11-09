import { ComponentFixture, TestBed } from '@angular/core/testing';
import { About } from './about';

describe('About', () => {
  let component: About;
  let fixture: ComponentFixture<About>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [About],
    }).compileComponents();

    fixture = TestBed.createComponent(About);
    component = fixture.componentInstance;
    await fixture.whenStable();
  }, 30000);

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 4 approach items', () => {
    expect(component.approaches.length).toBe(4);
    expect(component.approaches[0].title).toBe('Understand Before We Build');
    expect(component.approaches[3].title).toBe('Deliver With Confidence');
  });

  it('should have 6 differentiators', () => {
    expect(component.differentiators.length).toBe(6);
    expect(component.differentiators[0].title).toBe('Engineering-First Mindset');
    expect(component.differentiators[5].title).toBe('Long-Term Thinking');
  });

  it('should have 4 philosophy pillars', () => {
    expect(component.pillars).toEqual(['SECURITY', 'QUALITY', 'PERFORMANCE', 'SCALABILITY']);
  });

  it('should have 5 methodology points', () => {
    expect(component.methodologyPoints.length).toBe(5);
    expect(component.methodologyPoints[0]).toBe('Clear and focused strategy');
    expect(component.methodologyPoints[4]).toBe('Smart solutions, tailored for you');
  });

  it('should have 4 key metrics configured', () => {
    expect(component.metrics.experience.value).toBe('9+');
    expect(component.metrics.satisfaction.value).toBe('99%');
    expect(component.metrics.projects.value).toBe('100+');
    expect(component.metrics.brands.value).toBe('86+');
  });

  it('should emit contactClick on onWorkTogether', () => {
    let emitted = false;
    component.contactClick.subscribe(() => (emitted = true));
    component.onWorkTogether();
    expect(emitted).toBe(true);
  });
});

