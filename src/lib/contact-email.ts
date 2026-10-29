import emailjs from "@emailjs/browser";
import { z } from "zod";

export const contactSchema = z.object({
  from_name: z.string().trim().min(1, "Enter your full name.").max(100, "Use 100 characters or fewer."),
  from_email: z.string().trim().min(1, "Enter your email address.").email("Enter a valid email address.").max(255),
  subject: z.string().trim().min(1, "Enter a subject.").max(200, "Use 200 characters or fewer."),
  message: z.string().trim().min(1, "Enter a message.").max(5000, "Use 5,000 characters or fewer."),
});
export type ContactValues = z.infer<typeof contactSchema>;
export const emailConfig = {
  serviceId: import.meta.env['VITE_EMAILJS_SERVICE_ID'],
  templateId: import.meta.env['VITE_EMAILJS_TEMPLATE_ID'],
  publicKey: import.meta.env['VITE_EMAILJS_PUBLIC_KEY'],
};

export async function sendContactEmail(input: ContactValues) {
  const values = contactSchema.parse(input);
  if (!emailConfig.serviceId || !emailConfig.templateId || !emailConfig.publicKey) {
    throw new Error("Email sending is not configured.");
  }
  // This function is invoked only from the browser's submit handler.
  emailjs.init({ publicKey: emailConfig.publicKey });
  const response = await emailjs.send(emailConfig.serviceId, emailConfig.templateId, {
    ...values,
    reply_to: values.from_email,
    to_email: "samsamcabdi25@gmail.com",
    to_name: "Zamzam Abdikadir Farah",
  });
  if (response.status !== 200) throw new Error("EmailJS did not accept the message.");
  return response;
}