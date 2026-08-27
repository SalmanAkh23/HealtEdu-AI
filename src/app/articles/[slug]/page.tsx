import { notFound, redirect } from 'next/navigation'
import { ArrowLeft, Clock, FileText } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import AppShell from '@/components/layout/AppShell'
import { createClient } from '@/lib/supabase/server'

interface ArticlePageProps {
  params: Promise<{ slug: string }>
}

const fallbackArticles = [
  {
    id: 'article-nutrition-1',
    title: 'Understanding Macronutrients: Proteins, Carbs, and Fats',
    slug: 'understanding-macronutrients',
    excerpt: 'Learn the essential role proteins, carbohydrates, and fats play in powering your body every day.',
    cover_image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=800',
    reading_time: '5 min',
    difficulty: 'beginner',
    author_name: 'HealthEdu AI Editorial Team',
    content: '# Understanding Macronutrients\n\nMacronutrients are nutrients that your body needs in large amounts to function properly. There are three main types: carbohydrates, proteins, and fats.\n\n## Carbohydrates: Your Energy Engine\n\nCarbohydrates are the body\'s preferred source of fuel. When you eat carbohydrates, your digestive system breaks them down into glucose, which enters your bloodstream and powers your cells. Complex carbohydrates like whole grains, legumes, and vegetables provide sustained energy because they digest more slowly.\n\n## Proteins: Building Blocks of Life\n\nProteins are made from amino acids and serve as the structural foundation of muscles, organs, skin, and enzymes. Your body requires dietary protein to build and repair tissues. Good sources include fish, poultry, eggs, legumes, and dairy.\n\n## Fats: Essential for Vital Functions\n\nHealthy fats are required for absorbing fat-soluble vitamins (A, D, E, K), producing hormones, protecting organs, and maintaining cell membrane integrity. Focus on unsaturated fats from sources like avocados, nuts, olive oil, and fatty fish.\n\n## Key Takeaways\n\n- Carbohydrates, proteins, and fats each play distinct and essential roles\n- No single macronutrient should be completely eliminated from a healthy diet\n- Balance and food quality matter more than strict ratios for most people\n\n> HealthEdu AI Disclaimer: This content is for educational purposes only and is not a substitute for medical advice.',
  },
  {
    id: 'article-hydration-1',
    title: 'Hydration Basics: Why Water Is Essential',
    slug: 'hydration-basics',
    excerpt: 'Discover why proper hydration is one of the most important and simplest things you can do for your health.',
    cover_image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800',
    reading_time: '4 min',
    difficulty: 'beginner',
    author_name: 'HealthEdu AI Editorial Team',
    content: '# Hydration Basics\n\nWater makes up approximately 60% of the human body and is involved in virtually every bodily function.\n\n## Why Hydration Matters\n\nWater supports digestion, circulation, temperature regulation, joint lubrication, and toxin removal through urine. Even mild dehydration can reduce concentration, increase fatigue, and impair physical performance.\n\n## How Much Water Do You Need?\n\nGeneral guidance suggests about 8 glasses (approximately 2 liters) per day for most adults, though individual needs vary based on body size, activity level, climate, and overall health status.\n\n## Signs of Dehydration\n\n- Dark-colored urine\n- Fatigue and low energy\n- Headaches\n- Dry mouth and skin\n- Reduced urine output\n\n## Tips for Staying Hydrated\n\n- Carry a refillable water bottle\n- Drink a glass of water before each meal\n- Choose water-rich foods like cucumbers, melons, and leafy greens\n- Limit excessive caffeine and alcohol, which can increase fluid loss\n\n> HealthEdu AI Disclaimer: This content is educational only and is not a substitute for professional medical advice.',
  },
  {
    id: 'article-exercise-1',
    title: 'Benefits of Regular Physical Activity',
    slug: 'benefits-of-physical-activity',
    excerpt: 'Learn how regular exercise benefits not just your body but also your mental health and cognitive function.',
    cover_image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=800',
    reading_time: '6 min',
    difficulty: 'beginner',
    author_name: 'HealthEdu AI Editorial Team',
    content: '# Benefits of Regular Physical Activity\n\nRegular physical activity is one of the most powerful tools for improving and maintaining health. It benefits nearly every system in the body.\n\n## Cardiovascular Benefits\n\nExercise strengthens the heart muscle, improves circulation, and helps manage blood pressure.\n\n## Mental Health Benefits\n\nPhysical activity triggers the release of endorphins and other neurotransmitters that can improve mood, reduce anxiety, and support cognitive function.\n\n## How Much Exercise Is Recommended?\n\nGeneral public health guidance suggests at least 150 minutes of moderate-intensity aerobic activity per week.\n\n> HealthEdu AI Disclaimer: This article provides general educational information. Consult a qualified healthcare provider before starting a new exercise program.',
  },
  {
    id: 'article-sleep-1',
    title: 'Why Sleep Matters: The Science of Rest',
    slug: 'why-sleep-matters',
    excerpt: 'Explore what happens in your brain and body during sleep and why quality rest is essential for health.',
    cover_image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=800',
    reading_time: '5 min',
    difficulty: 'beginner',
    author_name: 'HealthEdu AI Editorial Team',
    content: '# Why Sleep Matters\n\nSleep is not merely downtime for the brain. It is a period of intense biological activity essential for health, learning, and emotional regulation.\n\n## What Happens During Sleep\n\nSleep occurs in cycles of approximately 90 minutes. Deep sleep supports tissue repair and immune function. REM sleep supports memory and emotional processing.\n\n## Consequences of Poor Sleep\n\nConsistent sleep deprivation is associated with reduced cognitive performance, weaker immune function, and poor emotional resilience.\n\n> HealthEdu AI Disclaimer: This article is for educational purposes. If you have persistent sleep difficulties, consult a qualified healthcare provider.',
  },
]

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const { data: article, error } = await supabase
    .from('articles')
    .select('id, title, excerpt, content, cover_image, reading_time, difficulty, author_name, created_at')
    .eq('slug', slug)
    .eq('is_published', true)
    .maybeSingle()

  const fallbackArticle = fallbackArticles.find((item) => item.slug === slug)
  const finalArticle = article ?? fallbackArticle

  if (error || !finalArticle) notFound()

  return (
    <AppShell title="Article">
      <article style={{ maxWidth: 820, margin: '0 auto' }}>
        <Link href="/articles" className="btn btn-ghost" style={{ display: 'inline-flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
          <ArrowLeft size={17} /> Back to articles
        </Link>
        {finalArticle.cover_image && (
          <Image src={finalArticle.cover_image} alt="" width={1200} height={540} unoptimized style={{ width: '100%', maxHeight: 360, objectFit: 'cover', borderRadius: 16, marginBottom: '2rem' }} />
        )}
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap', marginBottom: '1rem' }}>
          <span className="badge badge-brand">{finalArticle.difficulty ?? 'General'}</span>
          <span style={{ color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
            <Clock size={15} /> {finalArticle.reading_time ?? 'Read'}
          </span>
        </div>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)', lineHeight: 1.1, marginBottom: '1rem' }}>{finalArticle.title}</h1>
        {finalArticle.excerpt && <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', lineHeight: 1.6, marginBottom: '2rem' }}>{finalArticle.excerpt}</p>}
        <div style={{ display: 'flex', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '2rem' }}>
          <FileText size={16} /> By {finalArticle.author_name ?? 'HealthEdu AI'}
        </div>
        <div style={{ whiteSpace: 'pre-wrap', lineHeight: 1.8, color: 'var(--text-primary)', fontSize: '1rem' }}>{finalArticle.content}</div>
        <p style={{ marginTop: '2.5rem', padding: '1rem', borderRadius: 12, background: 'var(--bg-default)', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
          Educational information only. This article does not replace advice from a qualified healthcare professional.
        </p>
      </article>
    </AppShell>
  )
}
