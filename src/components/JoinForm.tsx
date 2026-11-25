import { useEffect, useState, type FormEvent } from 'react';
import { createClient } from '@supabase/supabase-js';
import { CheckCircle2, CircleAlert, Loader2, MessageCircle } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/Reveal';
import { WHATSAPP_URL } from '@/lib/brand';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const DOMAIN_OPTIONS = [
  'AI & Machine Learning',
  'Web Development',
  'App Development',
  'Cybersecurity',
  'Blockchain & Web3',
  'Robotics & IoT',
  'Data Science',
  'Cloud Computing & DevOps',
  'Other',
];

const SKILL_LEVELS = ['Beginner', 'Intermediate', 'Advanced'];
const YEAR_OPTIONS = ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Postgraduate', 'Other'];

type Fields = {
  fullName: string;
  email: string;
  college: string;
  city: string;
  state: string;
  yearOfStudy: string;
  domainInterest: string;
  skillLevel: string;
  motivation: string;
  githubProfile: string;
  linkedinProfile: string;
};

type Errors = Partial<Record<keyof Fields, string>>;

const INITIAL: Fields = {
  fullName: '',
  email: '',
  college: '',
  city: '',
  state: '',
  yearOfStudy: '',
  domainInterest: '',
  skillLevel: '',
  motivation: '',
  githubProfile: '',
  linkedinProfile: '',
};

const PROFILE_URL_PATTERN = /^https:\/\/(www\.)?([\w-]+\.)+[\w-]+(\/[\w\-./?%&=]*)?$/;

function validate(fields: Fields): Errors {
  const errors: Errors = {};

  if (!fields.fullName.trim()) errors.fullName = 'Please enter your full name.';
  if (!fields.email.trim()) {
    errors.email = 'Please enter your email address.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!fields.college.trim()) errors.college = 'Please enter your college or university.';
  if (!fields.city.trim()) errors.city = 'Please enter your city.';
  if (!fields.state.trim()) errors.state = 'Please enter your state.';
  if (!fields.yearOfStudy) errors.yearOfStudy = 'Please select your year of study.';
  if (!fields.domainInterest) errors.domainInterest = 'Please select a domain of interest.';
  if (!fields.skillLevel) errors.skillLevel = 'Please select your current skill level.';
  if (!fields.motivation.trim()) {
    errors.motivation = 'Please tell us why you want to join.';
  } else if (fields.motivation.trim().length < 20) {
    errors.motivation = 'Please write at least 20 characters.';
  }
  if (fields.githubProfile.trim() && !PROFILE_URL_PATTERN.test(fields.githubProfile.trim())) {
    errors.githubProfile = 'Enter a valid URL starting with https://';
  }
  if (fields.linkedinProfile.trim() && !PROFILE_URL_PATTERN.test(fields.linkedinProfile.trim())) {
    errors.linkedinProfile = 'Enter a valid URL starting with https://';
  }

  return errors;
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 flex items-center gap-1 text-xs text-red-700">
      <CircleAlert size={12} aria-hidden="true" />
      {message}
    </p>
  );
}

