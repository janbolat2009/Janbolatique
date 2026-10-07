# Janbolat Portfolio

This is a static, single-page site with a small Vercel function for optional runtime settings.

## Edit portfolio content

Update `config.js` for personal details, availability, social links, projects, achievements, events, skills, and meeting types. Project roles and statuses are optional; leave them unset until the details are ready to publish.

## Configure Vercel integrations

In the Vercel project settings, add either of these environment variables and redeploy:

- `BOOKING_URL` — Calendly, Cal.com, or a Google Calendar appointment schedule booking page. The booking dialog passes the selected meeting and duration to generic schedulers. Google Calendar appointment links are opened as provided; configure separate appointment page links on individual `meetings` entries in `config.js` when meeting types need different lengths.
- `CONTACT_ENDPOINT` — a form endpoint that accepts a JSON `POST` with name, email, company, reason, and message. Without it, the form opens a prefilled email draft.

The two values are read by `api/portfolio-config.js` at runtime. They are public URLs, not secret credentials.

For Google Calendar, create an appointment schedule in your Google account, set its availability and duration, then copy its public booking page link into `BOOKING_URL` in Vercel or `bookingUrl` in `config.js`. No password or Google account credentials belong in this website. Google Calendar will manage availability, timezone display, event creation, and booking confirmations.

## Preview locally

From the project folder, run `python -m http.server 4173` and open `http://127.0.0.1:4173/`.
