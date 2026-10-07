import { useState } from 'react';
import { person } from '@/data/profile';
import { sendMessage, mailtoHref } from '@/lib/contact';
import { Meta, PageHeader, column, Arrow, External } from '@/components/Page';

const FIELDS = [
  { name: 'name', label: 'Your name', type: 'text', autoComplete: 'name' },
  { name: 'email', label: 'Your email', type: 'email', autoComplete: 'email' },
  { name: 'subject', label: 'Subject', type: 'text', autoComplete: 'off', placeholder: 'Interview, role, or a question about a repo' },
];
const EMPTY = { name: '', email: '', subject: '', message: '' };

export default function ContactPage() {
  const [form, setForm] = useState(EMPTY);
  // idle | sending | sent | mailto | error. The form keeps its text on error.
  const [status, setStatus] = useState({ state: 'idle', detail: '' });
  const set = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setStatus({ state: 'sending', detail: '' });
    try {
      const result = await sendMessage(form);
      setStatus({ state: result, detail: '' });
      if (result === 'sent') setForm(EMPTY);
    } catch (err) {
      setStatus({ state: 'error', detail: err.message });
    }
  };

  return (
    <>
      <Meta title="Contact" description="Contact Mittal Domadiya about full-time DevOps / SRE roles from 2027, interviews, or the projects. Email: mittaldomadiya44@gmail.com." />
      <PageHeader title="Write to me">
        {person.availability}. Hiring, interviewing, or curious about one of the projects? Use the form or email directly.
      </PageHeader>

      <div className={`${column} grid gap-16 pb-32 lg:grid-cols-[minmax(0,1fr)_20rem] xl:gap-24`}>
        <form onSubmit={submit} className="max-w-2xl space-y-6" noValidate={false}>
          {FIELDS.map((f) => (
            <div key={f.name}>
              <label htmlFor={f.name} className="label mb-2 block text-mist">{f.label}</label>
              <input id={f.name} name={f.name} type={f.type} required autoComplete={f.autoComplete} placeholder={f.placeholder} value={form[f.name]} onChange={set} className="field" />
            </div>
          ))}
          <div>
            <label htmlFor="message" className="label mb-2 block text-mist">Message</label>
            <textarea id="message" name="message" required rows={7} value={form.message} onChange={set} className="field resize-y" />
          </div>
          <button type="submit" className="btn-primary w-full sm:w-auto sm:min-w-[16rem]" disabled={status.state === 'sending'}>
            {status.state === 'sending' ? 'Sending…' : 'Send message'} <Arrow />
          </button>
          <p role="status" aria-live="polite" className={`min-h-[1.5rem] ${status.state === 'error' ? 'text-ember' : 'text-mist'}`}>
            {status.state === 'sent' && 'Message sent. Thank you.'}
            {status.state === 'mailto' && <>Your mail app should have opened with the message filled in. If it didn’t, email <a className="underline underline-offset-4" href={mailtoHref(form)}>{person.email}</a>.</>}
            {status.state === 'error' && <>Couldn’t send ({status.detail}). Your text is still here: try again, or <a className="underline underline-offset-4" href={mailtoHref(form)}>send it by email instead</a>.</>}
          </p>
        </form>

        <aside className="space-y-10 self-start bg-void/80 p-6 lg:border-l lg:border-line lg:p-8">
          <div>
            <h2 className="label text-mist">Email</h2>
            <a href={`mailto:${person.email}`} className="mt-3 block break-all text-lg text-ember underline decoration-ember/40 underline-offset-4 hover:decoration-ember">{person.email}</a>
          </div>
          <div>
            <h2 className="label text-mist">Elsewhere</h2>
            <ul className="mt-3 space-y-1">
              <li><a href={person.links.github} target="_blank" rel="noopener noreferrer" className="link-quiet inline-flex min-h-11 items-center gap-2 text-lg">GitHub · mittal122 <External /></a></li>
              <li><a href={person.links.linkedin} target="_blank" rel="noopener noreferrer" className="link-quiet inline-flex min-h-11 items-center gap-2 text-lg">LinkedIn <External /></a></li>
            </ul>
          </div>
          <div>
            <h2 className="label text-mist">Stage</h2>
            <p className="mt-3 text-mist">Final-year BTech CSE, graduating 2027.</p>
          </div>
        </aside>
      </div>
    </>
  );
}
