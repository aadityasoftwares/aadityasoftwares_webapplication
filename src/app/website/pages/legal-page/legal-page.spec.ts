import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { LegalPage } from './legal-page';

describe('LegalPage', () => {
  let component: LegalPage;
  let fixture: ComponentFixture<LegalPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LegalPage],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(LegalPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  }, 60000);

  it('should create the legal compliance page component', () => {
    expect(component).toBeTruthy();
  });

  it('should have 3 core corporate disclosure highlights', () => {
    expect(component.highlights.length).toBe(3);
    expect(component.highlights[0].title).toBe('Statutory Transparency');
  });

  it('should have 6 structured governance pillars in table of contents', () => {
    expect(component.tocSections.length).toBe(6);
    expect(component.tocSections[0].id).toBe('entity-information');
    expect(component.tocSections[5].id).toBe('disclaimers');
  });

  it('should update activeSection when scrollToSection is called', () => {
    component.scrollToSection('vdp-security');
    expect(component.activeSection()).toBe('vdp-security');
  });
});

