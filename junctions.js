/* ============================================================
   data/junctions.js — SmartFlow AI Traffic Management
   Static dataset: intersection metadata and direction loads
   ============================================================ */

const JunctionData = [
  {
    id:          'A1',
    name:        'Junction A1',
    road:        'NH-8 × Ajmer Rd',
    mode:        'AI Adaptive',
    modeClass:   'mode-ai',
    initialTimer: 18,
    /* current phase: 'red' | 'yellow' | 'green' */
    phase:        'red',
    /* directional vehicle density (%) */
    directions: {
      north: 72,
      south: 48,
      east:  88,
      west:  35
    },
    aiRecommendation: 'Extend east green phase by 12 seconds'
  },
  {
    id:          'B2',
    name:        'Junction B2',
    road:        'MI Road × Sansar Chand',
    mode:        'AI Adaptive',
    modeClass:   'mode-ai',
    initialTimer: 7,
    phase:        'green',
    directions: {
      north: 45,
      south: 61,
      east:  38,
      west:  72
    },
    aiRecommendation: 'Balanced cycle — no changes needed'
  },
  {
    id:          'C3',
    name:        'Junction C3',
    road:        'Tonk Rd × Civil Lines',
    mode:        'Override',
    modeClass:   'mode-override',
    initialTimer: 22,
    phase:        'yellow',
    directions: {
      north: 81,
      south: 55,
      east:  44,
      west:  68
    },
    aiRecommendation: 'Reduce north phase by 8 seconds'
  },
  {
    id:          'D4',
    name:        'Junction D4',
    road:        'C-Scheme × Bhagwan Das',
    mode:        'AI Adaptive',
    modeClass:   'mode-ai',
    initialTimer: 11,
    phase:        'green',
    directions: {
      north: 38,
      south: 29,
      east:  52,
      west:  44
    },
    aiRecommendation: 'Shorten total cycle from 60s to 45s'
  }
];
