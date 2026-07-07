import { NextRequest, NextResponse } from "next/server";

interface ContactPayload {
  name: string;
  email: string;
  company: string;
  seats: string;
  message: string;
}

export async function POST(req: NextRequest) {
  let body: ContactPayload;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { name, email, company, seats, message } = body;

  if (!name?.trim() || !email?.trim() || !company?.trim()) {
    return NextResponse.json(
      { error: "Name, email, and company are required" },
      { status: 400 }
    );
  }

  // Very light email sanity check — not exhaustive, just catches obvious junk.
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }

  // ─────────────────────────────────────────────────────────────────────────
  // TODO (Bruce): this is where the submission actually needs to go somewhere.
  // Right now it only logs to the server console — nobody gets notified.
  // Pick one of these and wire it in:
  //
  //   Option A — SMTP email (nodemailer):
  //     npm install nodemailer
  //     Use env vars for SMTP_HOST / SMTP_USER / SMTP_PASS, send to hello@veltrax.in
  //
  //   Option B — Formspree / a form backend service:
  //     POST this payload to your Formspree endpoint instead of handling it here
  //
  //   Option C — Store in your own DB (e.g. the same Postgres Veltrax app uses)
  //     and check it from an internal dashboard/cron digest
  //
  console.log("[contact] New demo request:", {
    name,
    email,
    company,
    seats,
    message,
    receivedAt: new Date().toISOString(),
  });
  // ─────────────────────────────────────────────────────────────────────────

  return NextResponse.json({ ok: true });
}