// Runnable check for the contact sender: `node src/lib/contact.check.mjs`
import assert from 'node:assert/strict';
import { mailtoHref, sendMessage } from './contact.js';

const fields = { name: 'Priya', email: 'p@x.io', subject: 'Interview', message: 'Hi & hello' };

// mailto carries subject + body, encoded
const href = mailtoHref(fields);
assert.ok(href.startsWith('mailto:mittaldomadiya44@gmail.com?subject=Interview&body='));
assert.ok(href.includes(encodeURIComponent('Hi & hello')));
assert.equal(mailtoHref(), 'mailto:mittaldomadiya44@gmail.com');

// no form ID -> hands off to mail app
let opened = null;
assert.equal(await sendMessage(fields, { formId: '', open: (u) => (opened = u) }), 'mailto');
assert.equal(opened, href);

// form ID + 200 -> sent, posts JSON to the right endpoint
let call;
const ok = async (url, init) => ((call = { url, init }), { ok: true, json: async () => ({}) });
assert.equal(await sendMessage(fields, { formId: 'abc', fetchImpl: ok }), 'sent');
assert.equal(call.url, 'https://formspree.io/f/abc');
assert.equal(JSON.parse(call.init.body)._replyto, 'p@x.io');

// form ID + error -> throws with Formspree's message
const bad = async () => ({ ok: false, status: 422, json: async () => ({ errors: [{ message: 'email invalid' }] }) });
await assert.rejects(sendMessage(fields, { formId: 'abc', fetchImpl: bad }), /email invalid/);

console.log('contact.check: ok');
