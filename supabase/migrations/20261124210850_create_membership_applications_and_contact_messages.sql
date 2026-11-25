/*
# Create membership applications and contact messages tables

1. New Tables
- `membership_applications`
  - `id` (uuid, primary key, auto-generated)
  - `full_name` (text, not null) — applicant's full name
  - `email` (text, not null) — applicant's email address
  - `college` (text, not null) — college or university name
  - `city` (text, not null) — city
  - `state` (text, not null) — state
  - `year_of_study` (text, not null) — current year of study
  - `domain_interest` (text, not null) — technology domain the applicant is interested in
  - `skill_level` (text, not null) — self-declared skill level (Beginner / Intermediate / Advanced)
  - `motivation` (text, not null) — why the applicant wants to join
  - `github_profile` (text, nullable) — optional GitHub profile URL
  - `linkedin_profile` (text, nullable) — optional LinkedIn profile URL
  - `created_at` (timestamptz, not null, default now())
- `contact_messages`
  - `id` (uuid, primary key, auto-generated)
  - `name` (text, not null) — sender's name
  - `email` (text, not null) — sender's email address
  - `subject` (text, not null) — message subject
  - `message` (text, not null) — message body
  - `created_at` (timestamptz, not null, default now())

2. Security
- Enable RLS on both tables.
- Public visitors submit applications and messages anonymously (no sign-in in this app), so INSERT is allowed for `anon` and `authenticated`.
- No SELECT, UPDATE or DELETE policies and no SELECT grants for anon/authenticated: submitted data is write-only from the public site and can only be read through the service role by the community team.

3. Grants
- Grant INSERT (specific columns only) on both tables to `anon` and `authenticated`.
- Grant SELECT on both tables to `service_role` for the community team's internal tooling.
*/

CREATE TABLE IF NOT EXISTS membership_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  college text NOT NULL,
  city text NOT NULL,
  state text NOT NULL,
  year_of_study text NOT NULL,
  domain_interest text NOT NULL,
  skill_level text NOT NULL,
  motivation text NOT NULL,
  github_profile text,
  linkedin_profile text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE membership_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can submit a membership application" ON membership_applications;
CREATE POLICY "Anyone can submit a membership application"
ON membership_applications FOR INSERT
TO anon, authenticated
WITH CHECK (true);

DROP POLICY IF EXISTS "Anyone can submit a contact message" ON contact_messages;
CREATE POLICY "Anyone can submit a contact message"
ON contact_messages FOR INSERT
TO anon, authenticated
WITH CHECK (true);

GRANT INSERT (full_name, email, college, city, state, year_of_study, domain_interest, skill_level, motivation, github_profile, linkedin_profile)
  ON membership_applications TO anon, authenticated;
GRANT INSERT (name, email, subject, message)
  ON contact_messages TO anon, authenticated;

GRANT SELECT ON membership_applications TO service_role;
GRANT SELECT ON contact_messages TO service_role;
