export const services = [
  { key: "physiotherapy", icon: "Activity", image: "/images/services/physiotherapy.jpg" },
  { key: "psychology", icon: "Brain", image: "/images/services/psychology.jpg" },
  { key: "pedicure", icon: "Footprints", image: "/images/services/pedicure.jpg" },
  { key: "other", icon: "Heart", image: "/images/services/other.jpg" },
] as const;

export type Service = (typeof services)[number];
