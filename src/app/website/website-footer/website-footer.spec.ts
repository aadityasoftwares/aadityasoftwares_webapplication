import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WebsiteFooter } from './website-footer';

describe('WebsiteFooter', () => {
  let component: WebsiteFooter;
  let fixture: ComponentFixture<WebsiteFooter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebsiteFooter],
    }).compileComponents();

    fixture = TestBed.createComponent(WebsiteFooter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  }, 30000);

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should list all 6 social media platforms', () => {
    expect(component.socialLinks.length).toBe(6);
    const names = component.socialLinks.map((s) => s.name);
    expect(names).toContain('LinkedIn');
    expect(names).toContain('Facebook');
    expect(names).toContain('X (Twitter)');
    expect(names).toContain('Instagram');
    expect(names).toContain('YouTube');
    expect(names).toContain('Discord');
  });

  it('should contain main navigation columns', () => {
    expect(component.footerCols.length).toBe(2);
    expect(component.footerCols[0].title).toBe('Company');
    expect(component.footerCols[1].title).toBe('Services & Capabilities');
  });

  it('should have current year in copyright', () => {
    expect(component.currentYear).toBe(new Date().getFullYear());
  });

  it('should handle newsletter subscription when valid email entered', () => {
    component.newsletterEmail.set('contact@aadityasoftwares.in');
    const dummyEvent = new Event('submit');
    component.onSubscribe(dummyEvent);
    expect(component.isSubscribed()).toBe(true);
    expect(component.newsletterEmail()).toBe('');
  });

  it('should display Vadodara, Gujarat, India as headquarters', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Vadodara, Gujarat, India');
    expect(compiled.textContent).toContain('+91 88498 63872');
    expect(compiled.textContent).toContain('contact@aadityasoftwares.in');
  });
});

