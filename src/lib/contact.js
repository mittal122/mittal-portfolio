import { person } from '../data/profile.js';

// Formspree form ID (the part after /f/ in the endpoint). It is public by
// design, not a secret; set VITE_FORMSPREE_ID in .env or the Vercel dashboard.
const FORM_ID = import.meta.env?.VITE_FORMSPREE_ID;

export function mailtoHref({ name = '', email = '', subject = '', message = '' } = {}) {
  const body = message + (name || email ? `\n\n— ${name}${email ? ` <${email}>` : ''}` : '');
  const qs = [
    subject && `subject=${encodeURIComponent(subject)}`,
    body.trim() && `body=${encodeURIComponent(body)}`,
  ].filter(Boolean).join('&');
  return `mailto:${person.email}${qs ? `?${qs}` : ''}`;
}

// Returns 'sent' when Formspree accepted it, 'mailto' when we handed off to
// the visitor's mail app (no form ID configured). Throws on a delivery failure
// so the form can keep the visitor's text and offer the email fallback.
export async function sendMessage(fields, { formId = FORM_ID, fetchImpl = globalThis.fetch, open = (u) => { window.location.href = u; } } = {}) {
  if (!formId) {
    open(mailtoHref(fields));
    return 'mailto';
  }
  const res = await fetchImpl(`https://formspree.io/f/${formId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ ...fields, _replyto: fields.email, _subject: fields.subject || `Portfolio message from ${fields.name}` }),
  });
  if (!res.ok) {
    let detail = '';
    try { detail = (await res.json())?.errors?.map((e) => e.message).join('; ') || ''; } catch { /* non-JSON error body */ }
    throw new Error(detail || `Formspree responded ${res.status}`);
  }
  return 'sent';
}
