import './style.css';
import { state, effect as _effect, component as _component, h as _h, untrack as _untrack } from './antigravity';

const effect = _effect;
const component = _component as any;
const h = _h as any;
const untrack = _untrack as any;

// --- State Management ---
// State to handle page routing 
const currentRoute = state('home');
const isMobileMenuOpen = state(false);
// State to handle interactive slider values
const esgScore = state(75);

// Logic: Base 4% + (Score * 0.075)%
const simulateReturn = (score: number) => {
  return 4 + score * 0.075;
};

// Data Visualization (Page 4)
// State array for chart data - simple inline SVG scales its points based on this.
const chartData = state(
  Array.from({ length: 11 }, (_, i) => {
    const score = i * 10;
    return { x: score, y: simulateReturn(score) };
  })
);

// --- Icons ---
const Icons = {
  Home: () => `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  Problem: () => `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
  Concepts: () => `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>`,
  HowItWorks: () => `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
  Data: () => `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>`,
  Simulator: () => `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="2" y1="14" x2="6" y2="14"/><line x1="10" y1="8" x2="14" y2="8"/><line x1="18" y1="16" x2="22" y2="16"/></svg>`,
  Mechanisms: () => `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>`,
  References: () => `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`,
  Logo: () => `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>`
};

// --- Page Components ---
// "Define a component() for each page."

const HomePage = component(() => {
  const isLoaded = state(false);
  effect(() => {
    setTimeout(() => { isLoaded.value = true; }, 50);
  });

  return h('div', { class: 'flex flex-col gap-6' },
    h('h2', {}, 'Green Finance: Scaling Impact'),
    h('p', { style: 'font-size: 1.1rem; line-height: 1.6;' }, 'SDGs (Sustainable Development Goals) provide a blueprint for a better future. Green Finance directs capital toward these goals, transforming ecological health into economic strength.'),
    h('div', { 
        class: 'card',
        style: () => `
          transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.8s ease;
          opacity: ${isLoaded.value ? 1 : 0};
          transform: ${isLoaded.value ? 'translateY(0)' : 'translateY(20px)'};
          backdrop-filter: blur(10px);
          border: 1px solid var(--glass-border);
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        `
      },
      h('h3', { style: 'margin-bottom: 1rem; color: #fff; font-size: 1.5rem;' }, 'Our Vision'),
      h('p', { style: 'font-size: 1.05rem; line-height: 1.7;' }, 'To demonstrate the quantifiable link between corporate sustainability (ESG) and financial outperformance. Invest in the planet, gain on your returns.')
    )
  );
});

const SkepticCard = component(() => {
  const isHovered = state(false);
  return h('div', {
    class: () => `card card-hover-effect card-skeptic ${isHovered.value ? 'hovered' : ''}`,
    style: 'margin-bottom: 1rem; padding: 1.5rem;',
    onMouseEnter: () => isHovered.value = true,
    onMouseLeave: () => isHovered.value = false
  },
    h('h3', { class: 'accent-red', style: 'margin-bottom: 0.5rem; font-size: 1.25rem;' }, "The Skeptic's View"),
    h('p', { style: 'font-size: 0.95rem; margin-bottom: 0;' }, 'Prioritizing ESG principles requires sacrificing financial returns. The costs of compliance, green innovation, and ethical supply chains eat directly into profit margins, making "good" companies inherently less competitive.')
  );
});

const VisionaryCard = component(() => {
  const isHovered = state(false);
  return h('div', {
    class: () => `card card-hover-effect card-visionary ${isHovered.value ? 'hovered' : ''}`,
    style: 'margin-bottom: 0; padding: 1.5rem;',
    onMouseEnter: () => isHovered.value = true,
    onMouseLeave: () => isHovered.value = false
  },
    h('h3', { class: 'accent-emerald', style: 'margin-bottom: 0.5rem; font-size: 1.25rem;' }, "The Visionary's View"),
    h('p', { style: 'font-size: 0.95rem; margin-bottom: 0;' }, 'Sustainability is a driver of innovation and efficiency. Strong ESG performance mitigates long-term risks, lowers the cost of capital, and actively generates superior risk-adjusted returns.')
  );
});

const ProblemComponent = component(() => {
  // Pulse animation state
  const pulsePhase = state(0);
  
  // Continuous animation driven by effect, tracking currentRoute to auto-cleanup!
  effect(() => {
    if (currentRoute.value !== 'problem') return; // Subscribes to route, stops when unmounted
    
    const start = performance.now();
    const animate = (time: number) => {
      // Emergency kill switch if route changes
      if (currentRoute.value !== 'problem') return;
      
      const elapsed = time - start;
      // Sine wave oscillating between 0 and 1 over 2.5 seconds
      pulsePhase.value = (Math.sin((elapsed % 2500) / 2500 * Math.PI * 2) + 1) / 2;
      
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  });

  return h('div', { class: 'flex flex-col gap-4' },
    h('div', { class: 'flex flex-col md:flex-row gap-8 items-center' },
      // Left Column
      h('div', { class: 'md:w-1/2 flex flex-col gap-4' },
        h('h2', { style: 'font-size: 3rem; line-height: 1.2; margin-bottom: 0;' }, 'The Core Conflict'),
        h('p', { style: 'font-size: 1.25rem; color: var(--text-primary); opacity: 0.9; margin-bottom: 0;' }, 'For decades, a myth has persisted in boardrooms and trading floors: that prioritizing Environmental, Social, Governance (ESG) principles requires sacrificing financial returns. This is the Sustainability Paradox.'),
      ),
      // Right Column (Cards)
      h('div', { class: 'md:w-1/2 flex flex-col', style: 'width: 100%' },
        SkepticCard(),
        VisionaryCard()
      )
    ),
    // Centered, glowing Question Block with Antigravity effect pulse
    h('div', { 
         class: 'pulse-block text-center',
         style: () => {
           const scale = 1 + pulsePhase.value * 0.015;
           const glow = 10 + pulsePhase.value * 20;
           const alpha = 0.1 + pulsePhase.value * 0.15;
           return `transform: scale(${scale}); box-shadow: 0 0 ${glow}px rgba(16, 185, 129, ${alpha});`;
         }
      },
      h('h3', { class: 'accent-emerald', style: 'margin-bottom: 1rem; font-size: 1.5rem;' }, 'The Crucial Question'),
      h('p', { style: 'font-weight: bold; font-size: 1.5rem; color: #fff; margin-bottom: 0;' }, 'Does investing in a sustainable future fundamentally compromise the fiduciary duty to maximize shareholder value?')
    )
  );
});

const ConceptsPage = component(() => {
  const activeCard = state<number | null>(null);

  const concepts = [
    {
      title: 'SDGs',
      desc: 'Strategic alignment with the 17 UN global goals for a resilient future.',
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>`
    },
    {
      title: 'GREEN FINANCE',
      desc: 'Financial mechanisms like Green Bonds that fund the transition to a low-carbon economy.',
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20"></path><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>`
    },
    {
      title: 'STOCK RETURNS',
      desc: 'The measurable financial alpha generated by superior sustainability performance.',
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>`
    }
  ];

  return h('div', { class: 'flex flex-col gap-6' },
    h('h2', {}, 'Key Concepts'),
    h('p', {}, 'Environmental, Social, and Governance (ESG) metrics serve as the primary proxy for measuring a company\'s contribution to the United Nations SDGs.'),
    h('div', { class: 'concepts-grid' },
      ...concepts.map((c, i) => {
        return h('div', { 
            class: 'card',
            onMouseEnter: () => { activeCard.value = i; },
            onMouseLeave: () => { activeCard.value = null; },
            style: () => `
              transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
              transform: ${activeCard.value === i ? 'scale(1.02)' : 'scale(1)'};
              box-shadow: ${activeCard.value === i ? '0 10px 25px rgba(16, 185, 129, 0.2)' : 'var(--glass-shadow)'};
              border-color: ${activeCard.value === i ? 'var(--emerald)' : 'var(--glass-border)'};
              display: flex;
              flex-direction: column;
              gap: 1rem;
              margin-bottom: 0;
            `
          },
          h('div', { style: 'display: flex; align-items: center; gap: 0.75rem;' },
            h('div', { 
              style: 'color: var(--emerald); display: flex; align-items: center; justify-content: center;',
              innerHTML: c.icon
            }),
            h('h3', { 
              style: 'margin: 0; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Courier New", monospace; letter-spacing: 0.05em; font-size: 1.15rem; color: #fff;' 
            }, c.title)
          ),
          h('p', { style: 'font-size: 0.95rem; margin: 0; line-height: 1.6; color: var(--text-secondary);' }, c.desc)
        );
      })
    )
  );
});

const HowItWorksPage = component(() => {
  // Counters states
  const companies = state(0);
  const years = state(0);

  // Pulse animation for live data connection
  const pulseScale = state(1);
  const pulseOpacity = state(1);

  effect(() => {
    // Escape hatch to stop animations if leaving route
    if (currentRoute.value !== 'how') return;

    // "Count up" animation
    const startTime = performance.now();
    const duration = 1500; // 1.5 seconds
    requestAnimationFrame(function animateCount(time) {
      if (currentRoute.value !== 'how') return; 
      
      let progress = (time - startTime) / duration;
      if (progress > 1) progress = 1;
      
      // easeOutExpo
      const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      companies.value = Math.floor(easeOut * 5000);
      years.value = Math.floor(easeOut * 10);
      
      if (progress < 1) {
        requestAnimationFrame(animateCount);
      } else {
        companies.value = 5000;
        years.value = 10;
      }
    });

    // Pulse animation loop
    let lastPulse = performance.now();
    requestAnimationFrame(function animatePulse(time) {
      if (currentRoute.value !== 'how') return;
      
      const elapsed = time - lastPulse;
      // Pulse expands over 1.5 seconds, then loops
      const pulseProgress = (elapsed % 1500) / 1500;
      
      // Easing the pulse
      pulseScale.value = 1 + pulseProgress * 1.5;
      pulseOpacity.value = 1 - pulseProgress;
      
      requestAnimationFrame(animatePulse);
    });
  });

  return h('div', { class: 'flex flex-col md:flex-row gap-8' },
    // Left Content: "Quantitative Correlation"
    h('div', { class: 'flex flex-col gap-4', style: 'flex: 1.5' },
      h('h2', { style: 'margin-bottom: 0.5rem;' }, 'Quantitative Correlation'),
      h('p', { style: 'font-size: 1.125rem; line-height: 1.7;' }, 'We analyze datasets from over 5,000 global companies, cross-referencing their ESG milestones with quarterly stock performance under market volatility to establish causality.'),
      
      h('div', { style: 'margin-top: 1rem;' },
        h('h3', { style: 'color: white; font-size: 1.2rem; margin-bottom: 1.25rem;' }, 'Data Lifecycle'),
        h('ul', { style: 'color: var(--text-secondary); padding: 0; list-style: none; display: flex; flex-direction: column; gap: 1.5rem;' },
          h('li', { style: 'display: flex; align-items: flex-start; gap: 1rem;' }, 
            h('div', { style: 'position: relative; width: 14px; height: 14px; top: 4px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;' },
              // Static center dot
              h('div', { style: 'width: 10px; height: 10px; background: var(--emerald); border-radius: 50%; position: absolute;' }),
              // Pulsing ring
              h('div', { style: () => `width: 10px; height: 10px; border: 2px solid var(--emerald); border-radius: 50%; opacity: ${pulseOpacity.value}; transform: scale(${pulseScale.value}); position: absolute;` })
            ),
            h('span', { style: 'font-size: 1.05rem; color: var(--text-primary);' }, 'Data Ingestion: Bloomberg & MSCI live feeds.')
          ),
          h('li', { style: 'display: flex; align-items: flex-start; gap: 1rem;' }, 
            h('div', { style: 'width: 14px; height: 14px; top: 4px; flex-shrink: 0; display: flex; align-items: center; justify-content: center;' },
              h('div', { style: 'width: 8px; height: 8px; background: rgba(255,255,255,0.2); border-radius: 50%;' })
            ),
            h('span', { style: 'font-size: 1.05rem;' }, 'Normalization: Adjusting for sector specific risks.')
          ),
          h('li', { style: 'display: flex; align-items: flex-start; gap: 1rem;' }, 
            h('div', { style: 'width: 14px; height: 14px; top: 4px; flex-shrink: 0; display: flex; align-items: center; justify-content: center;' },
              h('div', { style: 'width: 8px; height: 8px; background: rgba(255,255,255,0.2); border-radius: 50%;' })
            ),
            h('span', { style: 'font-size: 1.05rem;' }, 'Backtesting: 10-year historical verification.')
          )
        )
      )
    ),
    // Right Sidebar: "Data Metrics"
    h('div', { 
        class: 'flex flex-col',
        style: 'flex: 1; min-width: 250px; background: rgba(2, 6, 23, 0.4); border-radius: 16px; padding: 2rem; border: 1px solid rgba(255,255,255,0.05); gap: 1.5rem;' 
    },
      h('h3', { style: 'color: white; margin: 0; font-size: 1.1rem; text-transform: uppercase; letter-spacing: 0.05em;' }, 'Data Metrics'),
      
      h('div', { class: 'flex flex-col gap-4', style: 'margin-top: 0.5rem;' },
        // Card 1
        h('div', {
          style: 'background: var(--bg-card); border: 1px solid var(--glass-border); border-radius: 12px; padding: 1.5rem; text-align: center; box-shadow: 0 4px 12px rgba(0,0,0,0.2);'
        },
          h('div', { style: 'color: var(--emerald); font-size: 3rem; font-weight: 800; line-height: 1.1; margin-bottom: 0.5rem;' }, () => `${companies.value}+`),
          h('div', { style: 'color: var(--text-secondary); font-size: 0.85rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;' }, 'Companies Analyzed')
        ),
        // Card 2
        h('div', {
          style: 'background: var(--bg-card); border: 1px solid var(--glass-border); border-radius: 12px; padding: 1.5rem; text-align: center; box-shadow: 0 4px 12px rgba(0,0,0,0.2);'
        },
          h('div', { style: 'color: var(--emerald); font-size: 2.5rem; font-weight: 800; line-height: 1.2; margin-bottom: 0.5rem;' }, () => `${years.value} Years`),
          h('div', { style: 'color: var(--text-secondary); font-size: 0.85rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;' }, 'Historical Backtesting')
        ),
        // Card 3
        h('div', {
          style: 'background: var(--bg-card); border: 1px solid var(--glass-border); border-radius: 12px; padding: 1.5rem; text-align: center; box-shadow: 0 4px 12px rgba(0,0,0,0.2);'
        },
          h('div', { style: 'color: var(--emerald); font-size: 1.5rem; font-weight: 800; line-height: 1.4; margin-bottom: 0.5rem;' }, 'Market Volatility'),
          h('div', { style: 'color: var(--text-secondary); font-size: 0.85rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;' }, 'Risk Adjusted')
        )
      )
    )
  );
});

const MechanismsComponent = component(() => {
  const activeTile = state<number | null>(null);
  const isLoaded = state(false);
  
  // Entry animation triggers shortly after mount
  effect(() => {
    setTimeout(() => {
      isLoaded.value = true;
    }, 50);
  });

  const steps = [
    {
      title: 'Improved Reputation',
      desc: 'Consumers and investors increasingly favor SDG-aligned firms, driving long-term brand equity.',
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`
    },
    {
      title: 'Risk Reduction',
      desc: 'Less exposure to environmental compliance costs, regulatory fines, and supply chain disruptions.',
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`
    },
    {
      title: 'Investor Attraction',
      desc: 'Higher capital inflows from dedicated ESG-focused institutional funds seeking sustainable portfolios.',
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 15-4-4 6.75-6.77a7.79 7.79 0 0 1 11 11L13 22l-4-4 6.39-6.36a2.14 2.14 0 0 0-3-3L6 15"></path><path d="m5 8 4 4"></path><path d="m12 15 4 4"></path></svg>`
    },
    {
      title: 'Long-Term Performance',
      desc: 'Strategic stability prioritizing resilient operations over immediate, fragile short-term gains.',
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4Zm0 0c2 2.67 4 4 6 4a4 4 0 1 0 0-8c-2 0-4 1.33-6 4Z"/></svg>`
    }
  ];

  return h('div', { class: 'flex flex-col gap-6' },
    h('h2', {}, 'Mechanisms of Impact'),
    h('p', {}, 'Explore the core drivers of sustainable value creation. Click a tile to see more details.'),
    h('div', { class: 'mechanisms-grid' },
      ...steps.map((s, i) => {
        return h('div', { 
            style: () => `
              background: transparent;
              border: 1px solid ${activeTile.value === i ? '#10b981' : '#1e293b'};
              box-shadow: ${activeTile.value === i ? '0 0 20px rgba(16, 185, 129, 0.2)' : 'none'};
              border-radius: 16px;
              padding: 2rem;
              cursor: pointer;
              transition: opacity 0.6s ease ${i * 0.1}s, transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${i * 0.1}s, border-color 0.3s, box-shadow 0.3s;
              opacity: ${isLoaded.value ? 1 : 0};
              transform: ${isLoaded.value ? (activeTile.value === i ? 'scale(1.03) translateY(0)' : 'scale(1) translateY(0)') : 'translateY(40px)'};
              min-height: 180px;
              display: flex;
              flex-direction: column;
              justify-content: center;
            `,
            onClick: () => { activeTile.value = activeTile.value === i ? null : i; }
          },
          h('div', {
            style: () => `
              color: ${activeTile.value === i ? '#10b981' : 'var(--text-secondary)'};
              margin-bottom: 1rem;
              transition: color 0.3s;
              display: flex;
              align-items: center;
              justify-content: flex-start;
            `,
            innerHTML: s.icon
          }),
          h('h3', { 
            style: () => `
              font-size: 1.25rem; 
              color: ${activeTile.value === i ? '#fff' : 'var(--text-primary)'};
              margin: 0;
              transition: all 0.3s;
            `
          }, s.title),
          h('p', {
            style: () => `
              margin: 0;
              font-size: 0.95rem;
              color: var(--text-secondary);
              max-height: ${activeTile.value === i ? '120px' : '0px'};
              opacity: ${activeTile.value === i ? 1 : 0};
              overflow: hidden;
              transition: max-height 0.4s ease, opacity 0.4s ease, margin 0.3s ease;
              margin-top: ${activeTile.value === i ? '0.75rem' : '0px'};
            `
          }, s.desc)
        );
      })
    )
  );
});

