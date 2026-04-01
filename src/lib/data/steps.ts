export const steps = [
  { key: "0", icon: "Calendar" },
  { key: "1", icon: "UserCheck" },
  { key: "2", icon: "ClipboardList" },
  { key: "3", icon: "TrendingUp" },
] as const;

export type Step = (typeof steps)[number];
