
-- Run this in Supabase SQL editor.

-- Profiles
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text default 'learner' check (role in ('learner','employer','admin')),
  spanish_level text,
  english_level text,
  experience text,
  created_at timestamp with time zone default now()
);

-- Lessons
create table if not exists public.lessons (
  id bigserial primary key,
  title text not null,
  level text not null
);

-- Lesson progress
create table if not exists public.lesson_progress (
  id bigserial primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  lesson_id bigint references public.lessons(id) on delete cascade,
  completed boolean default false,
  completed_at timestamp with time zone default now()
);

-- Jobs
create table if not exists public.jobs (
  id bigserial primary key,
  title text not null,
  company text not null,
  location text not null,
  pay text,
  english_level text not null,
  created_at timestamp with time zone default now()
);

-- Applications
create table if not exists public.applications (
  id bigserial primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  job_id bigint references public.jobs(id) on delete cascade,
  status text default 'applied' check (status in ('applied','review','interview','offer','rejected')),
  created_at timestamp with time zone default now()
);

-- Matches (admin-created recommendations)
create table if not exists public.matches (
  id bigserial primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  job_id bigint references public.jobs(id) on delete cascade,
  status text default 'recommended',
  created_at timestamp with time zone default now()
);

-- RLS (public read, authenticated write where appropriate)
alter table public.profiles enable row level security;
alter table public.lesson_progress enable row level security;
alter table public.jobs enable row level security;
alter table public.applications enable row level security;
alter table public.matches enable row level security;

-- Policies
do $$ begin
  create policy "read profiles" on public.profiles for select using (true);
exception when duplicate_object then null; end $$;
do $$ begin
  create policy "upsert own profile" on public.profiles for insert with check (auth.uid() = id);
exception when duplicate_object then null; end $$;
do $$ begin
  create policy "update own profile" on public.profiles for update using (auth.uid() = id);
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "read lessons" on public.lessons for select using (true);
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "read lesson_progress" on public.lesson_progress for select using (auth.role() = 'authenticated');
exception when duplicate_object then null; end $$;
do $$ begin
  create policy "insert own progress" on public.lesson_progress for insert with check (auth.uid() = user_id);
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "read jobs" on public.jobs for select using (true);
exception when duplicate_object then null; end $$;
do $$ begin
  create policy "insert jobs (temporary open)" on public.jobs for insert with check (true);
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "read applications" on public.applications for select using (auth.role() = 'authenticated');
exception when duplicate_object then null; end $$;
do $$ begin
  create policy "apply to job" on public.applications for insert with check (auth.uid() = user_id);
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "read matches" on public.matches for select using (true);
exception when duplicate_object then null; end $$;
do $$ begin
  create policy "create match (temporary open)" on public.matches for insert with check (true);
exception when duplicate_object then null; end $$;

-- Seed minimal lessons
insert into public.lessons (title, level) values
('Greetings & Phone Etiquette', 'A2'),
('Customer Support Dialogues', 'B1'),
('Workplace Vocabulary (Front Desk)', 'B1')
on conflict do nothing;
