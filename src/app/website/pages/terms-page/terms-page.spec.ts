import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TermsPage } from './terms-page';

describe('TermsPage', () => {
  let component: TermsPage;
  let fixture: ComponentFixture<TermsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TermsPage],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(TermsPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  }, 60000);

  it('should create the terms of use page component', () => {
    expect(component).toBeTruthy();
  });

  it('should have 3 core terms highlight cards', () => {
    expect(component.highlights.length).toBe(3);
    expect(component.highlights[0].title).toBe('Full Deliverable Ownership');
  });

  it('should have 12 structured terms clauses in table of contents', () => {
    expect(component.tocSections.length).toBe(12);
    expect(component.tocSections[0].id).toBe('agreement-acceptance');
    expect(component.tocSections[11].id).toBe('legal-contact');
  });

  it('should update activeSection when scrollToSection is called', () => {
    component.scrollToSection('ip-ownership');
    expect(component.activeSection()).toBe('ip-ownership');
  });
});

