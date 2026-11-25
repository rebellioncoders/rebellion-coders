import { useEffect, useState, type FormEvent } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Github, Linkedin, MessageCircle, Send, Loader2, CircleAlert, CheckCircle2 } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/Reveal';
import { GITHUB_URL, ORGANIZATION_LINKEDIN_URL, WHATSAPP_URL } from '@/lib/brand';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const SOCIALS = [
  { label: 'LinkedIn', href: ORGANIZATION_LINKEDIN_URL, icon: Linkedin, description: 'Official organisation' },
  {
    label: 'WhatsApp',
    href: WHATSAPP_URL,
    icon: MessageCircle,
    description: 'Official community group',
  },
  { label: 'GitHub', href: GITHUB_URL, icon: Github, description: 'Official organisation' },
];

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string; subject?: string; message?: string }>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (!submitted) return;
    const timer = window.setTimeout(() => setSubmitted(false), 10000);
    return () => window.clearTimeout(timer);
  }, [submitted]);

  const clearError = (key: 'name' | 'email' | 'subject' | 'message') =>
    setErrors((e) => ({ ...e, [key]: undefined }));

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitError(null);

    const nextErrors: typeof errors = {};
    if (!name.trim()) nextErrors.name = 'Please enter your name.';
    if (!email.trim()) {
      nextErrors.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (!subject.trim()) nextErrors.subject = 'Please enter a subject.';
    if (!message.trim()) {
      nextErrors.message = 'Please enter a message.';
    } else if (message.trim().length < 10) {
      nextErrors.message = 'Please write at least 10 characters.';
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert({ name: name.trim(), email: email.trim(), subject: subject.trim(), message: message.trim() });
      if (error) throw error;
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      setSubmitted(true);
    } catch {
      setSubmitError('Something went wrong while sending your message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="bg-ice-100 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <SectionHeading
          label="Contact"
          title="Let's Connect"
          description="Have a question, an idea or an interest in collaborating? Reach out to the team."
          dark={false}
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-5">
          <Reveal className="lg:col-span-2">
            <div className="flex h-full flex-col gap-6 rounded-3xl border border-royal-600/20 bg-white p-8">
              <h3 className="font-display text-lg font-bold uppercase text-slate-900">
                Official Channels
              </h3>
              <p className="text-[15px] leading-[150%] text-slate-600">
                These are the only official Rebellion Coders channels. Reach us through any of them.
              </p>
              <ul className="flex flex-col gap-3">
                {SOCIALS.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-4 rounded-xl border border-royal-600/20 bg-ice-50 p-4 transition-all duration-300 hover:border-cyan-brand/50 hover:bg-cyan-brand/5"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-cyan-brand/25 bg-cyan-brand/10 text-cyan-brand transition group-hover:shadow-glow-sm">
                        <social.icon size={18} aria-hidden="true" />
                      </span>
                      <span className="flex flex-col">
                        <span className="text-sm font-semibold text-slate-900">{social.label}</span>
                        <span className="text-xs text-slate-600">{social.description}</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="rounded-3xl border border-royal-600/20 bg-white p-8 shadow-card"
            >
              {submitted && (
                <div
                  role="status"
                  className="mb-6 flex items-start gap-3 rounded-xl border border-emerald-600/30 bg-emerald-50 p-4 text-sm text-emerald-800"
                >
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
                  <p>Your message has been sent to the Rebellion Coders team.</p>
                </div>
              )}

              {submitError && (
                <div
                  role="alert"
                  className="mb-6 flex items-start gap-3 rounded-xl border border-red-600/30 bg-red-50 p-4 text-sm text-red-800"
                >
                  <CircleAlert size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
                  <p>{submitError}</p>
                </div>
              )}

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium text-slate-700">
                    Name <span className="text-cyan-brand" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    autoComplete="name"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      clearError('name');
                    }}
                    aria-invalid={errors.name !== undefined}
                    aria-describedby={errors.name ? 'contact-name-error' : undefined}
                    className={`input-field ${errors.name ? 'input-error' : ''}`}
                  />
                  {errors.name && (
                    <p id="contact-name-error" role="alert" className="mt-1.5 text-xs text-red-300">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium text-slate-700">
                    Email <span className="text-cyan-brand" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      clearError('email');
                    }}
                    aria-invalid={errors.email !== undefined}
                    aria-describedby={errors.email ? 'contact-email-error' : undefined}
                    className={`input-field ${errors.email ? 'input-error' : ''}`}
                  />
                  {errors.email && (
                    <p id="contact-email-error" role="alert" className="mt-1.5 text-xs text-red-300">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="contact-subject" className="mb-1.5 block text-sm font-medium text-slate-700">
                    Subject <span className="text-cyan-brand" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    placeholder="What is this about?"
                    value={subject}
                    onChange={(e) => {
                      setSubject(e.target.value);
                      clearError('subject');
                    }}
                    aria-invalid={errors.subject !== undefined}
                    aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
                    className={`input-field ${errors.subject ? 'input-error' : ''}`}
                  />
                  {errors.subject && (
                    <p id="contact-subject-error" role="alert" className="mt-1.5 text-xs text-red-300">
                      {errors.subject}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium text-slate-700">
                    Message <span className="text-cyan-brand" aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    placeholder="Write your message..."
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      clearError('message');
                    }}
                    aria-invalid={errors.message !== undefined}
                    aria-describedby={errors.message ? 'contact-message-error' : undefined}
                    className={`input-field resize-y ${errors.message ? 'input-error' : ''}`}
                  />
                  {errors.message && (
                    <p id="contact-message-error" role="alert" className="mt-1.5 text-xs text-red-300">
                      {errors.message}
                    </p>
                  )}
                </div>
              </div>

              <button type="submit" disabled={submitting} className="btn-primary mt-6 w-full sm:w-auto">
                {submitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={16} aria-hidden="true" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
