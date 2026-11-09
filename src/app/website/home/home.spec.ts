import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Home } from './home';

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    await fixture.whenStable();
  }, 60000);

  it('should create and render all 14 key landing sections', () => {
    expect(component).toBeTruthy();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-website-header')).toBeTruthy();
    expect(compiled.querySelector('app-hero')).toBeTruthy();
    expect(compiled.querySelector('app-trust-highlights')).toBeTruthy();
    expect(compiled.querySelector('app-about')).toBeTruthy();
    expect(compiled.querySelector('app-services')).toBeTruthy();
    expect(compiled.querySelector('app-why-choose-us')).toBeTruthy();
    expect(compiled.querySelector('app-process')).toBeTruthy();
    expect(compiled.querySelector('app-tech-stack')).toBeTruthy();
    expect(compiled.querySelector('app-projects')).toBeTruthy();
    expect(compiled.querySelector('app-industries')).toBeTruthy();
    expect(compiled.querySelector('app-testimonials')).toBeTruthy();
    expect(compiled.querySelector('app-faq')).toBeTruthy();
    expect(compiled.querySelector('app-cta-banner')).toBeTruthy();
    expect(compiled.querySelector('app-website-footer')).toBeTruthy();
  });
});

