-- -------------------------------------------------------------
-- HEALTHEDU AI - ROW LEVEL SECURITY POLICIES
-- -------------------------------------------------------------

-- Enable RLS on all user-sensitive tables
alter table public.profiles enable row level security;
alter table public.bookmarks enable row level security;
alter table public.learning_progress enable row level security;
alter table public.quiz_results enable row level security;
alter table public.habit_progress enable row level security;
alter table public.user_achievements enable row level security;
alter table public.certificates enable row level security;
alter table public.notifications enable row level security;
alter table public.ai_conversations enable row level security;
alter table public.ai_messages enable row level security;
alter table public.feedback enable row level security;

-- Enable RLS on public-read tables too (so we can control published status)
alter table public.categories enable row level security;
alter table public.articles enable row level security;
alter table public.learning_modules enable row level security;
alter table public.health_terms enable row level security;
alter table public.quizzes enable row level security;
alter table public.quiz_questions enable row level security;
alter table public.habits enable row level security;
alter table public.achievements enable row level security;

-- ============================================================
-- PROFILES POLICIES
-- ============================================================
create policy "Users can read own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- ============================================================
-- CATEGORIES POLICIES (public read)
-- ============================================================
create policy "Categories are publicly readable"
  on public.categories for select
  using (true);

-- ============================================================
-- ARTICLES POLICIES (public read for published)
-- ============================================================
create policy "Published articles are publicly readable"
  on public.articles for select
  using (is_published = true);

-- ============================================================
-- BOOKMARKS POLICIES
-- ============================================================
create policy "Users can read own bookmarks"
  on public.bookmarks for select
  using (auth.uid() = user_id);

create policy "Users can insert own bookmarks"
  on public.bookmarks for insert
  with check (auth.uid() = user_id);

create policy "Users can delete own bookmarks"
  on public.bookmarks for delete
  using (auth.uid() = user_id);

-- ============================================================
-- LEARNING MODULES POLICIES (public read for published)
-- ============================================================
create policy "Published learning modules are publicly readable"
  on public.learning_modules for select
  using (is_published = true);

-- ============================================================
-- LEARNING PROGRESS POLICIES
-- ============================================================
create policy "Users can read own learning progress"
  on public.learning_progress for select
  using (auth.uid() = user_id);

create policy "Users can insert own learning progress"
  on public.learning_progress for insert
  with check (auth.uid() = user_id);

create policy "Users can update own learning progress"
  on public.learning_progress for update
  using (auth.uid() = user_id);

-- ============================================================
-- HEALTH TERMS POLICIES (public read)
-- ============================================================
create policy "Health terms are publicly readable"
  on public.health_terms for select
  using (true);

-- ============================================================
-- QUIZZES & QUESTIONS POLICIES (public read)
-- ============================================================
create policy "Quizzes are publicly readable"
  on public.quizzes for select
  using (true);

create policy "Quiz questions are publicly readable"
  on public.quiz_questions for select
  using (true);

-- ============================================================
-- QUIZ RESULTS POLICIES
-- ============================================================
create policy "Users can read own quiz results"
  on public.quiz_results for select
  using (auth.uid() = user_id);

create policy "Users can insert own quiz results"
  on public.quiz_results for insert
  with check (auth.uid() = user_id);

-- ============================================================
-- HABITS POLICIES (public read for active)
-- ============================================================
create policy "Active habits are publicly readable"
  on public.habits for select
  using (is_active = true);

-- ============================================================
-- HABIT PROGRESS POLICIES
-- ============================================================
create policy "Users can read own habit progress"
  on public.habit_progress for select
  using (auth.uid() = user_id);

create policy "Users can insert own habit progress"
  on public.habit_progress for insert
  with check (auth.uid() = user_id);

create policy "Users can update own habit progress"
  on public.habit_progress for update
  using (auth.uid() = user_id);

create policy "Users can delete own habit progress"
  on public.habit_progress for delete
  using (auth.uid() = user_id);

-- ============================================================
-- ACHIEVEMENTS POLICIES (public read)
-- ============================================================
create policy "Achievements are publicly readable"
  on public.achievements for select
  using (true);

-- ============================================================
-- USER ACHIEVEMENTS POLICIES
-- ============================================================
create policy "Users can read own achievements"
  on public.user_achievements for select
  using (auth.uid() = user_id);

create policy "Users can insert own achievements"
  on public.user_achievements for insert
  with check (auth.uid() = user_id);

-- ============================================================
-- CERTIFICATES POLICIES
-- ============================================================
create policy "Users can read own certificates"
  on public.certificates for select
  using (auth.uid() = user_id);

create policy "Users can insert own certificates"
  on public.certificates for insert
  with check (auth.uid() = user_id);

-- ============================================================
-- NOTIFICATIONS POLICIES
-- ============================================================
create policy "Users can read own notifications"
  on public.notifications for select
  using (auth.uid() = user_id);

create policy "Users can update own notifications"
  on public.notifications for update
  using (auth.uid() = user_id);

create policy "Users can insert own notifications"
  on public.notifications for insert
  with check (auth.uid() = user_id);

create policy "Users can delete own notifications"
  on public.notifications for delete
  using (auth.uid() = user_id);

-- ============================================================
-- AI CONVERSATIONS POLICIES
-- ============================================================
create policy "Users can read own AI conversations"
  on public.ai_conversations for select
  using (auth.uid() = user_id);

create policy "Users can insert own AI conversations"
  on public.ai_conversations for insert
  with check (auth.uid() = user_id);

create policy "Users can update own AI conversations"
  on public.ai_conversations for update
  using (auth.uid() = user_id);

create policy "Users can delete own AI conversations"
  on public.ai_conversations for delete
  using (auth.uid() = user_id);

-- ============================================================
-- AI MESSAGES POLICIES
-- ============================================================
create policy "Users can read own AI messages"
  on public.ai_messages for select
  using (
    exists (
      select 1 from public.ai_conversations
      where id = ai_messages.conversation_id
      and user_id = auth.uid()
    )
  );

create policy "Users can insert own AI messages"
  on public.ai_messages for insert
  with check (
    exists (
      select 1 from public.ai_conversations
      where id = ai_messages.conversation_id
      and user_id = auth.uid()
    )
  );

-- ============================================================
-- FEEDBACK POLICIES
-- ============================================================
create policy "Users can read own feedback"
  on public.feedback for select
  using (auth.uid() = user_id);

create policy "Users can insert own feedback"
  on public.feedback for insert
  with check (auth.uid() = user_id);
