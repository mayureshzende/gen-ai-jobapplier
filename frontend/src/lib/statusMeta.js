export const STATUS_ORDER = ['Saved', 'Applied', 'Interview', 'Offer', 'Rejected'];

export const STATUS_META = {
  Saved: { label: 'Saved', dotVar: '--status-saved' },
  Applied: { label: 'Applied', dotVar: '--status-applied' },
  Interview: { label: 'Interview', dotVar: '--status-interview' },
  Offer: { label: 'Offer', dotVar: '--status-offer' },
  Rejected: { label: 'Rejected', dotVar: '--status-rejected' },
};

export const SEVERITY_META = {
  high: '--status-rejected',
  medium: '--status-interview',
  low: '--status-offer',
};

export function tintStyle(cssVarName) {
  return {
    backgroundColor: `color-mix(in srgb, var(${cssVarName}) 18%, transparent)`,
    color: `var(${cssVarName})`,
  };
}

export function scoreMeta(score) {
  if (score >= 80) return '--status-offer';
  if (score >= 60) return '--status-interview';
  return '--status-rejected';
}
