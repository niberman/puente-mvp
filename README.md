
# Puente MVP (Next.js + Supabase + Tailwind)

A lean MVP to validate a bilingual learning → job pipeline.

## Quickstart

1) **Clone & install**
```bash
npm i
npm run dev
```

2) **Create `.env.local`**
Copy `.env.local.example` to `.env.local` and paste your Supabase **anon** key:
```
NEXT_PUBLIC_SUPABASE_URL=https://wsepwuxkwjnsgmkddkjw.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=PASTE_ANNON_KEY_HERE
```

3) **Create tables in Supabase**
Open Supabase SQL editor and run `schema.sql` from this repo.

4) **Auth**
Sign in with magic link via "Sign in" in the navbar. (No passwords.)

## What’s included

- Landing page (`/`) with learner & employer CTAs
- Learner dashboard (`/dashboard`): profile, 3 sample lessons, job list, apply
- Employer page (`/employer`): post job, see candidates
- Admin page (`/admin`): browse learners & jobs, create manual matches
- Supabase client, Tailwind styling, simple components

## Roadmap (next)

- Role-based auth (learner/employer/admin) via `profiles.role`
- Real lessons & media; scoring; auto-leveling
- Employer contact requests; messaging
- Stripe plans (employer seat, learner premium)
```

