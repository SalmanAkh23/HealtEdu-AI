import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import type { Article, Category } from '@/types/database'
import ArticlesClient from './ArticlesClient'

export const metadata = {
  title: 'Health Articles | HealthEdu AI',
  description: 'Read evidence-based health education articles on nutrition, exercise, sleep, mental health, and more.',
}

const fallbackCategories: Partial<Category>[] = [
  { id: 'cat-nutrition-00000000-0000-0000-0000-000000000001', name: 'Nutrition', slug: 'nutrition' },
  { id: 'cat-exercise-00000000-0000-0000-0000-000000000002', name: 'Exercise & Fitness', slug: 'exercise' },
  { id: 'cat-sleep-000000000-0000-0000-0000-000000000003', name: 'Sleep Health', slug: 'sleep' },
  { id: 'cat-mental-00000000-0000-0000-0000-000000000004', name: 'Mental Health', slug: 'mental-health' },
  { id: 'cat-preventive-0000-0000-0000-0000-000000000005', name: 'Disease Prevention', slug: 'disease-prevention' },
  { id: 'cat-firstaid-00000-0000-0000-0000-000000000006', name: 'First Aid & Safety', slug: 'first-aid' },
  { id: 'cat-womens-000000000-0000-0000-0000-000000000007', name: "Women's Health", slug: 'womens-health' },
  { id: 'cat-mens-0000000000-0000-0000-0000-000000000008', name: "Men's Health", slug: 'mens-health' },
  { id: 'cat-children-000000-0000-0000-0000-000000000009', name: 'Child Health', slug: 'child-health' },
  { id: 'cat-elderly-0000000-0000-0000-0000-000000000010', name: 'Elderly Health', slug: 'elderly-health' },
  { id: 'cat-hygiene-0000000-0000-0000-0000-000000000011', name: 'Hygiene & Sanitation', slug: 'hygiene' },
  { id: 'cat-gut-000000000000-0000-0000-0000-000000000012', name: 'Digestive Health', slug: 'digestive-health' },
]

