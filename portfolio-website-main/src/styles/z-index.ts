// Z-index scale for consistent layer management
export const Z_INDEX = {
  // Base Content (1-10)
  BASE_CONTENT: 1,
  BACKGROUND_ELEMENTS: 5,
  
  // Navigation & Header (50-90)
  NAVBAR: 50,
  NAVBAR_DROPDOWN: 60,
  
  // Overlays & Modals (100-400)
  MODAL_BACKDROP: 100,
  MODAL_CONTENT: 200,
  TOOLTIP: 300,
  NOTIFICATION: 400,
  
  // Critical Elements (500+)
  CRITICAL_OVERLAY: 500,
  CONFETTI: 999,
  MAXIMUM: 9999
} as const;

// Helper type for z-index values
export type ZIndexValue = typeof Z_INDEX[keyof typeof Z_INDEX]; 