/* ============================================================
   data/ai-modules.js — SmartFlow AI Traffic Management
   Static dataset: AI sub-system definitions
   ============================================================ */

const AIModuleData = {

  /* Summary statistics shown at top of AI tab */
  stats: [
    { id: 'ai-today', value: '48,312', label: 'Decisions Today' },
    { value: '99.2%',  label: 'Model Accuracy' },
    { value: '1.2ms',  label: 'Avg Inference'  },
    { value: '-31%',   label: 'Congestion Saved' }
  ],

  /* Individual sub-system modules */
  modules: [
    {
      icon:       '👁️',
      iconBg:     '#DCFCE7',
      name:       'Computer Vision — YOLO v9',
      desc:       'Vehicle detection, classification & counting from 312 cameras at 60 FPS',
      status:     'Live',
      statusClass:'st-live'
    },
    {
      icon:       '🧠',
      iconBg:     '#DBEAFE',
      name:       'Signal Optimizer — Deep RL',
      desc:       'Reinforcement learning agent controlling adaptive signal cycle lengths city-wide',
      status:     'Live',
      statusClass:'st-live'
    },
    {
      icon:       '⚡',
      iconBg:     '#FEF3C7',
      name:       'Violation Detector — CNN + OCR',
      desc:       'Red light, speeding, lane departure, wrong-way detection with license plate OCR',
      status:     'Live',
      statusClass:'st-live'
    },
    {
      icon:       '🚑',
      iconBg:     '#F0FDF4',
      name:       'Emergency Corridor AI',
      desc:       'Real-time green wave generation for ambulances, fire trucks, and police',
      status:     'Active',
      statusClass:'st-active'
    },
    {
      icon:       '📈',
      iconBg:     '#F5F3FF',
      name:       'Predictive Flow — LSTM',
      desc:       'Traffic forecasting at 15/30/60 min windows, proactive signal pre-adjustment',
      status:     'Live',
      statusClass:'st-live'
    }
  ],

  /* System health metrics */
  health: [
    { icon: '🖥️', name: 'AI CPU',       pct: 74, color: '#F59E0B' },
    { icon: '🎮', name: 'GPU Cluster',   pct: 94, color: '#EF4444' },
    { icon: '📷', name: 'Cameras',       pct: 98, color: '#22C55E' },
    { icon: '🌐', name: 'Network',       pct: 99, color: '#22C55E' },
    { icon: '💾', name: 'Storage',       pct: 61, color: '#22C55E' }
  ]
};