const DataPage = component(() => {
  // State for dynamic SVG Tooltips
  const hoveredPoint = state({ x: 0, y: 0, px: 0, py: 0, visible: false });

  // State for Entrance Animation
  const drawProgress = state(0);

  effect(() => {
    if (currentRoute.value !== 'data') return;
    
    drawProgress.value = 0;
    
    setTimeout(() => {
      const start = performance.now();
      const duration = 2000; // 2 seconds
      
      requestAnimationFrame(function animate(time) {
        if (currentRoute.value !== 'data') return;
        
        let progress = (time - start) / duration;
        if (progress > 1) progress = 1;
        
        // Ease Out Cubic
        const easeOut = 1 - Math.pow(1 - progress, 3);
        drawProgress.value = Math.max(0.01, easeOut); // prevent 0 width clipPath issues
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      });
    }, 50); // slight delay to ensure DOM mount
  });

  const getCx = (x: number) => 12 + (x / 100) * 85;
  const getCy = (y: number) => 60 - (y / 15) * 60;

  const handlePointerMove = (e: any) => {
    const svg = e.currentTarget;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const ctm = svg.getScreenCTM();
    if (!ctm) return;
    const svgP = pt.matrixTransform(ctm.inverse());
    
    // Find closest node to pointer
    let closest = null;
    let minDist = Infinity;
    
    for (const point of chartData.value as any) {
      const cx = getCx(point.x);
      const cy = getCy(point.y);
      const dist = Math.hypot(cx - svgP.x, cy - svgP.y);
      if (dist < minDist) {
        minDist = dist;
        closest = { x: point.x, y: point.y, px: cx, py: cy };
      }
    }
    
    if (closest && minDist < 15) {
      hoveredPoint.value = { ...closest, visible: true };
    } else {
      if (hoveredPoint.value.visible) {
        hoveredPoint.value = { ...hoveredPoint.value, visible: false };
      }
    }
  };

  const yLabels = [0, 5, 10, 15];
  const xLabels = [0, 20, 40, 60, 80, 100];

  return h('div', { class: 'flex flex-col gap-6' },
    h('div', {},
      h('h2', {}, 'ESG vs. Annualized Return'),
      h('p', {}, 'The evidence is clear: higher ESG compliance correlates with lower cost of capital and higher risk-adjusted returns.')
    ),
    
    h('div', { class: 'card chart-container', style: 'position: relative; padding: 1.5rem;' },
      // Floating Legend (Top Right)
      h('div', { 
        style: 'position: absolute; top: 1.5rem; right: 1.5rem; background: rgba(15, 23, 42, 0.7); border: 1px solid rgba(255,255,255,0.05); padding: 0.75rem 1rem; border-radius: 8px; backdrop-filter: blur(8px); display: flex; flex-direction: column; gap: 0.5rem; z-index: 10;'
      },
        h('div', { style: 'display: flex; align-items: center; gap: 0.5rem;' },
          h('div', { style: 'width: 16px; height: 3px; background: var(--emerald); border-radius: 2px; box-shadow: 0 0 5px var(--emerald);' }),
          h('span', { style: 'font-size: 0.8rem; color: var(--text-primary); font-weight: 500;' }, 'ESG Integrated')
        ),
        h('div', { style: 'display: flex; align-items: center; gap: 0.5rem;' },
          h('div', { style: 'width: 16px; border-top: 2px dashed #64748b;' }),
          h('span', { style: 'font-size: 0.8rem; color: var(--text-secondary); font-weight: 500;' }, 'Market Baseline')
        )
      ),

      h('svg', { 
        viewBox: '0 -10 105 85', 
        style: 'width: 100%; height: 100%; overflow: visible; touch-action: none; display: block;',
        onPointerMove: handlePointerMove,
        onPointerLeave: () => { if(hoveredPoint.value.visible) hoveredPoint.value = { ...hoveredPoint.value, visible: false }; }
      },
        // Definition for clip path to drive the 2-second Entrance Animation
        h('defs', {},
          h('clipPath', { id: 'drawClip' },
            // Width expands from 0 to 110 based on drawProgress
            h('rect', { x: -10, y: -20, width: () => `${drawProgress.value * 120}`, height: 110 })
          )
        ),

        // Grid Lines (Horizontal)
        ...yLabels.map(y => 
          h('line', { stroke: 'rgba(255,255,255,0.03)', 'stroke-width': '0.3', x1: 12, y1: getCy(y), x2: 97, y2: getCy(y) })
        ),
        
        // Axes Main Lines
        h('line', { stroke: 'rgba(255,255,255,0.15)', 'stroke-width': '0.5', x1: 12, y1: 60, x2: 97, y2: 60 }), // X-axis
        h('line', { stroke: 'rgba(255,255,255,0.15)', 'stroke-width': '0.5', x1: 12, y1: 0, x2: 12, y2: 60 }), // Y-axis
        
        // Axis Titles
        h('text', { x: 54.5, y: 74, fill: '#64748b', 'font-size': '3', 'text-anchor': 'middle', 'font-family': 'var(--font-family)', 'font-weight': '600', 'letter-spacing': '0.05em', 'text-transform': 'uppercase' }, 'ESG Score'),
        h('text', { x: -30, y: 3, fill: '#64748b', 'font-size': '3', 'text-anchor': 'middle', 'font-family': 'var(--font-family)', 'font-weight': '600', transform: 'rotate(-90)', 'letter-spacing': '0.05em', 'text-transform': 'uppercase' }, 'Return (%)'),

        // Y-Axis Numeric Labels (Muted, text-slate-500 equivalent)
        ...yLabels.map(y => 
          h('text', { x: 10, y: getCy(y), fill: '#64748b', 'font-size': '2.5', 'text-anchor': 'end', 'dominant-baseline': 'middle', 'font-family': 'ui-monospace, monospace' }, `${y}%`)
        ),

        // X-Axis Numeric Labels
        ...xLabels.map(x => 
          h('text', { x: getCx(x), y: 64, fill: '#64748b', 'font-size': '2.5', 'text-anchor': 'middle', 'dominant-baseline': 'hanging', 'font-family': 'ui-monospace, monospace' }, `${x}`)
        ),

        // Group driven by entrance animation
        h('g', { 'clip-path': 'url(#drawClip)' },
          // Market Baseline (Dashed at 6.2%)
          h('line', {
            x1: 12, y1: getCy(6.2), x2: 97, y2: getCy(6.2),
            stroke: '#64748b',
            'stroke-width': '0.6',
            'stroke-dasharray': '2, 2',
            opacity: '0.8'
          }),

          // Dynamic Green Path with drop-shadow glow
          h('path', {
            fill: 'none',
            stroke: 'var(--emerald)',
            'stroke-width': '0.8',
            style: 'filter: drop-shadow(0 0 1.5px var(--emerald));',
            d: () => chartData.value.map((p: any, i: number) => {
               return `${i === 0 ? 'M' : 'L'} ${getCx(p.x)} ${getCy(p.y)}`;
            }).join(' ')
          }),

          // Dynamic Points
          ...chartData.value.map((p: any) => {
             return h('circle', {
               fill: 'var(--bg-dark)',
               stroke: 'var(--emerald)',
               'stroke-width': '0.5',
               r: () => (hoveredPoint.value.visible && hoveredPoint.value.x === p.x ? 2.5 : 1.2),
               cx: getCx(p.x), cy: getCy(p.y),
               style: 'transition: r 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);'
             });
          })
        ),

        // Dynamic Tooltip bound to hoveredPoint state (placed outside clipPath)
        h('g', {
           style: () => `transition: opacity 0.2s, transform 0.1s; opacity: ${hoveredPoint.value.visible ? 1 : 0}; pointer-events: none;`
        },
          // Drop line to X axis
          h('line', {
            x1: () => hoveredPoint.value.px, y1: () => hoveredPoint.value.py,
            x2: () => hoveredPoint.value.px, y2: 60,
            stroke: 'var(--emerald)', 'stroke-width': '0.2', 'stroke-dasharray': '1, 1', opacity: '0.5'
          }),
          // Card background
          h('rect', {
             x: () => hoveredPoint.value.px - 14,
             y: () => hoveredPoint.value.py - 16,
             width: 28,
             height: 12,
             rx: 1.5,
             fill: 'var(--bg-card)',
             stroke: 'var(--glass-border)',
             'stroke-width': '0.3',
             style: 'filter: drop-shadow(0 4px 6px rgba(0,0,0,0.5)); backdrop-filter: blur(4px); -webkit-backdrop-filter: blur(4px);'
          }),
          // ESG label
          h('text', {
             x: () => hoveredPoint.value.px,
             y: () => hoveredPoint.value.py - 11.5,
             fill: 'var(--text-primary)',
             'font-size': '2.5',
             'text-anchor': 'middle',
             'font-family': 'var(--font-family)',
             'font-weight': '600'
          }, () => `ESG Score: ${hoveredPoint.value.x.toFixed(0)}`),
          // Return label
          h('text', {
             x: () => hoveredPoint.value.px,
             y: () => hoveredPoint.value.py - 7,
             fill: 'var(--emerald)',
             'font-size': '3',
             'font-weight': '800',
             'text-anchor': 'middle',
             'font-family': 'var(--font-family)'
          }, () => `+${hoveredPoint.value.y.toFixed(2)}%`)
        )
      )
    )
  );
});

