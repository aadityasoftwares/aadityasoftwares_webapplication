import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { WebsiteHeader } from './website-header';

describe('WebsiteHeader', () => {
  let component: WebsiteHeader;
  let fixture: ComponentFixture<WebsiteHeader>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebsiteHeader],
      providers: [
        provideRouter([
          { path: '', component: class {} },
          { path: 'about', component: class {} },
          { path: 'services', component: class {} },
          { path: 'projects', component: class {} },
          { path: 'contact', component: class {} },
        ]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(WebsiteHeader);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    await fixture.whenStable();
  });

  afterEach(() => {
    fixture.destroy();
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

  it('should emit signupClick when onBookCall is called', () => {
    let clicked = false;
    component.signupClick.subscribe(() => (clicked = true));
    component.onBookCall(new MouseEvent('click'));
    expect(clicked).toBe(true);
  });

  it('should have primary navigation items: Home, About, Service, Project, Contact', () => {
    expect(component.navItems.length).toBe(5);
    const labels = component.navItems.map((n) => n.label);
    expect(labels).toEqual(['Home', 'About', 'Service', 'Project', 'Contact']);
  });

  it('should update activePath and close mobile menu on onNavClick', () => {
    component.mobileMenuOpen.set(true);
    const aboutItem = component.navItems[1];
    component.onNavClick(aboutItem, new MouseEvent('click'));
    expect(component.activePath()).toBe('About');
    expect(component.mobileMenuOpen()).toBe(false);
  });

  it('should navigate to home on logo click', () => {
    const spy = vi.spyOn(router, 'navigate');
    component.onLogoClick(new MouseEvent('click'));
    expect(component.activePath()).toBe('Home');
  });
});
