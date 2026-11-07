import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { WebsiteHeader } from './website-header';

describe('WebsiteHeader', () => {
  let component: WebsiteHeader;
  let fixture: ComponentFixture<WebsiteHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebsiteHeader],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(WebsiteHeader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle mobile menu', () => {
    expect(component.mobileMenuOpen()).toBe(false);
    component.toggleMobileMenu();
    expect(component.mobileMenuOpen()).toBe(true);
    component.closeMobileMenu();
    expect(component.mobileMenuOpen()).toBe(false);
  });

  it('should emit signupClick event', () => {
    let clicked = false;
    component.signupClick.subscribe(() => (clicked = true));
    component.onSignup(new MouseEvent('click'));
    expect(clicked).toBe(true);
  });
});

