// Kept out of actions.ts: a "use server" module may only export async
// functions, so the shared type and initial value live here.
export type SubscribeState = {
  status: "idle" | "success" | "error";
  message: string;
};

export const initialSubscribeState: SubscribeState = {
  status: "idle",
  message: "",
};
