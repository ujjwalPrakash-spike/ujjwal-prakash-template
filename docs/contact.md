# Contact Architecture & Submission Seam

This document outlines the front-end architecture, field specification, and backend integration guide for `/contact`.

---

## 1. Submission Seam & Location

All contact form submissions route exclusively through **one file**:
- **Location:** [`lib/contact/submit.ts`](file:///home/ujjwal/Desktop/08%20Startups%20&%20Contracts/Web%20Teamplate%20Business/lib/contact/submit.ts)
- **Primary Function:** `submitContact(input: ContactInput): Promise<SubmitResult>`
- **Mock Toggle:** Controlled by `mockSubmit` in [`config/contact.ts`](file:///home/ujjwal/Desktop/08%20Startups%20&%20Contracts/Web%20Teamplate%20Business/config/contact.ts) (currently `true`).

While `mockSubmit: true`, the form simulates a 900ms network delay, enforces schema validation, returns a reference ID (e.g., `MSG-4F2A9C`), and renders a clear preview indicator:
> *"Preview mode: messages are not sent yet."*

---

## 2. Field Specifications

| Field Key | Type | Requirement | Constraints & Rules |
| :--- | :--- | :--- | :--- |
| `name` | `string` | **Required** | 2 to 80 chars; trimmed & single-line (rejects CR/LF) |
| `email` | `string` | **Required** | Max 120 chars; valid RFC email format |
| `phone` | `string` | Optional | 6 to 20 chars; matches `/^[+()\d\s.-]{6,20}$/` |
| `topic` | `string` | **Required** | Must match an entry from `CONTACT_CONFIG.topics` |
| `subject` | `string` | **Required** | 3 to 120 chars; trimmed & single-line |
| `message` | `string` | **Required** | 10 to 4,000 chars; live mono character counter |
| `consent` | `boolean` | **Required** | Must be strictly `true` |
| `company` | `string` | *Honeypot* | Off-screen & aria-hidden. If populated, silent mock bot success |

---

## 3. How to Implement Real Delivery (`submitContact`)

To replace the mock stub with a real production backend:
1. **Server Action or API Route:**
   Create an endpoint (such as `POST /api/contact` or a Next.js Server Action).
2. **Re-use Validation:**
   Import and invoke `validateContact` from [`lib/contact/schema.ts`](file:///home/ujjwal/Desktop/08%20Startups%20&%20Contracts/Web%20Teamplate%20Business/lib/contact/schema.ts) on the server.
3. **Verify Honeypot:**
   If `input.company` contains any content, return `{ ok: true, id: "SPAM-TRIPWIRE" }` without forwarding to avoid leaking detection to spambots.
4. **Rate Limiting:**
   Integrate rate limiting (e.g. Upstash Redis, Cloudflare Turnstile, or token bucket). If triggered, return:
   ```ts
   {
     ok: false,
     code: "rate_limit",
     message: "Too many messages sent.",
     retryAfterSeconds: 60
   }
   ```
5. **Dispatch Delivery:**
   Send via your email provider (Postmark, Resend, AWS SES, or CRM webhook). Return `{ ok: true, id: messageId }` or `{ ok: false, code: "provider", message: "..." }`.

The UI already handles all variants of `SubmitResult` (`ok: true`, `validation`, `rate_limit`, `provider`, `network`). No UI changes are needed when switching to production.

---

## 4. Dev-Only State Preview

During local development, test each UI state by appending the `?state=` query parameter to the URL:
- `http://localhost:3000/contact?state=success` &rarr; Renders confirmation block with reference ID
- `http://localhost:3000/contact?state=error` &rarr; Renders inline provider error with retry button
- `http://localhost:3000/contact?state=ratelimit` &rarr; Renders rate-limit banner with retry countdown
- `http://localhost:3000/contact?state=offline` &rarr; Renders offline warning

---

## 5. What Is NOT Built Yet

The current implementation is purely front-end and design-focused:
- [ ] No transactional email provider (Resend, Postmark, AWS SES).
- [ ] No database or persistent storage for messages.
- [ ] No server-side rate-limiter or Redis instance.
- [ ] No external telemetry or CRM webhook integration.
