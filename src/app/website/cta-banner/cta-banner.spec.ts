import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { CtaBanner } from './cta-banner';

describe('CtaBanner', () => {
  let component: CtaBanner;
  let fixture: ComponentFixture<CtaBanner>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CtaBanner],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(CtaBanner);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 4 key company trust stats: 3+ years, 100% happy ratio, 12+ projects, 1 own SaaS', () => {
    expect(component.trustStats.length).toBe(4);
    expect(component.trustStats[0].value).toBe('3+');
    expect(component.trustStats[1].value).toBe('100%');
    expect(component.trustStats[2].value).toBe('12+');
    expect(component.trustStats[3].value).toBe('1');
  });

  it('should emit contactClick on onDiscuss', () => {
    let emitted = false;
    component.contactClick.subscribe(() => (emitted = true));
    component.onDiscuss();
    expect(emitted).toBe(true);
  });
});

