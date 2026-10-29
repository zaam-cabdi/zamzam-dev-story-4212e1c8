import { useRef, useState, type FormEvent } from "react";
import { LoaderCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { contactSchema, sendContactEmail, type ContactValues } from "@/lib/contact-email";

const fields = [
  { name: "from_name", label: "Full Name", type: "text", autoComplete: "name", max: 100 },
  { name: "from_email", label: "Email Address", type: "email", autoComplete: "email", max: 255 },
  { name: "subject", label: "Subject", type: "text", autoComplete: "off", max: 200 },
  { name: "message", label: "Message", type: "textarea", autoComplete: "off", max: 5000 },
] as const;

export function ContactForm() {
  const inFlight = useRef(false);
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactValues, string>>>({});
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current) return;
    const form = event.currentTarget;
    const parsed = contactSchema.safeParse(Object.fromEntries(new FormData(form)));
    setStatus("idle");
    if (!parsed.success) {
      const nextErrors: Partial<Record<keyof ContactValues, string>> = {};
      for (const field of fields) {
        const error = parsed.error.flatten().fieldErrors[field.name]?.[0];
        if (error) nextErrors[field.name] = error;
      }
      setErrors(nextErrors);
      const first = fields.find((field) => nextErrors[field.name]);
      if (first) form.querySelector<HTMLElement>(`[name="${first.name}"]`)?.focus();
      return;
    }
    setErrors({});
    inFlight.current = true;
    setSending(true);
    try {
      await sendContactEmail(parsed.data);
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    } finally {
      inFlight.current = false;
      setSending(false);
    }
  }

  return (
    <div className="mt-12 border-t border-border pt-10">
      <h3 className="font-display text-2xl font-semibold">Send a Message</h3>
      <form onSubmit={submit} noValidate aria-busy={sending} className="mt-6">
        <fieldset disabled={sending} className="grid min-w-0 gap-5 sm:grid-cols-2">
          {fields.map((field) => {
            const props = {
              id: `contact-${field.name}`, name: field.name, required: true,
              maxLength: field.max, autoComplete: field.autoComplete,
              "aria-invalid": Boolean(errors[field.name]),
              "aria-describedby": errors[field.name] ? `error-${field.name}` : undefined,
              className: "mt-2 min-h-12 bg-card",
            };
            return (
              <div key={field.name} className={field.name === "subject" || field.name === "message" ? "sm:col-span-2" : ""}>
                <label htmlFor={props.id} className="text-sm font-medium">{field.label}</label>
                {field.type === "textarea" ? <Textarea {...props} rows={6} className="mt-2 min-h-40 resize-y bg-card" /> : <Input {...props} type={field.type} />}
                {errors[field.name] && <p id={`error-${field.name}`} className="mt-2 text-sm text-destructive">{errors[field.name]}</p>}
              </div>
            );
          })}
          <Button type="submit" disabled={sending} className="min-h-12 w-full bg-gradient-primary text-primary-foreground shadow-glow sm:w-fit">
            {sending ? <LoaderCircle className="animate-spin motion-reduce:animate-none" /> : <Send />}
            {sending ? "Sending…" : "Send Message"}
          </Button>
        </fieldset>
        <div aria-live="polite" aria-atomic="true" className="mt-4 min-h-12 text-sm">
          {status === "success" && <p role="status" className="text-primary-glow">Your message was accepted by the email service. Thank you for reaching out!</p>}
          {status === "error" && <p role="alert" className="text-destructive">Your message could not be sent. Please try again, or email <a className="underline" href="mailto:samsamcabdi25@gmail.com">samsamcabdi25@gmail.com</a> directly.</p>}
        </div>
      </form>
    </div>
  );
}