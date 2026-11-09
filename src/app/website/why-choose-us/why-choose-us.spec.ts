import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WhyChooseUs } from './why-choose-us';

describe('WhyChooseUs', () => {
  let component: WhyChooseUs;
  let fixture: ComponentFixture<WhyChooseUs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhyChooseUs],
    }).compileComponents();

    fixture = TestBed.createComponent(WhyChooseUs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 6 why choose us pillars', () => {
    expect(component.pillars.length).toBe(6);
    expect(component.pillars[0].title).toContain('100% Client Happy Ratio');
    expect(component.pillars[1].title).toContain('3+ Years');
    expect(component.pillars[2].title).toContain('12+ Production Solutions Delivered');
    expect(component.pillars[3].title).toContain('StickyJi');
  });

  it('should have comparison rows matching capabilities', () => {
    expect(component.comparisonRows.length).toBeGreaterThanOrEqual(4);
  });
});