const SimulatorPage = component(() => {
  const displayedReturn = state(simulateReturn(esgScore.value));
  let animId = 0;

  // Reactive Subtitle
  const subtitleLabel = state('Risk Focused');

  effect(() => {
    // 1. Update text based on score
    if (esgScore.value < 40) {
      subtitleLabel.value = 'Laggard (High Risk)';
    } else if (esgScore.value < 70) {
      subtitleLabel.value = 'Risk Focused';
    } else if (esgScore.value < 90) {
      subtitleLabel.value = 'Sustainability Leader';
    } else {
      subtitleLabel.value = 'Visionary Standard';
    }

    // 2. Animate the 'Stock Return' number rapidly
    const target = simulateReturn(esgScore.value);
    const start = untrack(() => displayedReturn.value);
    const duration = 250; // Quicker response for fluid slider feel
    const startTime = performance.now();

    const animate = (time: number) => {
      let progress = (time - startTime) / duration;
      if (progress >= 1) progress = 1;
      displayedReturn.value = start + (target - start) * progress;
      if (progress < 1) {
        animId = requestAnimationFrame(animate);
      }
    };
    
    cancelAnimationFrame(animId);
    animId = requestAnimationFrame(animate);
  });

  const getBarHeight = (multiplier: number, offset: number) => {
    let height = (esgScore.value * multiplier) + offset;
    return Math.min(Math.max(height, 5), 100);
  };

  const VerticalBar = (label: string, heightPct: () => number, color: string = 'var(--emerald)') => {
    return h('div', { class: 'flex flex-col items-center gap-2' },
      h('div', { 
        style: 'height: 120px; width: 14px; background: rgba(255,255,255,0.05); border-radius: 7px; overflow: hidden; display: flex; align-items: flex-end;' 
      },
        h('div', {
          style: () => `width: 100%; height: ${heightPct()}%; background: ${color}; border-radius: 7px; transition: height 0.3s ease-out; box-shadow: 0 0 10px ${color}; opacity: 0.9;`
        })
      ),
      h('span', { style: 'font-size: 0.75rem; color: var(--text-secondary); text-transform: uppercase; font-weight: 700; letter-spacing: 0.05em;' }, label)
    );
  };

  return h('div', {},
    h('h2', {}, 'Sustainability Simulator'),
    h('p', {}, 'Adjust the ESG score to witness the compounding impact on long-term portfolio metrics across reputation, risk, and alpha.'),
    h('div', { class: 'card simulator-container', style: 'padding: 2.5rem; display: flex; flex-direction: column; gap: 2.5rem;' },
      h('div', { class: 'slider-group' },
        h('div', { style: 'display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;' },
          h('div', { class: 'flex flex-col' },
            h('span', { class: 'label-esg', style: 'font-size: 1.5rem; color: #fff; margin-bottom: 0.25rem;' }, 'ESG Score'),
            h('span', { style: () => `font-size: 0.9rem; font-weight: 700; color: ${esgScore.value < 40 ? '#ef4444' : 'var(--emerald)'}; transition: color 0.3s; text-transform: uppercase; letter-spacing: 0.05em;` }, () => subtitleLabel.value)
          ),
          h('span', { class: 'label-esg', style: 'font-size: 3rem; font-weight: 900; line-height: 1;' }, () => `${esgScore.value.toFixed(0)}`)
        ),
        // Custom Glow Track Wrapper
        h('div', { style: 'position: relative; padding: 1rem 0; display: flex; align-items: center;' },
          h('input', {
            type: 'range',
            min: '0',
            max: '100',
            class: 'emerald-slider',
            value: () => String(esgScore.value),
            onInput: (e: any) => { esgScore.value = Number(e.target.value); },
            style: 'width: 100%; position: relative; z-index: 2; background: transparent;'
          }),
          // Static background track
          h('div', { style: 'position: absolute; left: 0; right: 0; height: 8px; background: rgba(255,255,255,0.08); border-radius: 4px; z-index: 0;' }),
          // Dynamic Glowing Filled Track
          h('div', {
            style: () => `
              position: absolute; left: 0; height: 8px; border-radius: 4px; z-index: 1; pointer-events: none;
              background: var(--emerald); width: ${esgScore.value}%; opacity: 0.8; box-shadow: 0 0 15px var(--emerald);
            `
          })
        )
      ),
      
      h('div', { class: 'flex flex-col md:flex-row gap-8 items-center justify-between', style: 'padding-top: 1rem; border-top: 1px solid var(--glass-border);' },
        // Left: The Result Focus
        h('div', { class: 'result-box', style: 'flex: 1.5; margin: 0; padding: 2.5rem; text-align: left; display: flex; flex-direction: column; align-items: flex-start;' },
          h('div', { style: 'font-weight: 700; font-size: 1.125rem; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.05em;' }, 'Projected Alpha Return'),
          h('div', { class: 'result-value', style: 'font-size: 4.5rem; display: flex; align-items: baseline; gap: 0.25rem; margin-top: 0.5rem;' }, 
            h('span', {}, () => `${displayedReturn.value.toFixed(2)}`),
            h('span', { style: 'font-size: 2.5rem; color: var(--emerald)' }, '%')
          ),
          // Baseline comparison
          h('div', { style: 'margin-top: 1.5rem; display: flex; align-items: center; gap: 1rem; font-weight: 600; font-size: 0.95rem;' },
            h('span', { style: 'color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.02em;' }, 'Market Baseline:'),
            h('span', { style: 'color: #94a3b8; background: rgba(15, 23, 42, 0.5); padding: 0.4rem 1rem; border-radius: 12px; border: 1px solid rgba(255,255,255,0.05); font-family: monospace; font-size: 1.1rem;' }, '6.20%')
          )
        ),
        
        // Right: Dynamic Indicators (Vertical Bars)
        h('div', { class: 'flex gap-8 justify-center items-end', style: 'flex: 1; padding: 2rem; background: rgba(15, 23, 42, 0.4); border-radius: 16px; border: 1px solid rgba(255,255,255,0.02); height: 100%;' },
          VerticalBar('Reputation', () => getBarHeight(0.85, 15), '#34d399'), // Lighter
          VerticalBar('Risk', () => getBarHeight(1.15, -15), '#10b981'), // Base Emerald
          VerticalBar('Attraction', () => getBarHeight(1.3, -30), '#059669') // Darker
        )
      )
    )
  );
});

