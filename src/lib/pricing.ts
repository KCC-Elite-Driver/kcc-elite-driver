// Centralized pricing constants used both for display (Booking summary)
// and any payment-side calculations. Update here when business rules change.

export const MEET_GREET_SURCHARGE = {
  EUR: 30,
  EGP: 1500,
  USD: 30,
} as const;

export type SurchargeCurrency = keyof typeof MEET_GREET_SURCHARGE;

export function getMeetGreetSurcharge(currency: string): number {
  return MEET_GREET_SURCHARGE[(currency as SurchargeCurrency)] ?? 0;
}