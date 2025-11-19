export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface Theme {
  id: string;
  label: string;
  colors: {
    background: string;
    textMain: string;
    textSecondary: string;
    textMuted: string;
    cardBg: string;
    cardBorder: string;
    inputBg: string;
    inputBorder: string;
    accent: string;
    buttonGradient: string;
    divider: string;
  };
}