const ReferencesPage = component(() => {
  const isLoaded = state(false);
  effect(() => {
    setTimeout(() => { isLoaded.value = true; }, 50);
  });

  const refs = [
    {
      index: 1,
      authors: 'Sharma, R., C. S., D. V., K. M., & R. A.',
      year: '2025',
      title: 'SDG adoption and firm risk: The impact of ESG performance, investor confidence, and agency cost.',
      source: 'Review of Economics (ideas.repec.org)',
      url: 'https://ideas.repec.org/a/eee/reveco/v101y2025ics1059056025003685.html',
      tag: 'ESG & Firm Risk'
    },
    {
      index: 2,
      authors: 'Team, W.',
      year: '2025, April 23',
      title: 'Risk Reduction. What Is It, Examples, Methods, Benefits.',
      source: 'Wall Street Mojo',
      url: 'https://www.wallstreetmojo.com/risk-reduction/',
      tag: 'Risk Reduction'
    },
    {
      index: 3,
      authors: 'ECGI Working Paper Series in Law',
      year: '2022',
      title: 'Institutional Investors and ESG Preferences.',
      source: 'European Corporate Governance Institute (ECGI)',
      url: 'https://www.ecgi.global/sites/default/files/working_papers/documents/esgfinal_1.pdf',
      tag: 'Investor Preferences'
    },
    {
      index: 4,
      authors: 'Santillán-Salgado, L. J. E., D. V., & R. J.',
      year: '2025',
      title: 'The Effects of ESG Scores and ESG Momentum on Stock Returns and Volatility: Evidence from U.S. Markets.',
      source: 'Journal of Risk and Financial Management (MDPI)',
      url: 'https://ideas.repec.org/a/gam/jjrfmx/v18y2025i7p367-d1692779.html',
      tag: 'ESG & Returns'
    }
  ];

  return h('div', { class: 'flex flex-col gap-6' },
    h('div', {},
      h('h2', {}, 'References'),
      h('p', { style: 'font-size: 1.05rem; line-height: 1.7;' }, 'Academic and professional sources underpinning the GreenAlpha research framework. All citations follow APA 7th edition formatting.')
    ),
    h('div', { class: 'flex flex-col gap-4' },
      ...refs.map((r, i) =>
        h('div', {
          class: 'card',
          style: () => `
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
            border-left: 3px solid var(--emerald);
            padding-left: 1.75rem;
            transition: opacity 0.5s ease ${i * 0.1}s, transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${i * 0.1}s;
            opacity: ${isLoaded.value ? 1 : 0};
            transform: ${isLoaded.value ? 'translateY(0)' : 'translateY(20px)'};
            margin-bottom: 0;
          `
        },
          // Header row: number + tag
          h('div', { style: 'display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap;' },
            h('span', { style: 'font-family: ui-monospace, monospace; font-size: 0.85rem; color: var(--emerald); font-weight: 700; min-width: 1.5rem;' }, `[${r.index}]`),
            h('span', { style: 'font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--bg-dark); background: var(--emerald); border-radius: 4px; padding: 0.2rem 0.6rem;' }, r.tag)
          ),
          // Author + year
          h('p', { style: 'margin: 0; font-size: 0.95rem; color: var(--text-secondary); line-height: 1.5;' },
            h('span', { style: 'color: var(--text-primary); font-weight: 600;' }, r.authors),
            ` (${r.year}). `
          ),
          // Title
          h('p', { style: 'margin: 0; font-size: 1rem; color: #fff; font-style: italic; line-height: 1.6;' }, r.title),
          // Source + link
          h('div', { style: 'display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;' },
            h('span', { style: 'font-size: 0.9rem; color: var(--text-secondary);' }, r.source + '.'),
            h('a', {
              href: r.url,
              target: '_blank',
              rel: 'noopener noreferrer',
              style: 'font-size: 0.85rem; color: var(--emerald); text-decoration: none; word-break: break-all; opacity: 0.85; transition: opacity 0.2s;',
              onMouseEnter: (e: any) => { e.target.style.opacity = '1'; e.target.style.textDecoration = 'underline'; },
              onMouseLeave: (e: any) => { e.target.style.opacity = '0.85'; e.target.style.textDecoration = 'none'; }
            }, r.url)
          )
        )
      )
    )
  );
});

