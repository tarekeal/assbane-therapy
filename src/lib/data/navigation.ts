export const navItems = [
  { key: "home", href: "/" },
  { key: "services", href: "/services" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
] as const;

export type NavItem = (typeof navItems)[number];
