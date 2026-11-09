import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { PrivacyPolicyPage } from './privacy-policy-page';

describe('PrivacyPolicyPage', () => {
  let component: PrivacyPolicyPage;
  let fixture: ComponentFixture<PrivacyPolicyPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivacyPolicyPage],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(PrivacyPolicyPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  }, 60000);

  it('should create the privacy policy page component', () => {
    expect(component).toBeTruthy();
  });

  it('should have 3 hero highlight cards', () => {
    expect(component.highlights.length).toBe(3);
    expect(component.highlights[0].title).toBe('We Never Sell Your Data');
  });

  it('should have 12 structured table of contents sections', () => {
    expect(component.tocSections.length).toBe(12);
    expect(component.tocSections[0].id).toBe('scope-application');
    expect(component.tocSections[11].id).toBe('contact-dpo');
  });

  it('should update activeSection when scrollToSection is called', () => {
    component.scrollToSection('info-collection');
    expect(component.activeSection()).toBe('info-collection');
  });
});