// --- App Layout ---

const Sidebar = component(() => {
  const NavItem = (id: string, label: string, iconHtml: string) => {
    const el = h('div', {
      class: () => `nav-item ${currentRoute.value === id ? 'active' : ''}`,
      onClick: () => { currentRoute.value = id; isMobileMenuOpen.value = false; }
    });
    el.innerHTML = iconHtml + `<span>${label}</span>`;
    return el;
  };

  return h('aside', { class: () => `sidebar ${isMobileMenuOpen.value ? 'mobile-open' : ''}` },
    h('div', { class: 'brand', style: 'display: flex; align-items: center; gap: 0.75rem; padding: 0 0.5rem;' },
      h('div', { style: 'color: var(--emerald); display: flex; align-items: center; justify-content: center;' }, h('div', { innerHTML: Icons.Logo() })),
      h('h1', { style: 'margin: 0; font-size: 1.5rem; letter-spacing: -0.02em;' }, 'GreenAlpha')
    ),
    h('nav', { class: 'nav-links' },
      NavItem('home', 'Overview', Icons.Home()),
      NavItem('problem', 'The Problem', Icons.Problem()),
      NavItem('concepts', 'Key Concepts', Icons.Concepts()),
      NavItem('how', 'Methodology', Icons.HowItWorks()),
      NavItem('mechanisms', 'Mechanisms', Icons.Mechanisms()),
      NavItem('data', 'Data Insights', Icons.Data()),
      NavItem('simulator', 'Simulator', Icons.Simulator()),
      NavItem('references', 'References', Icons.References())
    )
  );
});

