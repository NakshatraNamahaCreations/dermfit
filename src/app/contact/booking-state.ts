// Kept out of actions.ts: a "use server" module may only export async functions,
// so shared types and constants live here instead.
export type BookingState = {
  status: "idle" | "success" | "error";
  message: string;
  errors: Partial<Record<"name" | "phone" | "email" | "service" | "message", string>>;
};

export const initialBookingState: BookingState = {
  status: "idle",
  message: "",
  errors: {},
};
