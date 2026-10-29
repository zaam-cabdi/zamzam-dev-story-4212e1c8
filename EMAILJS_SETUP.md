# EmailJS contact form

The official `@emailjs/browser` SDK is installed. Public browser configuration is in `.env`:
- `VITE_EMAILJS_SERVICE_ID`: `service_t82f4dt`
- `VITE_EMAILJS_TEMPLATE_ID`: `template_fda37ab`
- `VITE_EMAILJS_PUBLIC_KEY`: the account's public key

These values are public identifiers, not private credentials. Never add a private key, email password, or OAuth token to VITE variables or source code. Restart/redeploy after changing public environment configuration.

## Dashboard configuration
1. Email Services: ensure `service_t82f4dt` is connected and authorized to send mail. Send its dashboard test email.
2. Email Templates: open `template_fda37ab`. Set **To Email** to the literal `samsamcabdi25@gmail.com`, not a caller-controlled recipient variable.
3. Set **From Name** to `{{from_name}}`, **From Email** to the connected service's verified sender (or default), **Reply-To** to `{{reply_to}}` or `{{from_email}}`, and **Subject** to `Portfolio: {{subject}}`.
4. Include `{{from_name}}`, `{{from_email}}`, `{{subject}}`, and `{{message}}` in the email body. The app also sends `to_name` and `to_email` for compatibility; keep the dashboard recipient fixed to avoid an open mail relay.
5. Save the template and verify the account's Public Key matches the configured value. Allow the preview and published website origins in EmailJS domain restrictions where available.
6. Configure EmailJS's provider-side spam/rate controls and monitor quota. Browser validation and disabling duplicate submissions are usability protections, not security boundaries. There is intentionally no custom backend; provider-side sender authorization, template restrictions, and abuse protection must be configured in EmailJS.

## Verification
Submit all four fields through the live form. Success appears only for an actual EmailJS status 200 response; it confirms service acceptance, not inbox delivery. Check the EmailJS history and recipient inbox/spam folder to verify delivery. On failure the form retains input and offers direct email.

Automated tests mock EmailJS solely to check validation, failure handling, and duplicate-submission behavior; they do not prove delivery. Real test results are recorded separately after an actual request.

### Actual test — October 29, 2026
The live form made a real request with the supplied settings. EmailJS returned HTTP 400: “The service ID not found.” The form displayed an error, retained the message, and did not display success. Sending is not functional until the owner verifies `service_t82f4dt` belongs to the account identified by the supplied Public Key (or supplies the correct Service ID), reconnects the service as needed, and reruns a test. Inbox delivery remains unverified.