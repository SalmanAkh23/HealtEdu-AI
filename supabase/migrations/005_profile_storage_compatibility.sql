-- Keep profile fields used by the application available on existing databases.
alter table public.profiles
  add column if not exists total_xp integer not null default 0,
  add column if not exists current_streak integer not null default 0,
  add column if not exists longest_streak integer not null default 0,
  add column if not exists last_active date,
  add column if not exists date_of_birth date,
  add column if not exists notification_preferences jsonb not null default '{}'::jsonb;

update public.profiles
set total_xp = coalesce(total_xp, xp, 0),
    current_streak = coalesce(current_streak, streak, 0),
    longest_streak = greatest(coalesce(longest_streak, 0), coalesce(streak, 0));

create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('avatars', 'avatars', true, 2097152, array['image/jpeg', 'image/png', 'image/webp', 'image/gif'])
on conflict (id) do update set public = true, file_size_limit = 2097152;

create policy "Users can upload own avatar"
  on storage.objects for insert
  with check (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);

create policy "Users can update own avatar"
  on storage.objects for update
  using (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text)
  with check (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);

create policy "Users can delete own avatar"
  on storage.objects for delete
  using (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);

create policy "Avatars are publicly readable"
  on storage.objects for select
  using (bucket_id = 'avatars');