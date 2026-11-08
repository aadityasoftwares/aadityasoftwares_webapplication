import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ContactPage } from './contact-page';

describe('ContactPage', () => {
  let component: ContactPage;
  let fixture: ComponentFixture<ContactPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactPage],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  }, 30000);

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate required form fields on submit', () => {
    expect(component.errorMessage()).toBe('');
    component.onSubmit();
    expect(component.errorMessage()).toContain('Please fill out all required fields');
    expect(component.isSubmitted()).toBe(false);
  });

  it('should submit successfully when required fields are populated', () => {
    component.formData.fullName = 'Aaditya Sharma';
    component.formData.email = 'aaditya@example.com';
    component.formData.projectDetails = 'Need a scalable Angular 22 and Node.js platform.';
    component.onSubmit();
    expect(component.errorMessage()).toBe('');
  });

  it('should toggle FAQ accordion items', () => {
    expect(component.faqs()[0].open).toBe(true);
    component.toggleFaq(0);
    expect(component.faqs()[0].open).toBe(false);
    component.toggleFaq(0);
    expect(component.faqs()[0].open).toBe(true);
  });
});

