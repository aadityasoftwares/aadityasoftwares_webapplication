import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Testimonials } from './testimonials';

describe('Testimonials', () => {
  let component: Testimonials;
  let fixture: ComponentFixture<Testimonials>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Testimonials],
    }).compileComponents();

    fixture = TestBed.createComponent(Testimonials);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have client testimonials including SGTC India and Oonloop', () => {
    expect(component.testimonials.length).toBeGreaterThanOrEqual(3);
    const companies = component.testimonials.map((t) => t.company);
    expect(companies).toContain('SGTC INDIA');
    expect(companies).toContain('oonloop');
  });

  it('should advance and reverse testimonial navigation', () => {
    expect(component.activeIndex()).toBe(0);
    component.next();
    expect(component.activeIndex()).toBe(1);
    component.prev();
    expect(component.activeIndex()).toBe(0);
  });
});

