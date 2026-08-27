"use server";

import type { BookingState } from "./booking-state";

const PHONE_RE = /^[+\d][\d\s-]{7,17}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function submitBooking(
  _prev: BookingState,
  formData: FormData,
): Promise<BookingState> {
  // Honeypot — bots fill hidden fields, humans do not.
  if (String(formData.get("company") ?? "").trim() !== "") {
    return { status: "success", message: "Thanks — we will be in touch.", errors: {} };
  }

  const name = String(formData.get("name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const service = String(formData.get("service") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  const errors: BookingState["errors"] = {};
  if (name.length < 2) errors.name = "Please enter your full name.";
  if (!PHONE_RE.test(phone)) errors.phone = "Enter a valid phone number we can reach you on.";
  if (email && !EMAIL_RE.test(email)) errors.email = "That email address does not look right.";
  if (!service) errors.service = "Choose the area you would like to discuss.";
  if (message.length > 1000) errors.message = "Please keep your note under 1000 characters.";

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Please correct the highlighted fields.",
      errors,
    };
  }

  // TODO: connect a real destination — clinic CRM, email (Resend/SendGrid) or a database.
  // Keeping it server-side means the credentials never reach the browser.
  console.info("[dermfit] booking enquiry", { name, phone, email, service, message });

  return {
    status: "success",
    message:
      "Thanks — your request is with the front desk. We call back within one working day to confirm a slot.",
    errors: {},
  };
}
