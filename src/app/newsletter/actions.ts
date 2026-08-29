"use server";

import type { SubscribeState } from "./state";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function subscribe(
  _prev: SubscribeState,
  formData: FormData,
): Promise<SubscribeState> {
  // Honeypot — bots fill hidden fields, humans do not.
  if (String(formData.get("website") ?? "").trim() !== "") {
    return { status: "success", message: "Thanks — you are on the list." };
  }

  const email = String(formData.get("email") ?? "").trim();
  if (!EMAIL_RE.test(email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }

  // TODO: connect a real list — Mailchimp, Brevo, Resend Audiences or the
  // clinic CRM. Running server-side keeps the API key out of the browser.
  console.info("[dermfit] newsletter signup", { email });

  return {
    status: "success",
    message: "Thanks — you are on the list. No more than one email a month.",
  };
}
