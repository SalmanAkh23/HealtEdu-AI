-- -------------------------------------------------------------
-- HEALTEDU AI - DATABASE INITIAL SCHEMA
-- -------------------------------------------------------------

-- Create Extensions
create extension if not exists "uuid-ossp";

-- Create updated_at trigger helper
create or replace function public.update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- 1. Profiles table (linked to Auth.Users)
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  full_name text not null,
  username text unique,
  avatar_url text,
  bio text,
  learning_level text default 'beginner',
  xp integer default 0,
  level integer default 1,
  streak integer default 0,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

create trigger update_profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.update_updated_at_column();

-- Trigger to automatically create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, username, avatar_url, bio, learning_level, xp, level, streak)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    coalesce(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1) || '_' || substr(md5(random()::text), 1, 4)),
    coalesce(new.raw_user_meta_data->>'avatar_url', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100'),
    '',
    'beginner',
    0,
    1,
    1
  );
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 2. Categories table
create table public.categories (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  slug text unique not null,
  description text,
  icon text,
  created_at timestamptz default now() not null
);

-- 3. Articles table
create table public.articles (
  id uuid default gen_random_uuid() primary key,
  category_id uuid references public.categories(id) on delete set null,
  title text not null,
  slug text unique not null,
  excerpt text,
  content text not null,
  cover_image text,
  reading_time text,
  difficulty text default 'medium',
  author_name text,
  is_published boolean default true not null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

create trigger update_articles_updated_at
  before update on public.articles
  for each row execute procedure public.update_updated_at_column();

-- 4. Bookmarks table
create table public.bookmarks (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  article_id uuid references public.articles(id) on delete cascade not null,
  created_at timestamptz default now() not null,
  unique (user_id, article_id)
);

-- 5. Learning Modules table
create table public.learning_modules (
  id uuid default gen_random_uuid() primary key,
  category_id uuid references public.categories(id) on delete set null,
  title text not null,
  description text,
  thumbnail text,
  difficulty text default 'medium',
  estimated_minutes integer default 15,
  xp_reward integer default 50,
  is_published boolean default true not null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

create trigger update_learning_modules_updated_at
  before update on public.learning_modules
  for each row execute procedure public.update_updated_at_column();

-- 6. Learning Progress table
create table public.learning_progress (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  module_id uuid references public.learning_modules(id) on delete cascade not null,
  progress_percent integer default 0 not null,
  completed boolean default false not null,
  started_at timestamptz default now() not null,
  completed_at timestamptz,
  updated_at timestamptz default now() not null,
  unique (user_id, module_id)
);

create trigger update_learning_progress_updated_at
  before update on public.learning_progress
  for each row execute procedure public.update_updated_at_column();

-- 7. Health Terms glossary table
create table public.health_terms (
  id uuid default gen_random_uuid() primary key,
  term text unique not null,
  slug text unique not null,
  short_definition text not null,
  simple_explanation text not null,
  related_terms text[] default '{}',
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

create trigger update_health_terms_updated_at
  before update on public.health_terms
  for each row execute procedure public.update_updated_at_column();

-- 8. Quizzes table
create table public.quizzes (
  id uuid default gen_random_uuid() primary key,
  module_id uuid references public.learning_modules(id) on delete cascade unique not null,
  title text not null,
  description text,
  passing_score integer default 80 not null,
  created_at timestamptz default now() not null
);

-- 9. Quiz Questions table
create table public.quiz_questions (
  id uuid default gen_random_uuid() primary key,
  quiz_id uuid references public.quizzes(id) on delete cascade not null,
  question text not null,
  options jsonb not null, -- JSON array of string answers
  correct_answer integer not null, -- index of correct option
  explanation text,
  order_index integer default 0 not null
);

-- 10. Quiz Results table
create table public.quiz_results (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  quiz_id uuid references public.quizzes(id) on delete cascade not null,
  score integer not null,
  correct_answers integer not null,
  total_questions integer not null,
  xp_earned integer default 0 not null,
  completed_at timestamptz default now() not null
);

-- 11. Habits table
create table public.habits (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text,
  icon text,
  is_active boolean default true not null,
  created_at timestamptz default now() not null
);

-- 12. Habit Progress table
create table public.habit_progress (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  habit_id uuid references public.habits(id) on delete cascade not null,
  date date default current_date not null,
  completed boolean default false not null,
  created_at timestamptz default now() not null,
  unique (user_id, habit_id, date)
);

-- 13. Achievements table
create table public.achievements (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text not null,
  icon text,
  xp_required integer default 0,
  condition_type text not null,
  condition_value integer not null,
  created_at timestamptz default now() not null
);

-- 14. User Achievements table
create table public.user_achievements (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  achievement_id uuid references public.achievements(id) on delete cascade not null,
  unlocked_at timestamptz default now() not null,
  unique (user_id, achievement_id)
);

-- 15. Certificates table
create table public.certificates (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  module_id uuid references public.learning_modules(id) on delete cascade not null,
  certificate_number text unique not null,
  issued_at timestamptz default now() not null,
  certificate_url text,
  unique (user_id, module_id)
);

-- 16. Notifications table
create table public.notifications (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  message text not null,
  type text default 'info',
  is_read boolean default false not null,
  created_at timestamptz default now() not null
);

-- 17. AI Conversations table
create table public.ai_conversations (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  title text default 'New Conversation' not null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

create trigger update_ai_conversations_updated_at
  before update on public.ai_conversations
  for each row execute procedure public.update_updated_at_column();

-- 18. AI Messages table
create table public.ai_messages (
  id uuid default gen_random_uuid() primary key,
  conversation_id uuid references public.ai_conversations(id) on delete cascade not null,
  role text not null check (role in ('user', 'assistant', 'system')),
  content text not null,
  created_at timestamptz default now() not null
);

-- 19. Feedback table
create table public.feedback (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  rating integer not null check (rating between 1 and 5),
  message text,
  created_at timestamptz default now() not null
);