const MainApp = component(() => {
  // A ref mapping routes
  const container = h('div', { class: 'main-content-container fade-in' });

  // Use an effect() to trigger a fade-in animation whenever the route changes
  effect(() => {
    const route = currentRoute.value;
    
    // CSS Transition Re-trigger logic
    container.classList.remove('fade-in');
    void container.offsetWidth; // Force Reflow
    container.classList.add('fade-in');

    // Route swapping
    container.innerHTML = '';
    untrack(() => {
      const PageComponent = (() => {
        switch (route) {
          case 'home': return HomePage();
          case 'problem': return ProblemComponent();
          case 'concepts': return ConceptsPage();
          case 'how': return HowItWorksPage();
          case 'mechanisms': return MechanismsComponent();
          case 'data': return DataPage();
          case 'simulator': return SimulatorPage();
          case 'references': return ReferencesPage();
          default: return HomePage();
        }
      })();
      container.appendChild(PageComponent);
    });
  });

  // Dark overlay — tapping it closes the sidebar on mobile
  const overlay = h('div', {
    class: () => `mobile-overlay ${isMobileMenuOpen.value ? 'active' : ''}`,
    onClick: () => { isMobileMenuOpen.value = false; }
  });

  // Fixed top bar visible only on mobile screens
  const mobileHeader = h('header', { class: 'mobile-header' },
    h('button', {
      class: 'hamburger-btn',
      onClick: () => { isMobileMenuOpen.value = !isMobileMenuOpen.value; },
      'aria-label': 'Toggle navigation menu'
    },
      h('span', {}),
      h('span', {}),
      h('span', {})
    ),
    h('span', { class: 'mobile-header-title' }, 'GreenAlpha'),
    h('div', { style: 'width: 34px;' }) // Spacer to keep title centred
  );

  return h('div', { id: 'app-container', style: 'display: flex; width: 100%' },
    overlay,
    mobileHeader,
    Sidebar(),
    h('main', { class: 'main-content' }, container)
  );
});

// --- Entry Point ---
const root = document.querySelector<HTMLDivElement>('#app')!;
root.appendChild(MainApp());