export default function JoinForm() {
  const [fields, setFields] = useState<Fields>(INITIAL);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (!submitted) return;
    const timer = window.setTimeout(() => setSubmitted(false), 10000);
    return () => window.clearTimeout(timer);
  }, [submitted]);

  const set = (key: keyof Fields) => (value: string) => {
    setFields((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitError(null);

    const nextErrors = validate(fields);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    try {
      const { error } = await supabase.from('membership_applications').insert({
        full_name: fields.fullName.trim(),
        email: fields.email.trim(),
        college: fields.college.trim(),
        city: fields.city.trim(),
        state: fields.state.trim(),
        year_of_study: fields.yearOfStudy,
        domain_interest: fields.domainInterest,
        skill_level: fields.skillLevel,
        motivation: fields.motivation.trim(),
        github_profile: fields.githubProfile.trim() || null,
        linkedin_profile: fields.linkedinProfile.trim() || null,
      });
      if (error) throw error;
      setFields(INITIAL);
      setSubmitted(true);
    } catch {
      setSubmitError('Something went wrong while sending your application. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const err = (key: keyof Fields) => errors[key] !== undefined;

  return (
    <section id="join" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-8">
        <SectionHeading
          label="Join Us"
          title="Become Part Of The Rebellion"
          description="Connect with curious minds, explore technology and grow through collaboration."
          dark={false}
        />

        <Reveal className="mt-12">
          <form
            onSubmit={handleSubmit}
            noValidate
            className="rounded-3xl border border-royal-600/20 bg-ice-100 p-6 shadow-card sm:p-10"
          >
            {submitted && (
              <div
                role="status"
                className="mb-8 flex items-start gap-3 rounded-xl border border-emerald-600/30 bg-emerald-50 p-4 text-sm text-emerald-800"
              >
                <CheckCircle2 size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
                <p>
                  Your application has been received. A coordinator from Rebellion Coders will
                  review it and reach out — you can also join our WhatsApp community right away.
                </p>
              </div>
            )}

            {submitError && (
              <div
                role="alert"
                className="mb-8 flex items-start gap-3 rounded-xl border border-red-600/30 bg-red-50 p-4 text-sm text-red-800"
              >
                <CircleAlert size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
                <p>{submitError}</p>
              </div>
            )}

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="join-name" className="mb-1.5 block text-sm font-medium text-slate-700">
                  Full Name <span className="text-cyan-brand" aria-hidden="true">*</span>
                </label>
                <input
                  id="join-name"
                  type="text"
                  autoComplete="name"
                  placeholder="Your full name"
                  value={fields.fullName}
                  onChange={(e) => set('fullName')(e.target.value)}
                  aria-invalid={err('fullName')}
                  aria-describedby={err('fullName') ? 'join-name-error' : undefined}
                  className={`input-field ${err('fullName') ? 'input-error' : ''}`}
                />
                <FieldError id="join-name-error" message={errors.fullName} />
              </div>

              <div>
                <label htmlFor="join-email" className="mb-1.5 block text-sm font-medium text-slate-700">
                  Email Address <span className="text-cyan-brand" aria-hidden="true">*</span>
                </label>
                <input
                  id="join-email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={fields.email}
                  onChange={(e) => set('email')(e.target.value)}
                  aria-invalid={err('email')}
                  aria-describedby={err('email') ? 'join-email-error' : undefined}
                  className={`input-field ${err('email') ? 'input-error' : ''}`}
                />
                <FieldError id="join-email-error" message={errors.email} />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="join-college" className="mb-1.5 block text-sm font-medium text-slate-700">
                  College / University <span className="text-cyan-brand" aria-hidden="true">*</span>
                </label>
                <input
                  id="join-college"
                  type="text"
                  placeholder="Your college or university"
                  value={fields.college}
                  onChange={(e) => set('college')(e.target.value)}
                  aria-invalid={err('college')}
                  aria-describedby={err('college') ? 'join-college-error' : undefined}
                  className={`input-field ${err('college') ? 'input-error' : ''}`}
                />
                <FieldError id="join-college-error" message={errors.college} />
              </div>

              <div>
                <label htmlFor="join-city" className="mb-1.5 block text-sm font-medium text-slate-700">
                  City <span className="text-cyan-brand" aria-hidden="true">*</span>
                </label>
                <input
                  id="join-city"
                  type="text"
                  autoComplete="address-level2"
                  placeholder="Your city"
                  value={fields.city}
                  onChange={(e) => set('city')(e.target.value)}
                  aria-invalid={err('city')}
                  aria-describedby={err('city') ? 'join-city-error' : undefined}
                  className={`input-field ${err('city') ? 'input-error' : ''}`}
                />
                <FieldError id="join-city-error" message={errors.city} />
              </div>

              <div>
                <label htmlFor="join-state" className="mb-1.5 block text-sm font-medium text-slate-700">
                  State <span className="text-cyan-brand" aria-hidden="true">*</span>
                </label>
                <input
                  id="join-state"
                  type="text"
                  autoComplete="address-level1"
                  placeholder="Your state"
                  value={fields.state}
                  onChange={(e) => set('state')(e.target.value)}
                  aria-invalid={err('state')}
                  aria-describedby={err('state') ? 'join-state-error' : undefined}
                  className={`input-field ${err('state') ? 'input-error' : ''}`}
                />
                <FieldError id="join-state-error" message={errors.state} />
              </div>

              <div>
                <label htmlFor="join-year" className="mb-1.5 block text-sm font-medium text-slate-700">
                  Year of Study <span className="text-cyan-brand" aria-hidden="true">*</span>
                </label>
                <select
                  id="join-year"
                  value={fields.yearOfStudy}
                  onChange={(e) => set('yearOfStudy')(e.target.value)}
                  aria-invalid={err('yearOfStudy')}
                  aria-describedby={err('yearOfStudy') ? 'join-year-error' : undefined}
                  className={`input-field ${err('yearOfStudy') ? 'input-error' : ''} ${
                    fields.yearOfStudy === '' ? 'text-slate-500' : 'text-slate-900'
                  }`}
                >
                  <option value="" disabled>
                    Select your year
                  </option>
                  {YEAR_OPTIONS.map((year) => (
                    <option key={year} value={year} className="bg-white text-slate-900">
                      {year}
                    </option>
                  ))}
                </select>
                <FieldError id="join-year-error" message={errors.yearOfStudy} />
              </div>

              <div>
                <label htmlFor="join-domain" className="mb-1.5 block text-sm font-medium text-slate-700">
                  Domain Interest <span className="text-cyan-brand" aria-hidden="true">*</span>
                </label>
                <select
                  id="join-domain"
                  value={fields.domainInterest}
                  onChange={(e) => set('domainInterest')(e.target.value)}
                  aria-invalid={err('domainInterest')}
                  aria-describedby={err('domainInterest') ? 'join-domain-error' : undefined}
                  className={`input-field ${err('domainInterest') ? 'input-error' : ''} ${
                    fields.domainInterest === '' ? 'text-slate-500' : 'text-slate-900'
                  }`}
                >
                  <option value="" disabled>
                    Select a domain
                  </option>
                  {DOMAIN_OPTIONS.map((domain) => (
                    <option key={domain} value={domain} className="bg-white text-slate-900">
                      {domain}
                    </option>
                  ))}
                </select>
                <FieldError id="join-domain-error" message={errors.domainInterest} />
              </div>

              <div className="sm:col-span-2">
                <fieldset>
                  <legend className="mb-1.5 block text-sm font-medium text-slate-700">
                    Current Skill Level <span className="text-cyan-brand" aria-hidden="true">*</span>
                  </legend>
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    {SKILL_LEVELS.map((level) => (
                      <label
                        key={level}
                        className={`cursor-pointer rounded-lg border px-3 py-2.5 text-center text-sm font-medium transition focus-within:ring-2 focus-within:ring-cyan-brand ${
                          fields.skillLevel === level
                            ? 'border-cyan-brand bg-cyan-brand/15 text-royal-700'
                            : 'border-royal-600/20 bg-white text-slate-700 hover:border-cyan-brand/40'
                        }`}
                      >
                        <input
                          type="radio"
                          name="skillLevel"
                          value={level}
                          checked={fields.skillLevel === level}
                          onChange={() => set('skillLevel')(level)}
                          className="sr-only"
                        />
                        {level}
                      </label>
                    ))}
                  </div>
                  <FieldError id="join-skill-error" message={errors.skillLevel} />
                </fieldset>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="join-motivation" className="mb-1.5 block text-sm font-medium text-slate-700">
                  Why do you want to join? <span className="text-cyan-brand" aria-hidden="true">*</span>
                </label>
                <textarea
                  id="join-motivation"
                  rows={4}
                  placeholder="Tell us what draws you to Rebellion Coders..."
                  value={fields.motivation}
                  onChange={(e) => set('motivation')(e.target.value)}
                  aria-invalid={err('motivation')}
                  aria-describedby={err('motivation') ? 'join-motivation-error' : undefined}
                  className={`input-field resize-y ${err('motivation') ? 'input-error' : ''}`}
                />
                <FieldError id="join-motivation-error" message={errors.motivation} />
              </div>

              <div>
                <label htmlFor="join-github" className="mb-1.5 block text-sm font-medium text-slate-700">
                  GitHub Profile <span className="text-slate-500">(optional)</span>
                </label>
                <input
                  id="join-github"
                  type="url"
                  placeholder="https://github.com/yourusername"
                  value={fields.githubProfile}
                  onChange={(e) => set('githubProfile')(e.target.value)}
                  aria-invalid={err('githubProfile')}
                  aria-describedby={err('githubProfile') ? 'join-github-error' : undefined}
                  className={`input-field ${err('githubProfile') ? 'input-error' : ''}`}
                />
                <FieldError id="join-github-error" message={errors.githubProfile} />
              </div>

              <div>
                <label htmlFor="join-linkedin" className="mb-1.5 block text-sm font-medium text-slate-700">
                  LinkedIn Profile <span className="text-slate-500">(optional)</span>
                </label>
                <input
                  id="join-linkedin"
                  type="url"
                  placeholder="https://linkedin.com/in/yourprofile"
                  value={fields.linkedinProfile}
                  onChange={(e) => set('linkedinProfile')(e.target.value)}
                  aria-invalid={err('linkedinProfile')}
                  aria-describedby={err('linkedinProfile') ? 'join-linkedin-error' : undefined}
                  className={`input-field ${err('linkedinProfile') ? 'input-error' : ''}`}
                />
                <FieldError id="join-linkedin-error" message={errors.linkedinProfile} />
              </div>
            </div>

            <div className="mt-8 flex flex-col items-center gap-5">
              <button type="submit" disabled={submitting} className="btn-primary w-full sm:w-auto">
                {submitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                    Submitting...
                  </>
                ) : (
                  'Submit Application'
                )}
              </button>
              <p className="text-center text-xs leading-[150%] text-slate-500">
                Your application is sent securely to the Rebellion Coders team.
              </p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline w-full sm:w-auto"
              >
                <MessageCircle size={16} aria-hidden="true" />
                Join WhatsApp Community
              </a>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
