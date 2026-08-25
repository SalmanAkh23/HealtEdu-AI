-- -------------------------------------------------------------
-- HEALTHEDU AI - DATABASE INDEXES
-- -------------------------------------------------------------

-- Articles indexes
create index articles_slug_idx on public.articles(slug);
create index articles_category_id_idx on public.articles(category_id);
create index articles_is_published_idx on public.articles(is_published);

-- Categories indexes
create index categories_slug_idx on public.categories(slug);

-- Learning modules indexes
create index learning_modules_category_id_idx on public.learning_modules(category_id);
create index learning_modules_is_published_idx on public.learning_modules(is_published);

-- Bookmarks indexes
create index bookmarks_user_id_idx on public.bookmarks(user_id);
create index bookmarks_article_id_idx on public.bookmarks(article_id);

-- Learning progress indexes
create index learning_progress_user_id_idx on public.learning_progress(user_id);
create index learning_progress_module_id_idx on public.learning_progress(module_id);

-- Health terms indexes
create index health_terms_slug_idx on public.health_terms(slug);
create index health_terms_term_idx on public.health_terms(lower(term));

-- Quiz questions indexes
create index quiz_questions_quiz_id_idx on public.quiz_questions(quiz_id);
create index quiz_questions_order_idx on public.quiz_questions(quiz_id, order_index);

-- Quiz results indexes
create index quiz_results_user_id_idx on public.quiz_results(user_id);
create index quiz_results_quiz_id_idx on public.quiz_results(quiz_id);

-- Habit progress indexes
create index habit_progress_user_id_idx on public.habit_progress(user_id);
create index habit_progress_date_idx on public.habit_progress(date);
create index habit_progress_user_date_idx on public.habit_progress(user_id, date);

-- User achievements indexes
create index user_achievements_user_id_idx on public.user_achievements(user_id);

-- Certificates indexes
create index certificates_user_id_idx on public.certificates(user_id);

-- Notifications indexes
create index notifications_user_id_idx on public.notifications(user_id);
create index notifications_is_read_idx on public.notifications(user_id, is_read);

-- AI conversations indexes
create index ai_conversations_user_id_idx on public.ai_conversations(user_id);

-- AI messages indexes
create index ai_messages_conversation_id_idx on public.ai_messages(conversation_id);
create index ai_messages_created_at_idx on public.ai_messages(conversation_id, created_at);

-- Profiles indexes
create index profiles_username_idx on public.profiles(username);
