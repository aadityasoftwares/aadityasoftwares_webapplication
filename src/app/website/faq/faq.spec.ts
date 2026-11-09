import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Faq } from './faq';

describe('Faq', () => {
  let component: Faq;
  let fixture: ComponentFixture<Faq>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Faq],
    }).compileComponents();

    fixture = TestBed.createComponent(Faq);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should answer questions incorporating 3+ years experience, 100% happy ratio, 12+ projects, and StickyJi', () => {
    expect(component.faqs.length).toBeGreaterThanOrEqual(6);
    const firstAnswer = component.faqs[0].answer;
    expect(firstAnswer).toContain('3+');
    expect(firstAnswer).toContain('12+');
    expect(firstAnswer).toContain('100%');
    expect(firstAnswer).toContain('StickyJi');
  });

  it('should toggle accordion open index', () => {
    expect(component.openIndex()).toBe(0);
    component.toggle(1);
    expect(component.openIndex()).toBe(1);
    component.toggle(1);
    expect(component.openIndex()).toBeNull();
  });
});

