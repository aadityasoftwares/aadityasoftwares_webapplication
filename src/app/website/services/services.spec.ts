import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Services } from './services';

describe('Services', () => {
  let component: Services;
  let fixture: ComponentFixture<Services>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Services],
    }).compileComponents();

    fixture = TestBed.createComponent(Services);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 6 development principles for Our Engineering Philosophy', () => {
    expect(component.principles.length).toBe(6);
    expect(component.principles[0].title).toBe('Security First');
    expect(component.principles[1].title).toBe('AI + Human Expertise');
    expect(component.principles[2].title).toBe('Clean Architecture');
    expect(component.principles[3].title).toBe('Quality Driven');
    expect(component.principles[4].title).toBe('Performance Focused');
    expect(component.principles[5].title).toBe('Reliable Delivery');
  });

  it('should emit ctaClick on onDiscussProject', () => {
    let clicked = false;
    component.ctaClick.subscribe(() => (clicked = true));
    component.onDiscussProject();
    expect(clicked).toBe(true);
  });

  it('should have 7 core engineering services displayed in showcase', () => {
    expect(component.services.length).toBe(7);
    const titles = component.services.map((s) => s.title);
    expect(titles).toContain('Product Strategy & UI/UX Design');
    expect(titles).toContain('Custom Software Development');
    expect(titles).toContain('AI-Powered Engineering');
    expect(titles).toContain('Mobile App Development');
    expect(titles).toContain('Quality Assurance & Testing');
    expect(titles).toContain('Cloud Infrastructure & DevOps');
    expect(titles).toContain('Maintenance & Continuous Support');
  });

  it('should open and close service details modal', () => {
    const firstService = component.services[0];
    component.openDetail(firstService);
    expect(component.selectedService()).toBe(firstService);

    component.closeDetail();
    expect(component.selectedService()).toBeNull();
  });
});
