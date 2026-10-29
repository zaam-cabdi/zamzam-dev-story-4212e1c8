<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Contact messages use the official EmailJS browser SDK from a submit handler, not a custom server, because this portfolio explicitly requires browser-only email delivery; only public EmailJS configuration belongs in VITE variables.
- Contact field validation and EmailJS parameter mapping live in a shared contact-email module so tests and the form enforce the same rules.
