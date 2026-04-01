export const timeSlots = {
  weekday: [
    "08:00", "08:45", "09:30", "10:15", "11:00", "11:45",
    "13:00", "13:45", "14:30", "15:15", "16:00", "16:45", "17:30", "18:15",
  ],
  saturday: [
    "09:00", "09:45", "10:30", "11:15", "12:00", "12:45",
  ],
} as const;

export const serviceDurations: Record<string, number> = {
  physiotherapy: 45,
  psychology: 50,
  pedicure: 30,
  other: 45,
};

export const servicePrices: Record<string, string> = {
  physiotherapy: "25\u20AC - 45\u20AC",
  psychology: "50\u20AC - 80\u20AC",
  pedicure: "30\u20AC - 50\u20AC",
  other: "25\u20AC - 60\u20AC",
};