const fallbackArticles: Partial<Article>[] = [
  {
    id: 'article-nutrition-1',
    category_id: 'cat-nutrition-00000000-0000-0000-0000-000000000001',
    title: 'Understanding Macronutrients: Proteins, Carbs, and Fats',
    slug: 'understanding-macronutrients',
    excerpt: 'Learn the essential role proteins, carbohydrates, and fats play in powering your body every day.',
    cover_image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=800',
    reading_time: '5 min',
    difficulty: 'beginner',
    author_name: 'HealthEdu AI Editorial Team',
    is_published: true,
  },
  {
    id: 'article-nutrition-2',
    category_id: 'cat-nutrition-00000000-0000-0000-0000-000000000001',
    title: 'Hydration Basics: Why Water Is Essential',
    slug: 'hydration-basics',
    excerpt: 'Discover why proper hydration is one of the most important and simplest things you can do for your health.',
    cover_image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800',
    reading_time: '4 min',
    difficulty: 'beginner',
    author_name: 'HealthEdu AI Editorial Team',
    is_published: true,
  },
  {
    id: 'article-exercise-1',
    category_id: 'cat-exercise-00000000-0000-0000-0000-000000000002',
    title: 'Benefits of Regular Physical Activity',
    slug: 'benefits-of-physical-activity',
    excerpt: 'Learn how regular exercise benefits not just your body but also your mental health and cognitive function.',
    cover_image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=800',
    reading_time: '6 min',
    difficulty: 'intermediate',
    author_name: 'HealthEdu AI Editorial Team',
    is_published: true,
  },
  {
    id: 'article-sleep-1',
    category_id: 'cat-sleep-000000000-0000-0000-0000-000000000003',
    title: 'Why Sleep Matters: The Science of Rest',
    slug: 'why-sleep-matters',
    excerpt: 'Explore what happens in your brain and body during sleep and why quality rest is essential for health.',
    cover_image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=800',
    reading_time: '5 min',
    difficulty: 'beginner',
    author_name: 'HealthEdu AI Editorial Team',
    is_published: true,
  },
  {
    id: 'article-mental-1',
    category_id: 'cat-mental-00000000-0000-0000-0000-000000000004',
    title: 'Understanding Stress: What It Is and How It Affects You',
    slug: 'understanding-stress',
    excerpt: 'Learn what stress is at a biological level and how chronic stress can impact your physical and mental health.',
    cover_image: 'https://images.unsplash.com/photo-1493836512294-502baa1986e2?auto=format&fit=crop&q=80&w=800',
    reading_time: '5 min',
    difficulty: 'beginner',
    author_name: 'HealthEdu AI Editorial Team',
    is_published: true,
  },
  {
    id: 'article-preventive-1',
    category_id: 'cat-preventive-0000-0000-0000-0000-000000000005',
    title: 'Preventive Health Basics: Building a Health-Protective Lifestyle',
    slug: 'preventive-health-basics',
    excerpt: 'Learn how lifestyle choices significantly influence long-term health and how preventive care works.',
    cover_image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800',
    reading_time: '5 min',
    difficulty: 'beginner',
    author_name: 'HealthEdu AI Editorial Team',
    is_published: true,
  },
  {
    id: 'article-firstaid-1',
    category_id: 'cat-firstaid-00000-0000-0000-0000-000000000006',
    title: 'Basic First Aid: Responding Safely to Common Emergencies',
    slug: 'basic-first-aid-essentials',
    excerpt: 'An educational overview of fundamental first aid principles for common emergency situations.',
    cover_image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=800',
    reading_time: '6 min',
    difficulty: 'advanced',
    author_name: 'HealthEdu AI Editorial Team',
    is_published: true,
  },
  {
    id: 'article-gut-1',
    category_id: 'cat-gut-000000000000-0000-0000-0000-000000000012',
    title: 'The Gut Microbiome: An Introduction',
    slug: 'gut-microbiome-introduction',
    excerpt: 'Learn about the trillions of microorganisms living in your digestive system and their role in overall health.',
    cover_image: 'https://images.unsplash.com/photo-1559757175-7b8bcae36e9b?auto=format&fit=crop&q=80&w=800',
    reading_time: '5 min',
    difficulty: 'intermediate',
    author_name: 'HealthEdu AI Editorial Team',
    is_published: true,
  },
  {
    id: 'article-hygiene-1',
    category_id: 'cat-hygiene-0000000-0000-0000-0000-000000000011',
    title: 'Hand Hygiene: Why Handwashing Matters',
    slug: 'hand-hygiene-handwashing',
    excerpt: 'Learn why proper handwashing is one of the most effective ways to prevent the spread of infectious illness.',
    cover_image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&q=80&w=800',
    reading_time: '4 min',
    difficulty: 'beginner',
    author_name: 'HealthEdu AI Editorial Team',
    is_published: true,
  },
  {
    id: 'article-elderly-1',
    category_id: 'cat-elderly-0000000-0000-0000-0000-000000000010',
    title: 'Healthy Aging: Key Health Considerations for Older Adults',
    slug: 'healthy-aging-key-considerations',
    excerpt: 'An educational guide to understanding how health needs evolve with age and how to support healthy aging.',
    cover_image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800',
    reading_time: '6 min',
    difficulty: 'intermediate',
    author_name: 'HealthEdu AI Editorial Team',
    is_published: true,
  },
  {
    id: 'article-womens-1',
    category_id: 'cat-womens-000000000-0000-0000-0000-000000000007',
    title: "Women's Reproductive Health: Educational Overview",
    slug: 'womens-reproductive-health-overview',
    excerpt: 'A factual educational introduction to key aspects of female reproductive health across the lifespan.',
    cover_image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=800',
    reading_time: '7 min',
    difficulty: 'advanced',
    author_name: 'HealthEdu AI Editorial Team',
    is_published: true,
  },
  {
    id: 'article-child-1',
    category_id: 'cat-children-000000-0000-0000-0000-000000000009',
    title: 'Child Health Essentials: Daily Habits That Support Growth',
    slug: 'child-health-essentials',
    excerpt: 'Build healthy routines that support your child’s physical growth, emotional wellbeing, and development.',
    cover_image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=800',
    reading_time: '5 min',
    difficulty: 'beginner',
    author_name: 'HealthEdu AI Editorial Team',
    is_published: true,
  },
]

export default async function ArticlesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const [articlesResult, categoriesResult] = await Promise.all([
    supabase
      .from('articles')
      .select('id, title, slug, excerpt, cover_image, reading_time, difficulty, author_name, category_id, view_count, created_at')
      .eq('is_published', true)
      .order('created_at', { ascending: false }),
    supabase.from('categories').select('*').order('name'),
  ])

  const finalArticles = (
    articlesResult.error || !articlesResult.data || articlesResult.data.length === 0
      ? fallbackArticles
      : articlesResult.data
  ) as Partial<Article>[]

  const finalCategories = (
    categoriesResult.error || !categoriesResult.data || categoriesResult.data.length === 0
      ? fallbackCategories
      : categoriesResult.data
  ) as Category[]

  return (
    <ArticlesClient
      articles={finalArticles}
      categories={finalCategories}
    />
  )
}
