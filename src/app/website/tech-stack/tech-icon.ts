import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-tech-icon',
  standalone: true,
  template: `
    @switch (icon) {
      @case ('angular') {
        <svg viewBox="0 0 250 250" class="svg-icon" aria-hidden="true">
          <path d="M125 30L31.25 63.2812L46.2109 176.953L125 220.312L203.789 176.953L218.75 63.2812L125 30Z" fill="#E23237"/>
          <path d="M125 30V220.312L203.789 176.953L218.75 63.2812L125 30Z" fill="#B52E31"/>
          <path d="M125 52.1484L66.7969 182.422H91.9922L103.711 153.125H146.094L157.812 182.422H183.008L125 52.1484ZM138.867 134.766H111.133L125 101.367L138.867 134.766Z" fill="#FFFFFF"/>
        </svg>
      }
      @case ('react') {
        <svg viewBox="-11.5 -10.23174 23 20.46348" class="svg-icon" aria-hidden="true">
          <circle cx="0" cy="0" r="2.05" fill="#61DAFB"/>
          <g stroke="#61DAFB" stroke-width="1" fill="none">
            <ellipse rx="11" ry="4.2"/>
            <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
            <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
          </g>
        </svg>
      }
      @case ('nextjs') {
        <svg viewBox="0 0 128 128" class="svg-icon" aria-hidden="true">
          <circle cx="64" cy="64" r="64" fill="#000000"/>
          <path d="M96 98L50.5 38H38v52h9.5V52.8l41.6 55.4c2.3-3.2 4.5-6.6 6.4-10.2z" fill="#FFFFFF"/>
          <rect x="80" y="38" width="9.5" height="52" fill="#FFFFFF"/>
        </svg>
      }
      @case ('typescript') {
        <svg viewBox="0 0 128 128" class="svg-icon" aria-hidden="true">
          <rect width="128" height="128" rx="16" fill="#3178C6"/>
          <path d="M56.8 52.8H43.6V94H32.4V52.8H19.2V43.2H56.8V52.8ZM87.2 46.4C87.2 46.4 82 43.2 74 43.2C64.8 43.2 59.2 47.6 59.2 55.2C59.2 69.6 79.6 67.2 79.6 77.2C79.6 81.6 75.6 84.4 69.2 84.4C60.4 84.4 54 79.6 54 79.6L50 88.8C50 88.8 57.6 94.4 68.8 94.4C79.6 94.4 89.6 88.8 89.6 76.8C89.6 62.4 69.2 64.4 69.2 55.2C69.2 52.4 72.4 50.4 76.4 50.4C82.8 50.4 86.8 53.6 86.8 53.6L87.2 46.4Z" fill="#FFFFFF"/>
        </svg>
      }
      @case ('javascript') {
        <svg viewBox="0 0 128 128" class="svg-icon" aria-hidden="true">
          <rect width="128" height="128" rx="16" fill="#F7DF1E"/>
          <path d="M67.3 90.6c1.3 2.1 3.2 3.6 6.3 3.6 3.2 0 5.2-1.6 5.2-3.8 0-2.6-2.1-3.6-5.6-5.1l-1.9-.8c-5.6-2.4-9.3-5.4-9.3-11.8 0-5.8 4.5-10.2 11.5-10.2 5 0 8.6 1.8 11.1 6.1l-5.6 3.6c-1.2-2.1-2.6-3-5.5-3-2.6 0-4.4 1.6-4.4 3.6 0 2.4 1.7 3.4 5.2 4.9l1.9.8c6.6 2.8 9.9 5.7 9.9 12.2 0 6.9-5.4 10.6-12.7 10.6-7.1 0-11.7-3.5-13.6-7.5l5.5-3.2zm-28.5.8c1.3 2.3 2.5 4.3 5.4 4.3 2.8 0 4.6-1.1 4.6-5.5V63.5h7.2v26.7c0 8.1-4.7 11.8-11.9 11.8-6.4 0-10.2-3.4-12.2-7.4l6.9-3.2z" fill="#000000"/>
        </svg>
      }
      @case ('python') {
        <svg viewBox="0 0 128 128" class="svg-icon" aria-hidden="true">
          <path d="M63.6 14C36.8 14 38.5 25.6 38.5 25.6l.03 12h25.4v3.6H29.1S14 39.5 14 66.4c0 26.9 13.2 25.9 13.2 25.9h7.9V80.8s-.4-13.7 13.4-13.7h23.1v-20s.3-13.1-13.4-13.1h-4.6V24s2-10 24-10z" fill="#3776AB"/>
          <circle cx="48" cy="24" r="3.6" fill="#FFFFFF"/>
          <path d="M64.4 114c26.8 0 25.1-11.6 25.1-11.6l-.03-12H64.1v-3.6h34.8s15.1 1.7 15.1-25.2c0-26.9-13.2-25.9-13.2-25.9h-7.9v11.5s.4 13.7-13.4 13.7H56.4v20s-.3 13.1 13.4 13.1h4.6v10s-2 10-24 10z" fill="#FFD43B"/>
          <circle cx="80" cy="104" r="3.6" fill="#FFFFFF"/>
        </svg>
      }
      @case ('nodejs') {
        <svg viewBox="0 0 128 128" class="svg-icon" aria-hidden="true">
          <path d="M64 14L20 39.4v50.8L64 114l44-23.8V39.4L64 14z" fill="#5FA04E"/>
          <path d="M64 14v100l44-23.8V39.4L64 14z" fill="#417E38"/>
          <path d="M64 42c-12 0-20 6.8-20 17 0 16.5 22 13 22 22 0 3-2.6 4.8-6.4 4.8-5.2 0-9.6-2.8-12-6.4l-6.2 5.2c3.8 5.6 10.4 9.4 18.2 9.4 12.8 0 20.8-7 20.8-17.6 0-16.8-22-13.2-22-22.2 0-2.8 2.4-4.4 5.6-4.4 4.6 0 8.2 2.2 10.8 5.4l5.8-5.6C77 44.8 71.2 42 64 42z" fill="#FFFFFF"/>
        </svg>
      }
      @case ('express') {
        <svg viewBox="0 0 128 128" class="svg-icon" aria-hidden="true">
          <rect width="128" height="128" rx="20" fill="#0F172A"/>
          <path d="M30 42h32c8 0 14 5 14 12s-6 12-14 12H44v20H30V42zm14 16h16c3 0 5-1.5 5-4s-2-4-5-4H44v8zm48-16l-14 26 15 28H88l-9-17-9 17H58l15-28-14-26h13l8 16 8-16h14z" fill="#FFFFFF"/>
        </svg>
      }
      @case ('fastapi') {
        <svg viewBox="0 0 128 128" class="svg-icon" aria-hidden="true">
          <rect width="128" height="128" rx="20" fill="#05998B"/>
          <path d="M64 18C38.6 18 18 38.6 18 64s20.6 46 46 46 46-20.6 46-46S89.4 18 64 18zm5.2 67.2l-14 14.8c-.8.8-2 .3-2-1V73.4H39.8c-.9 0-1.4-1-.8-1.7l33.4-35.4c.8-.8 2-.3 2 1v25.6h13.4c.9 0 1.4 1 .8 1.7l-19.4 20.6z" fill="#FFFFFF"/>
        </svg>
      }
      @case ('reactnative') {
        <svg viewBox="0 0 128 128" class="svg-icon" aria-hidden="true">
          <rect width="128" height="128" rx="20" fill="#0F172A"/>
          <g transform="translate(64,64) scale(4.4)">
            <circle cx="0" cy="0" r="2.05" fill="#61DAFB"/>
            <g stroke="#61DAFB" stroke-width="1" fill="none">
              <ellipse rx="11" ry="4.2"/>
              <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
              <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
            </g>
          </g>
        </svg>
      }
      @case ('flutter') {
        <svg viewBox="0 0 128 128" class="svg-icon" aria-hidden="true">
          <path d="M78 18L26 70l16 16L94 34 78 18z" fill="#54C5F8"/>
          <path d="M78 66L42 102l16 16 36-36-16-16z" fill="#02569B"/>
          <path d="M94 82L80 96l14 14 16-16L94 82z" fill="#0175C2"/>
        </svg>
      }
      @case ('mongodb') {
        <svg viewBox="0 0 128 128" class="svg-icon" aria-hidden="true">
          <path d="M64 12c-2.4 14-22 36-22 58 0 20 12 36 22 46 10-10 22-26 22-46 0-22-19.6-44-22-58z" fill="#47A248"/>
          <path d="M64 12v104c10-10 22-26 22-46 0-22-19.6-44-22-58z" fill="#3FA037"/>
          <path d="M64 116c-.5 0-1-.5-1-1V13c0-.6.5-1 1-1s1 .4 1 1v102c0 .5-.5 1-1 1z" fill="#FFFFFF"/>
        </svg>
      }
      @case ('postgresql') {
        <svg viewBox="0 0 128 128" class="svg-icon" aria-hidden="true">
          <path d="M64 14C38.6 14 20 34.6 20 60c0 14 6.8 26.6 17.4 34.4C37.2 96 36 99.4 36 103c0 6.6 9.4 11 21 11s21-4.4 21-11c0-3.6-1.2-7-1.4-8.6C87.2 86.6 94 74 94 60c0-25.4-18.6-46-30-46z" fill="#336791"/>
          <path d="M52 46c0-6 5.4-10 12-10s12 4 12 10-5.4 10-12 10-12-4-12-10z" fill="#FFFFFF"/>
          <circle cx="64" cy="46" r="5" fill="#336791"/>
          <path d="M56 70c0 8 3.6 14 8 14s8-6 8-14h-16z" fill="#FFFFFF"/>
        </svg>
      }
      @case ('redis') {
        <svg viewBox="0 0 128 128" class="svg-icon" aria-hidden="true">
          <path d="M22 46l42-20 42 20-42 20-42-20z" fill="#D82C20"/>
          <path d="M22 64l42 20v24l-42-20V64z" fill="#A3241C"/>
          <path d="M106 64l-42 20v24l42-20V64z" fill="#B8271E"/>
          <path d="M22 64l42-20 42 20-42 20-42-20z" fill="#D82C20"/>
          <ellipse cx="64" cy="64" rx="10" ry="5" fill="#FFFFFF" opacity="0.3"/>
        </svg>
      }
      @case ('aws') {
        <svg viewBox="0 0 128 128" class="svg-icon" aria-hidden="true">
          <rect width="128" height="128" rx="20" fill="#232F3E"/>
          <path d="M36 62l6-16h8l6 16h-7l-1-4h-5l-1 4h-7zm10-8h3l-1.5-6-1.5 6zm17 8l-5-16h7l3 11 3-11h6l3 11 3-11h7l-5 16h-6l-3-10-3 10h-7zm27-2c1.5 1.5 3.5 2 6 2s4.5-.8 4.5-2.5c0-1.5-1-2.2-3.5-2.8l-3.5-.8c-4-1-6-3-6-6.5 0-4 3.5-6.5 8-6.5s7 2 8 4l-4.5 3c-.8-1-2-1.5-3.5-1.5s-2.5.8-2.5 1.8c0 1.2 1 1.8 3 2.2l3.5.8c4.5 1 6.5 3.2 6.5 7 0 4.5-3.5 7-9 7s-8-2-9.5-4.5l4-3z" fill="#FFFFFF"/>
          <path d="M34 84c16 8 36 8 56 0 1.5-.6 2.5 1 1.5 1.8-18 10-40 10-59 0-1.2-1-.2-2.5 1.5-1.8z" fill="#FF9900"/>
          <path d="M92 81l4 6-7 1 3-7z" fill="#FF9900"/>
        </svg>
      }
      @case ('cloudflare') {
        <svg viewBox="0 0 128 128" class="svg-icon" aria-hidden="true">
          <path d="M89.4 52.8C87 42.6 78 35 67.2 35c-10 0-18.4 6.6-21.4 15.8-1.8-.4-3.6-.6-5.4-.6-12 0-21.8 9.6-22.2 21.6-10 .4-18.2 8.6-18.2 18.8 0 10.4 8.4 18.8 18.8 18.8h69.6c11.2 0 20.4-9.2 20.4-20.4 0-10.4-7.8-19-18-20.2l-1.4 4z" fill="#F38020"/>
          <path d="M88 56.8c-.8 0-1.6.2-2.4.4l1.4-4c10.2 1.2 18 9.8 18 20.2 0 11.2-9.2 20.4-20.4 20.4H74l1.6-6.8h11.4c7.4 0 13.6-6 13.6-13.6 0-7.2-5.8-13.2-12.6-13.6v-.2c0-1.8-1.4-3.4-3.2-3.4-.8 0-1.6.4-2.2.8l1.4-4-1.2 4.2z" fill="#FAAD3F"/>
        </svg>
      }
      @case ('docker') {
        <svg viewBox="0 0 128 128" class="svg-icon" aria-hidden="true">
          <path d="M120 60c-2.4-.4-10-1.2-14.4 3-4.4-6.8-11.6-7-11.6-7s-1.6-7-8.8-10.4l-4 3.6c4.6 3.4 5 7.6 5 7.6H20c-3.4 0-6.2 2.8-6.2 6.2 0 14 7.4 27.6 19.4 35 15.2 9.4 35.8 9.4 51 0 14-8.8 21.6-24 21.6-32.8 5.6-.8 11.8-3.2 14.2-5.2z" fill="#2496ED"/>
          <g fill="#2496ED" stroke="#FFFFFF" stroke-width="2">
            <rect x="36" y="46" width="10" height="10" rx="1"/>
            <rect x="48" y="46" width="10" height="10" rx="1"/>
            <rect x="60" y="46" width="10" height="10" rx="1"/>
            <rect x="48" y="34" width="10" height="10" rx="1"/>
            <rect x="60" y="34" width="10" height="10" rx="1"/>
            <rect x="72" y="46" width="10" height="10" rx="1"/>
          </g>
        </svg>
      }
      @case ('vitest') {
        <svg viewBox="0 0 128 128" class="svg-icon" aria-hidden="true">
          <path d="M102 24L74 72l22 4-48 38 12-42-20-4 44-44h18z" fill="#FCC72B"/>
          <path d="M40 68l20 4-12 42 48-38-22-4 28-48H84L40 68z" fill="#729B1B"/>
        </svg>
      }
      @case ('tailwind') {
        <svg viewBox="0 0 128 128" class="svg-icon" aria-hidden="true">
          <path d="M34 68c4-16 16-24 36-24 28 0 32 20 46 24 9.4 2.7 18.6-.7 26-8-4 16-16 24-36 24-28 0-32-20-46-24-9.4-2.7-18.6.7-26 8zm-26 28c4-16 16-24 36-24 28 0 32 20 46 24 9.4 2.7 18.6-.7 26-8-4 16-16 24-36 24-28 0-32-20-46-24-9.4-2.7-18.6.7-26 8z" fill="#06B6D4"/>
        </svg>
      }
      @case ('scss') {
        <svg viewBox="0 0 128 128" class="svg-icon" aria-hidden="true">
          <rect width="128" height="128" rx="20" fill="#CD6799"/>
          <path d="M84 46c-6-1.5-12-1-18 2-6 3-10 8-12 14-3 9 0 18 8 23 8 5 18 6 26 2l3 7c-10 5-22 4-32-2-10-6-15-18-11-30 3-8 9-15 17-18 8-4 16-4 24-2l-3 6zm-40 2c-5 0-9 2-12 5l-4-5c5-4 10-6 16-6 6 0 11 2 15 6 4 4 6 9 6 15 0 9-6 16-14 18l-4 1c-4 1-7 3-7 6 0 2 1 4 3 5 2 1 4 2 7 2 4 0 8-1 11-4l4 5c-4 4-10 6-15 6-6 0-11-2-15-6-4-4-6-9-6-15 0-9 6-16 14-18l4-1c4-1 7-3 7-6 0-2-1-4-3-5-2-1-4-2-7-2z" fill="#FFFFFF"/>
        </svg>
      }
      @case ('git') {
        <svg viewBox="0 0 128 128" class="svg-icon" aria-hidden="true">
          <path d="M116.5 56.5L71.5 11.5c-4.2-4.2-11-4.2-15.2 0L44.8 23l19.2 19.2c4.4-1.5 9.6-.5 13.1 3 3.5 3.5 4.5 8.7 3 13.1l18.5 18.5c4.4-1.5 9.6-.5 13.1 3 4.9 4.9 4.9 12.8 0 17.7-4.9 4.9-12.8 4.9-17.7 0-3.8-3.8-4.7-9.4-2.7-14.1L72.2 65.8v26.9c1.9 1 3.6 2.5 4.8 4.5 4.1 6.5 2.2 15.1-4.3 19.2-6.5 4.1-15.1 2.2-19.2-4.3-4.1-6.5-2.2-15.1 4.3-19.2 2.6-1.6 5.5-2.3 8.4-2.2V63.5c-2.9.1-5.8-.6-8.4-2.2L34.1 75c.1 1.2 0 2.4-.4 3.6-1.9 6.2-8.5 9.8-14.7 7.9-6.2-1.9-9.8-8.5-7.9-14.7 1.9-6.2 8.5-9.8 14.7-7.9 2.5.8 4.7 2.3 6.2 4.3l15.6-15.6L11.5 15.2c-4.2 4.2-4.2 11 0 15.2l45 45c4.2 4.2 11 4.2 15.2 0l44.8-44.8c4.2-4.2 4.2-11 0-15.2z" fill="#F05032"/>
        </svg>
      }
      @case ('nestjs') {
        <svg viewBox="0 0 128 128" class="svg-icon" aria-hidden="true">
          <rect width="128" height="128" rx="20" fill="#0A0A0A"/>
          <path d="M102 36l-14 14c-1-3-4-5-8-5-4 0-8 3-9 7L56 38l-4 6 12 13c-4 3-7 8-7 13 0 2 .3 4 1 6L38 90l10 14 26-26c3 1 6 1 9 1 9 0 17-5 21-13l8-14-10-16z" fill="#E0234E"/>
          <path d="M78 66c0-4-3-7-7-7s-7 3-7 7 3 7 7 7 7-3 7-7z" fill="#FFFFFF"/>
          <path d="M96 42l-8 8 6 12 10-12-8-8z" fill="#FF4081"/>
        </svg>
      }
      @case ('graphql') {
        <svg viewBox="0 0 128 128" class="svg-icon" aria-hidden="true">
          <rect width="128" height="128" rx="20" fill="#0E0E10"/>
          <path d="M64 18l40 23v46L64 110 24 87V41L64 18z" fill="none" stroke="#E10098" stroke-width="4"/>
          <path d="M64 18v92M24 41l80 46M24 87l80-46" stroke="#E10098" stroke-width="3" opacity="0.6"/>
          <circle cx="64" cy="18" r="7" fill="#E10098"/>
          <circle cx="104" cy="41" r="7" fill="#E10098"/>
          <circle cx="104" cy="87" r="7" fill="#E10098"/>
          <circle cx="64" cy="110" r="7" fill="#E10098"/>
          <circle cx="24" cy="87" r="7" fill="#E10098"/>
          <circle cx="24" cy="41" r="7" fill="#E10098"/>
        </svg>
      }
      @case ('mysql') {
        <svg viewBox="0 0 128 128" class="svg-icon" aria-hidden="true">
          <rect width="128" height="128" rx="20" fill="#00758F"/>
          <path d="M92 48c-4-10-12-16-22-16-16 0-26 12-32 26-6 14-8 30-2 42 1 2 3 2 4 0 4-8 10-14 18-18l12-4c6-2 12-6 16-12 4-6 6-12 6-18z" fill="#F29111"/>
          <path d="M64 72c-8 0-14 3-18 8-2 2-2 4 0 5 6 3 14 3 20 0 4-2 6-6 4-10-1-2-3-3-6-3z" fill="#FFFFFF"/>
          <circle cx="76" cy="46" r="3" fill="#FFFFFF"/>
        </svg>
      }
      @case ('supabase') {
        <svg viewBox="0 0 128 128" class="svg-icon" aria-hidden="true">
          <rect width="128" height="128" rx="20" fill="#1C1C1C"/>
          <path d="M70.5 16L24 72.8c-.8 1-.1 2.5 1.2 2.5h33.8L53 112c-.5 1.3 1.1 2.3 2.1 1.4L104 55.2c.8-1 .1-2.5-1.2-2.5H69l7.6-35.3c.3-1.4-1.3-2.3-2.3-1.4z" fill="#3ECF8E"/>
        </svg>
      }
      @case ('kubernetes') {
        <svg viewBox="0 0 128 128" class="svg-icon" aria-hidden="true">
          <rect width="128" height="128" rx="20" fill="#326CE5"/>
          <path d="M64 22l36 17v42l-36 25L28 81V39l36-17z" fill="none" stroke="#FFFFFF" stroke-width="4"/>
          <circle cx="64" cy="64" r="16" fill="none" stroke="#FFFFFF" stroke-width="4"/>
          <circle cx="64" cy="64" r="6" fill="#FFFFFF"/>
          <line x1="64" y1="22" x2="64" y2="48" stroke="#FFFFFF" stroke-width="4"/>
          <line x1="100" y1="39" x2="78" y2="53" stroke="#FFFFFF" stroke-width="4"/>
          <line x1="100" y1="81" x2="78" y2="75" stroke="#FFFFFF" stroke-width="4"/>
          <line x1="64" y1="106" x2="64" y2="80" stroke="#FFFFFF" stroke-width="4"/>
          <line x1="28" y1="81" x2="50" y2="75" stroke="#FFFFFF" stroke-width="4"/>
          <line x1="28" y1="39" x2="50" y2="53" stroke="#FFFFFF" stroke-width="4"/>
        </svg>
      }
      @case ('nginx') {
        <svg viewBox="0 0 128 128" class="svg-icon" aria-hidden="true">
          <rect width="128" height="128" rx="20" fill="#009639"/>
          <path d="M64 22L28 43v42l36 21 36-21V43L64 22zm16 62h-9L48 53v31h-8V44h9l23 31V44h8v40z" fill="#FFFFFF"/>
        </svg>
      }
      @case ('linux') {
        <svg viewBox="0 0 128 128" class="svg-icon" aria-hidden="true">
          <rect width="128" height="128" rx="20" fill="#FCC624"/>
          <path d="M64 24c-14 0-22 10-22 24 0 10 3 18 3 28 0 12-8 16-8 22 0 8 12 12 27 12s27-4 27-12c0-6-8-10-8-22 0-10 3-18 3-28 0-14-8-24-22-24z" fill="#000000"/>
          <ellipse cx="64" cy="80" rx="14" ry="18" fill="#FFFFFF"/>
          <ellipse cx="56" cy="46" rx="3" ry="5" fill="#FFFFFF"/>
          <ellipse cx="72" cy="46" rx="3" ry="5" fill="#FFFFFF"/>
          <circle cx="56" cy="47" r="2" fill="#000000"/>
          <circle cx="72" cy="47" r="2" fill="#000000"/>
          <path d="M58 54c0 4 3 8 6 8s6-4 6-8l-6-2-6 2z" fill="#FFA500"/>
          <ellipse cx="46" cy="108" rx="10" ry="4" fill="#FFA500"/>
          <ellipse cx="82" cy="108" rx="10" ry="4" fill="#FFA500"/>
        </svg>
      }
      @case ('electron') {
        <svg viewBox="0 0 128 128" class="svg-icon" aria-hidden="true">
          <rect width="128" height="128" rx="20" fill="#2B2E3A"/>
          <g transform="translate(64,64) scale(4.2)">
            <circle cx="0" cy="0" r="1.5" fill="#9FEAF9"/>
            <ellipse rx="11" ry="3.5" fill="none" stroke="#9FEAF9" stroke-width="0.9"/>
            <ellipse rx="11" ry="3.5" fill="none" stroke="#9FEAF9" stroke-width="0.9" transform="rotate(60)"/>
            <ellipse rx="11" ry="3.5" fill="none" stroke="#9FEAF9" stroke-width="0.9" transform="rotate(120)"/>
          </g>
        </svg>
      }
      @case ('prisma') {
        <svg viewBox="0 0 128 128" class="svg-icon" aria-hidden="true">
          <rect width="128" height="128" rx="20" fill="#0C344B"/>
          <path d="M64 20L28 88l42 22 36-32L64 20z" fill="#2D3748" opacity="0.4"/>
          <path d="M64 20L28 88l42 22 2-60L64 20z" fill="#5A67D8"/>
          <path d="M64 20l8 30 34 28-36-32-6-26z" fill="#4FD1C5"/>
          <path d="M72 50l34 28-36 32 2-60z" fill="#319795"/>
        </svg>
      }
      @case ('redux') {
        <svg viewBox="0 0 128 128" class="svg-icon" aria-hidden="true">
          <rect width="128" height="128" rx="20" fill="#764ABC"/>
          <g fill="none" stroke="#FFFFFF" stroke-width="3" transform="translate(64,64)">
            <ellipse rx="36" ry="14" transform="rotate(0)"/>
            <ellipse rx="36" ry="14" transform="rotate(60)"/>
            <ellipse rx="36" ry="14" transform="rotate(120)"/>
            <circle cx="0" cy="0" r="6" fill="#FFFFFF"/>
          </g>
        </svg>
      }
      @case ('responsive') {
        <svg viewBox="0 0 128 128" class="svg-icon" aria-hidden="true">
          <rect width="128" height="128" rx="20" fill="#2563EB"/>
          <rect x="22" y="34" width="60" height="42" rx="4" fill="none" stroke="#FFFFFF" stroke-width="4"/>
          <line x1="16" y1="76" x2="88" y2="76" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round"/>
          <rect x="74" y="50" width="32" height="52" rx="5" fill="#0F172A" stroke="#FFFFFF" stroke-width="4"/>
          <line x1="86" y1="96" x2="94" y2="96" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/>
        </svg>
      }
      @case ('seo') {
        <svg viewBox="0 0 128 128" class="svg-icon" aria-hidden="true">
          <rect width="128" height="128" rx="20" fill="#059669"/>
          <circle cx="56" cy="56" r="26" fill="none" stroke="#FFFFFF" stroke-width="5"/>
          <line x1="76" y1="76" x2="104" y2="104" stroke="#FFFFFF" stroke-width="6" stroke-linecap="round"/>
          <polyline points="42,62 52,50 62,56 72,44" fill="none" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      }
      @default {
        <svg viewBox="0 0 24 24" class="svg-icon" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <polyline points="16 18 22 12 16 6"/>
          <polyline points="8 6 2 12 8 18"/>
        </svg>
      }
    }
  `,
  styles: [
    `
      :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
      }
      .svg-icon {
        width: 100%;
        height: 100%;
        display: block;
        object-fit: contain;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechIcon {
  @Input({ required: true }) icon!: string;
}

/**
 * Maps any technology name string to its corresponding TechIcon SVG key.
 */
export function getTechIconKey(name: string): string {
  const n = (name || '').toLowerCase().trim();
  if (n.includes('angular')) return 'angular';
  if (n.includes('typescript')) return 'typescript';
  if (n.includes('javascript') || n === 'js') return 'javascript';
  if (n.includes('react native') || n.includes('reactnative')) return 'reactnative';
  if (n.includes('react')) return 'react';
  if (n.includes('next')) return 'nextjs';
  if (n.includes('python')) return 'python';
  if (n.includes('node')) return 'nodejs';
  if (n.includes('express')) return 'express';
  if (n.includes('fastapi')) return 'fastapi';
  if (n.includes('flutter')) return 'flutter';
  if (n.includes('mongo')) return 'mongodb';
  if (n.includes('postgres')) return 'postgresql';
  if (n.includes('redis')) return 'redis';
  if (n.includes('aws')) return 'aws';
  if (n.includes('cloudflare')) return 'cloudflare';
  if (n.includes('docker')) return 'docker';
  if (n.includes('vitest') || n.includes('playwright')) return 'vitest';
  if (n.includes('tailwind')) return 'tailwind';
  if (n.includes('scss') || n.includes('sass')) return 'scss';
  if (n.includes('git')) return 'git';
  if (n.includes('nest')) return 'nestjs';
  if (n.includes('graphql')) return 'graphql';
  if (n.includes('mysql')) return 'mysql';
  if (n.includes('supabase') || n.includes('firebase')) return 'supabase';
  if (n.includes('k8s') || n.includes('kubernetes')) return 'kubernetes';
  if (n.includes('linux')) return 'linux';
  if (n.includes('nginx')) return 'nginx';
  if (n.includes('electron')) return 'electron';
  if (n.includes('prisma')) return 'prisma';
  if (n.includes('redux') || n.includes('ngrx')) return 'redux';
  if (n.includes('seo')) return 'seo';
  if (n.includes('responsive') || n.includes('web')) return 'responsive';
  return 'code';
}
