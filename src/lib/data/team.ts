export const teamMembers = [
  { key: "founder", image: "/images/team/salah.jpg" },
  { key: "member2", image: "/images/team/leila.jpg" },
  { key: "member3", image: "/images/team/sophie.jpg" },
] as const;

export type TeamMember = (typeof teamMembers)[number];
