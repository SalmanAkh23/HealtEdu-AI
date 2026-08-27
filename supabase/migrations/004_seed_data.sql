-- -------------------------------------------------------------
-- HEALTHEDU AI - SEED DATA
-- -------------------------------------------------------------

-- ============================================================
-- CATEGORIES (12)
-- ============================================================
insert into public.categories (id, name, slug, description, icon) values
  ('cat-nutrition-00000000-0000-0000-0000-000000000001', 'Nutrition', 'nutrition', 'Learn how what you eat affects your health and wellbeing.', 'apple'),
  ('cat-exercise-00000000-0000-0000-0000-000000000002', 'Exercise & Fitness', 'exercise', 'Discover how physical activity supports a healthy body and mind.', 'dumbbell'),
  ('cat-sleep-000000000-0000-0000-0000-000000000003', 'Sleep Health', 'sleep', 'Understand the science of sleep and how to improve sleep quality.', 'moon'),
  ('cat-mental-00000000-0000-0000-0000-000000000004', 'Mental Health', 'mental-health', 'Explore strategies for emotional wellbeing and stress management.', 'brain'),
  ('cat-preventive-0000-0000-0000-0000-000000000005', 'Disease Prevention', 'disease-prevention', 'Learn evidence-based strategies to reduce the risk of chronic disease.', 'shield'),
  ('cat-firstaid-00000-0000-0000-0000-000000000006', 'First Aid & Safety', 'first-aid', 'Essential knowledge for responding to common emergency situations.', 'heart-pulse'),
  ('cat-womens-000000000-0000-0000-0000-000000000007', "Women's Health", 'womens-health', 'Educational content covering health topics specific to women.', 'user-round'),
  ('cat-mens-0000000000-0000-0000-0000-000000000008', "Men's Health", 'mens-health', 'Educational content covering health topics specific to men.', 'user'),
  ('cat-children-000000-0000-0000-0000-000000000009', 'Child Health', 'child-health', 'Learn about healthy development and common health topics for children.', 'baby'),
  ('cat-elderly-0000000-0000-0000-0000-000000000010', 'Elderly Health', 'elderly-health', 'Health education focused on healthy aging and longevity.', 'wheelchair'),
  ('cat-hygiene-0000000-0000-0000-0000-000000000011', 'Hygiene & Sanitation', 'hygiene', 'Practical guidance for maintaining good personal and environmental hygiene.', 'hand'),
  ('cat-gut-000000000000-0000-0000-0000-000000000012', 'Digestive Health', 'digestive-health', 'Understand your gut health and how it connects to overall wellness.', 'activity');

-- ============================================================
-- ARTICLES (20)
-- ============================================================
insert into public.articles (category_id, title, slug, excerpt, content, cover_image, reading_time, difficulty, author_name, is_published) values
  -- Nutrition articles
  ('cat-nutrition-00000000-0000-0000-0000-000000000001',
   'Understanding Macronutrients: Proteins, Carbs, and Fats',
   'understanding-macronutrients',
   'Learn the essential role that proteins, carbohydrates, and fats play in powering your body every day.',
   '# Understanding Macronutrients

Macronutrients are nutrients that your body needs in large amounts to function properly. There are three main types: carbohydrates, proteins, and fats.

## Carbohydrates: Your Energy Engine

Carbohydrates are the body''s preferred source of fuel. When you eat carbohydrates, your digestive system breaks them down into glucose, which enters your bloodstream and powers your cells. Complex carbohydrates like whole grains, legumes, and vegetables provide sustained energy because they digest more slowly.

## Proteins: Building Blocks of Life

Proteins are made from amino acids and serve as the structural foundation of muscles, organs, skin, and enzymes. Your body requires dietary protein to build and repair tissues. Good sources include fish, poultry, eggs, legumes, and dairy.

## Fats: Essential for Vital Functions

Healthy fats are required for absorbing fat-soluble vitamins (A, D, E, K), producing hormones, protecting organs, and maintaining cell membrane integrity. Focus on unsaturated fats from sources like avocados, nuts, olive oil, and fatty fish.

## Key Takeaways

- Carbohydrates, proteins, and fats each play distinct and essential roles
- No single macronutrient should be completely eliminated from a healthy diet
- Balance and food quality matter more than strict ratios for most people

> **HealthEdu AI Disclaimer**: This article provides general educational information and is not a substitute for professional medical or nutritional advice.',
   'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=800',
   '5 min', 'beginner', 'HealthEdu AI Editorial Team', true),

  ('cat-nutrition-00000000-0000-0000-0000-000000000001',
   'Hydration Basics: Why Water Is Essential',
   'hydration-basics',
   'Discover why proper hydration is one of the most important and simplest things you can do for your health.',
   '# Hydration Basics

Water makes up approximately 60% of the human body and is involved in virtually every bodily function.

## Why Hydration Matters

Water supports digestion, circulation, temperature regulation, joint lubrication, and toxin removal through urine. Even mild dehydration can reduce concentration, increase fatigue, and impair physical performance.

## How Much Water Do You Need?

General guidance suggests about 8 glasses (approximately 2 liters) per day for most adults, though individual needs vary based on body size, activity level, climate, and overall health status.

## Signs of Dehydration

- Dark-colored urine
- Fatigue and low energy
- Headaches
- Dry mouth and skin
- Reduced urine output

## Tips for Staying Hydrated

- Carry a refillable water bottle
- Drink a glass of water before each meal
- Choose water-rich foods like cucumbers, melons, and leafy greens
- Limit excessive caffeine and alcohol, which can increase fluid loss

> **HealthEdu AI Disclaimer**: This content is for educational purposes and is not a substitute for professional medical advice.',
   'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800',
   '4 min', 'beginner', 'HealthEdu AI Editorial Team', true),

  ('cat-nutrition-00000000-0000-0000-0000-000000000001',
   'Understanding Dietary Fiber and Gut Health',
   'dietary-fiber-gut-health',
   'Explore how dietary fiber supports a healthy digestive system and contributes to long-term wellbeing.',
   '# Dietary Fiber and Gut Health

Dietary fiber is found in plant foods and passes through the digestive system largely intact. It plays a critical role in digestive health and overall wellness.

## Types of Fiber

**Soluble fiber** dissolves in water and forms a gel-like substance that slows digestion, which may help manage blood sugar levels and lower cholesterol. Found in oats, beans, apples, and citrus fruits.

**Insoluble fiber** adds bulk to stool and helps food move through the digestive tract, supporting regular bowel movements. Found in whole wheat, nuts, and vegetables.

## Benefits of Adequate Fiber Intake

- Supports regular bowel function
- Feeds beneficial gut bacteria (prebiotic effect)
- May help manage blood sugar levels
- Contributes to a sense of fullness

## Good Fiber Sources

- Legumes: lentils, chickpeas, black beans
- Whole grains: oats, quinoa, brown rice
- Fruits: pears, berries, apples
- Vegetables: broccoli, carrots, leafy greens

> **HealthEdu AI Disclaimer**: This article is educational only and is not a substitute for professional medical or nutritional advice.',
   'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800',
   '5 min', 'beginner', 'HealthEdu AI Editorial Team', true),

  -- Exercise articles
  ('cat-exercise-00000000-0000-0000-0000-000000000002',
   'Benefits of Regular Physical Activity',
   'benefits-of-physical-activity',
   'Learn how regular exercise benefits not just your body but also your mental health and cognitive function.',
   '# Benefits of Regular Physical Activity

Regular physical activity is one of the most powerful tools for improving and maintaining health. It benefits nearly every system in the body.

## Cardiovascular Benefits

Exercise strengthens the heart muscle, improves circulation, and helps manage blood pressure. Regular cardio activity can lower resting heart rate and improve the heart''s efficiency.

## Musculoskeletal Benefits

Resistance and weight-bearing exercises build muscle mass, maintain bone density, and improve joint stability, which is especially important as we age.

## Mental Health Benefits

Physical activity triggers the release of endorphins and other neurotransmitters that can improve mood, reduce anxiety, and support cognitive function. Regular exercise is associated with lower rates of depression.

## Metabolic Benefits

Exercise increases insulin sensitivity and helps regulate blood sugar. It also boosts resting metabolic rate when combined with muscle-building activity.

## How Much Exercise Is Recommended?

General public health guidance suggests at least 150 minutes of moderate-intensity aerobic activity per week, combined with muscle-strengthening activities on two or more days per week.

> **HealthEdu AI Disclaimer**: This article provides general educational information. Consult a qualified healthcare provider before starting a new exercise program, especially if you have existing health conditions.',
   'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=800',
   '6 min', 'beginner', 'HealthEdu AI Editorial Team', true),

  ('cat-exercise-00000000-0000-0000-0000-000000000002',
   'Beginner Movement Habits: Starting Your Fitness Journey',
   'beginner-movement-habits',
   'If you''re just starting out, this guide covers simple and sustainable ways to build a physical activity habit.',
   '# Beginner Movement Habits

Starting a fitness routine doesn''t require expensive equipment or a gym membership. The key is to start small and build consistency over time.

## Start with Walking

Walking is one of the most accessible forms of exercise. Even short walks of 10-15 minutes can provide health benefits. Aim to gradually increase duration and pace.

## Incorporate Bodyweight Exercises

Push-ups, squats, lunges, and planks can be done anywhere and build functional strength without any equipment.

## Reduce Sitting Time

Long periods of sitting are associated with negative health outcomes independent of exercise habits. Take short standing or walking breaks every hour during sedentary work.

## Build the Habit Before Intensity

Focus on exercising regularly before worrying about intensity. A 20-minute walk every day provides more benefit than an intense workout once a week.

## Listen to Your Body

Distinguish between productive discomfort (muscle fatigue) and warning signals (sharp pain, dizziness, chest discomfort). Stop activity and consult a professional if you experience warning signals.

> **HealthEdu AI Disclaimer**: Always consult with a qualified healthcare provider before beginning a new exercise program, particularly if you have any existing health concerns.',
   'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=800',
   '5 min', 'beginner', 'HealthEdu AI Editorial Team', true),

  -- Sleep articles
  ('cat-sleep-000000000-0000-0000-0000-000000000003',
   'Why Sleep Matters: The Science of Rest',
   'why-sleep-matters',
   'Explore what happens in your brain and body during sleep and why quality rest is essential for health.',
   '# Why Sleep Matters

Sleep is not merely downtime for the brain. It is a period of intense biological activity essential for health, learning, and emotional regulation.

## What Happens During Sleep

Sleep occurs in cycles of approximately 90 minutes, alternating between non-REM and REM stages. During deep non-REM sleep, the body repairs tissues and strengthens the immune system. During REM sleep, the brain consolidates memories and processes emotions.

## The Glymphatic System

During sleep, the brain''s glymphatic system becomes highly active, clearing metabolic waste products including proteins associated with neurodegenerative conditions. This cleaning process is largely impaired during wakefulness.

## Consequences of Poor Sleep

Consistent sleep deprivation is associated with impaired cognitive function, weakened immune response, hormonal disruption, increased cardiovascular risk, and reduced emotional resilience.

## Supporting Good Sleep

- Maintain a consistent sleep and wake schedule
- Avoid bright light exposure in the evening
- Keep the sleeping environment cool, dark, and quiet
- Limit caffeine and alcohol close to bedtime
- Allow wind-down time before sleep

> **HealthEdu AI Disclaimer**: This article is for educational purposes. If you have persistent sleep difficulties, consult a qualified healthcare provider.',
   'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=800',
   '5 min', 'beginner', 'HealthEdu AI Editorial Team', true),

  ('cat-sleep-000000000-0000-0000-0000-000000000003',
   'Understanding Sleep Cycles and Sleep Quality',
   'understanding-sleep-cycles',
   'Learn what makes sleep restful at a biological level and how to improve your sleep architecture.',
   '# Understanding Sleep Cycles

Sleep is organized into repeating cycles that each last roughly 90 minutes. Understanding these cycles can help you make sense of why some mornings you wake refreshed and others you feel groggy.

## The Four Stages of Sleep

**Stage 1 (NREM 1)**: Light sleep, easily awakened. A transition between wakefulness and deeper sleep.

**Stage 2 (NREM 2)**: Body temperature drops, heart rate slows. Brain produces sleep spindles. Most of the night is spent in this stage.

**Stage 3 (NREM 3)**: Deep sleep or slow-wave sleep. Most restorative stage. Difficult to awaken. Physical repair and immune strengthening occur here.

**REM Sleep**: Eyes move rapidly. Brain is highly active. Dreaming typically occurs. Memory consolidation and emotional processing take place.

## Sleep Quality vs. Sleep Quantity

More hours in bed do not always equal better sleep. Factors affecting sleep quality include sleep continuity (minimal awakenings), reaching adequate deep sleep, and cycling through REM sleep appropriately.

> **HealthEdu AI Disclaimer**: Educational content only. Sleep disorders require evaluation by a qualified healthcare professional.',
   'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800',
   '5 min', 'intermediate', 'HealthEdu AI Editorial Team', true),

  -- Mental health articles
  ('cat-mental-00000000-0000-0000-0000-000000000004',
   'Understanding Stress: What It Is and How It Affects You',
   'understanding-stress',
   'Learn what stress is at a biological level and how chronic stress can impact your physical and mental health.',
   '# Understanding Stress

Stress is the body''s response to perceived demands or threats. It involves a cascade of biological changes designed to help you respond to challenges.

## The Stress Response

When you perceive a threat, the hypothalamus signals the adrenal glands to release adrenaline and cortisol. These hormones increase heart rate, sharpen focus, and temporarily boost energy.

## Acute vs. Chronic Stress

**Acute stress** is short-term and can actually be beneficial, helping you perform under pressure. **Chronic stress** occurs when stress responses are activated repeatedly without adequate recovery, and this can negatively affect nearly every body system.

## How Chronic Stress Affects the Body

- Elevated cortisol can suppress immune function
- Persistent cardiovascular activation increases blood pressure
- Sleep is often disrupted
- Digestion can be affected
- Mood and cognitive function may decline

## Healthy Stress Management Strategies

- Regular physical activity helps regulate stress hormones
- Mindfulness and breathing practices activate the relaxation response
- Social connection provides emotional buffering
- Adequate sleep is essential for stress recovery
- Identifying and addressing sources of stress where possible

> **HealthEdu AI Disclaimer**: This is educational content. If you are experiencing significant mental health difficulties, please consult a qualified mental health professional.',
   'https://images.unsplash.com/photo-1493836512294-502baa1986e2?auto=format&fit=crop&q=80&w=800',
   '5 min', 'beginner', 'HealthEdu AI Editorial Team', true),

  ('cat-mental-00000000-0000-0000-0000-000000000004',
   'Healthy Coping Habits for Emotional Wellbeing',
   'healthy-coping-habits',
   'Discover practical, evidence-informed coping strategies that support emotional resilience and mental wellness.',
   '# Healthy Coping Habits

Coping strategies are the behaviors and thought patterns we use to manage stress, difficult emotions, and challenging situations.

## Adaptive vs. Maladaptive Coping

Not all coping is equally healthy. **Adaptive coping** addresses challenges constructively and supports wellbeing. **Maladaptive coping** may provide short-term relief but creates longer-term problems (such as excessive avoidance or substance use).

## Evidence-Informed Coping Strategies

**Mindfulness**: Paying deliberate, non-judgmental attention to the present moment. Research suggests mindfulness practices can reduce anxiety and improve emotional regulation.

**Physical Activity**: Exercise is one of the most effective evidence-based mood regulators, with effects comparable to certain interventions for mild to moderate low mood.

**Social Support**: Connecting with trusted others provides emotional regulation, perspective, and practical help.

**Journaling**: Writing about thoughts and feelings can help process difficult experiences and identify patterns.

**Structured Problem-Solving**: Breaking problems into manageable steps reduces overwhelm and builds a sense of agency.

> **HealthEdu AI Disclaimer**: This article provides general wellness education. For mental health conditions, please consult a qualified mental health professional.',
   'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&q=80&w=800',
   '5 min', 'beginner', 'HealthEdu AI Editorial Team', true),

  -- Disease prevention articles
  ('cat-preventive-0000-0000-0000-0000-000000000005',
   'Preventive Health Basics: Building a Health-Protective Lifestyle',
   'preventive-health-basics',
   'Learn how lifestyle choices significantly influence long-term health and how preventive care works.',
   '# Preventive Health Basics

Preventive health involves taking proactive steps to maintain good health and reduce the risk of developing chronic conditions.

## Primary Prevention

Primary prevention focuses on preventing disease before it occurs. Key strategies include regular physical activity, a nutritious diet, maintaining a healthy weight, not smoking, limiting alcohol, and managing stress.

## Secondary Prevention

Secondary prevention involves detecting conditions early through screening, when they are easier to treat. Regular check-ups and appropriate health screenings support this.

## The Role of Lifestyle

Research consistently shows that lifestyle factors account for a significant proportion of chronic disease risk. Many leading causes of premature death and disability are strongly influenced by modifiable behaviors.

## Practical Preventive Habits

- Move your body regularly
- Eat a diet rich in vegetables, fruits, whole grains, and lean proteins
- Maintain a healthy weight
- Do not smoke
- Limit alcohol consumption
- Manage stress through healthy outlets
- Attend regular health check-ups as appropriate
- Stay up to date with recommended immunizations

> **HealthEdu AI Disclaimer**: This article is for general educational purposes and is not medical advice. Consult your healthcare provider for personalized preventive health recommendations.',
   'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800',
   '5 min', 'beginner', 'HealthEdu AI Editorial Team', true),

  ('cat-preventive-0000-0000-0000-0000-000000000005',
   'Understanding Cardiovascular Health and Risk Factors',
   'cardiovascular-health-risk-factors',
   'An educational overview of cardiovascular health and the key modifiable risk factors associated with heart disease.',
   '# Cardiovascular Health and Risk Factors

Cardiovascular disease remains among the leading causes of morbidity globally. Understanding risk factors is the first step toward protective behaviors.

## What Is the Cardiovascular System?

The cardiovascular system includes the heart and blood vessels, which work together to circulate blood throughout the body, delivering oxygen and nutrients while removing waste products.

## Common Cardiovascular Risk Factors

**Modifiable risk factors** (those influenced by lifestyle):
- High blood pressure (hypertension)
- High blood cholesterol
- Physical inactivity
- Unhealthy diet
- Tobacco use
- Obesity
- Poorly managed blood sugar

**Non-modifiable risk factors**:
- Age
- Family history of cardiovascular disease
- Sex (some risk patterns differ between biological sexes)

## Protective Behaviors

Regular physical activity, a heart-healthy diet emphasizing vegetables, whole grains, and healthy fats, not smoking, maintaining a healthy weight, and managing blood pressure and cholesterol through lifestyle and, where appropriate, medical guidance can significantly reduce cardiovascular risk.

> **HealthEdu AI Disclaimer**: This article is educational and not a substitute for professional medical advice or diagnosis.',
   'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800',
   '6 min', 'intermediate', 'HealthEdu AI Editorial Team', true),

  -- First Aid article
  ('cat-firstaid-00000-0000-0000-0000-000000000006',
   'Basic First Aid: Responding Safely to Common Emergencies',
   'basic-first-aid-essentials',
   'An educational overview of fundamental first aid principles for common emergency situations.',
   '# Basic First Aid Essentials

First aid is the immediate assistance provided to someone who has been injured or is suddenly ill, before professional medical help arrives.

## The Core Principle: D-R-S-A-B-C

A widely used framework for assessing emergencies:
- **D**anger: Ensure the scene is safe for you and the casualty
- **R**esponse: Check for responsiveness
- **S**end for help: Call emergency services if needed
- **A**irway: Open and clear the airway
- **B**reathing: Check for breathing
- **C**PU/Circulation: Begin CPR if trained and the person is not breathing

## Wounds and Bleeding

For minor cuts and abrasions: clean with water, apply gentle pressure, and cover with a clean dressing. For serious bleeding, apply firm direct pressure and call emergency services.

## Burns

Cool a burn under running water for at least 20 minutes. Do not apply ice, butter, or other substances. Cover with a clean non-fluffy material. For serious burns, seek emergency medical attention.

## Important Limitation

This article provides general educational information only. Proper first aid training requires hands-on practice with qualified instructors. The content here cannot replace formal first aid training.

> **HealthEdu AI Disclaimer**: For serious emergencies, call your local emergency number immediately. This content is educational and not a substitute for first aid training or professional medical care.',
   'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=800',
   '6 min', 'beginner', 'HealthEdu AI Editorial Team', true),

  -- More articles for variety
  ('cat-gut-000000000000-0000-0000-0000-000000000012',
   'The Gut Microbiome: An Introduction',
   'gut-microbiome-introduction',
   'Learn about the trillions of microorganisms living in your digestive system and their role in overall health.',
   '# The Gut Microbiome

Your gut contains trillions of microorganisms, collectively known as the gut microbiome. This community of bacteria, viruses, fungi, and other microbes plays important roles in digestion, immunity, and even mood.

## What Does the Gut Microbiome Do?

- Helps digest complex carbohydrates (fiber) that humans cannot process alone
- Produces certain vitamins, including vitamin K and some B vitamins
- Supports immune system development and regulation
- Influences the gut-brain axis, a communication pathway between the gut and brain

## Factors Affecting the Microbiome

Diet has a significant influence on gut microbiome composition. Diets rich in diverse plant foods support microbiome diversity. Processed foods, excessive sugar, and antibiotics can disrupt the balance.

## Supporting a Healthy Microbiome

- Eat a wide variety of plant foods to support microbial diversity
- Include fermented foods like yogurt, kefir, and kimchi
- Prioritize dietary fiber, which feeds beneficial bacteria (prebiotic effect)
- Avoid unnecessary antibiotic use (always follow professional guidance)

> **HealthEdu AI Disclaimer**: This article is for general educational purposes. Gut health concerns should be discussed with a qualified healthcare provider.',
   'https://images.unsplash.com/photo-1559757175-7b8bcae36e9b?auto=format&fit=crop&q=80&w=800',
   '5 min', 'intermediate', 'HealthEdu AI Editorial Team', true),

  ('cat-hygiene-0000000-0000-0000-0000-000000000011',
   'Hand Hygiene: Why Handwashing Matters',
   'hand-hygiene-handwashing',
   'Learn why proper handwashing is one of the most effective ways to prevent the spread of infectious illness.',
   '# Hand Hygiene: Why Handwashing Matters

Proper hand hygiene is one of the most effective and accessible measures for preventing the spread of infectious illness.

## How Pathogens Spread via Hands

Many infectious agents are transmitted through hand-to-face contact after touching contaminated surfaces or people. Regular handwashing disrupts this transmission route.

## When to Wash Your Hands

- Before preparing or eating food
- After using the toilet
- After blowing your nose, coughing, or sneezing
- After touching animals or their environments
- After handling garbage
- After being in public spaces, especially before touching your face

## How to Wash Hands Effectively

1. Wet hands with clean running water
2. Apply soap and lather for at least 20 seconds, covering all surfaces including between fingers and under nails
3. Rinse thoroughly under clean running water
4. Dry with a clean cloth or air dry

## When Soap and Water Are Not Available

Alcohol-based hand sanitizer with at least 60% alcohol is an effective alternative when hands are not visibly soiled.

> **HealthEdu AI Disclaimer**: This article is educational. For guidance on infection prevention in specific situations, consult relevant public health resources or a healthcare provider.',
   'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&q=80&w=800',
   '4 min', 'beginner', 'HealthEdu AI Editorial Team', true),

  ('cat-elderly-0000000-0000-0000-0000-000000000010',
   'Healthy Aging: Key Health Considerations for Older Adults',
   'healthy-aging-key-considerations',
   'An educational guide to understanding how health needs evolve with age and how to support healthy aging.',
   '# Healthy Aging

Aging is a natural process involving gradual physiological changes. Understanding these changes supports better health decisions in later life.

## Common Age-Related Changes

- Gradual decline in muscle mass and bone density
- Changes in metabolic rate
- Slower immune response
- Changes in sleep architecture (less deep sleep, more frequent awakening)
- Cardiovascular changes, including reduced arterial elasticity

## Key Areas for Healthy Aging

**Physical Activity**: Maintaining muscle mass and bone density through resistance and weight-bearing exercise becomes increasingly important with age. Balance training can help prevent falls.

**Nutrition**: Protein needs may increase with age. Calcium and vitamin D are important for bone health. Hydration needs remain important and the sense of thirst may decrease.

**Cognitive Health**: Mental engagement, social connection, physical activity, and quality sleep all support cognitive health in later life.

**Regular Health Reviews**: Regular check-ups allow early detection of conditions that are more prevalent with age.

> **HealthEdu AI Disclaimer**: This article provides general educational information. Older adults should work with qualified healthcare providers to address their specific health needs.',
   'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800',
   '6 min', 'intermediate', 'HealthEdu AI Editorial Team', true),

  ('cat-womens-000000000-0000-0000-0000-000000000007',
   'Women''s Reproductive Health: Educational Overview',
   'womens-reproductive-health-overview',
   'A factual educational introduction to key aspects of female reproductive health across the lifespan.',
   '# Women''s Reproductive Health: Educational Overview

Reproductive health encompasses physical, mental, and social wellbeing in relation to the reproductive system across all stages of life.

## The Menstrual Cycle

The menstrual cycle is a normal physiological process governed by hormonal fluctuations. A typical cycle ranges from 21 to 35 days, though there is significant individual variation. Significant changes in cycle regularity, flow, or associated symptoms are worth discussing with a healthcare provider.

## Common Health Considerations

**Pelvic floor health**: The pelvic floor muscles support the bladder, bowel, and uterus. Pelvic floor exercises (often called Kegel exercises) can support pelvic health across the lifespan.

**Bone health**: Estrogen plays a role in bone density. Maintaining adequate calcium and vitamin D intake and engaging in weight-bearing exercise supports bone health.

**Cardiovascular risk**: Cardiovascular disease is the leading cause of death in women globally. Post-menopausal women experience increased cardiovascular risk, making heart-healthy habits important across the lifespan.

> **HealthEdu AI Disclaimer**: This is educational content only. For personal reproductive health concerns, consult a qualified healthcare provider.',
   'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=800',
   '6 min', 'intermediate', 'HealthEdu AI Editorial Team', true),

  ('cat-mens-0000000000-0000-0000-0000-000000000008',
   'Men''s Health: Preventive Focus and Common Considerations',
   'mens-health-preventive-focus',
   'An educational overview of key health considerations and preventive health priorities for men.',
   '# Men''s Health: Preventive Focus

Men are statistically more likely to delay seeking medical care and to underutilize preventive health services. Understanding key health considerations encourages proactive engagement with health.

## Common Health Priorities

**Cardiovascular health**: Cardiovascular disease is a leading cause of death in men. Lifestyle factors—physical activity, diet, weight, blood pressure, and cholesterol—are major modifiable influences.

**Mental health**: Men are statistically less likely to seek support for mental health difficulties, yet depression and anxiety are significant health concerns. Recognizing symptoms and seeking appropriate support is important.

**Testicular and prostate health**: Understanding normal anatomy and being aware of changes supports early identification of potential issues worth discussing with a provider.

**Injury prevention**: Men have higher rates of occupational and recreational injury. Safety practices and appropriate protective equipment are relevant health behaviors.

## Preventive Health Engagement

Regular health check-ups, not avoiding professional care when symptoms arise, and engaging in health-promoting behaviors throughout life are important for long-term wellbeing.

> **HealthEdu AI Disclaimer**: This is educational content. For personal health concerns, consult a qualified healthcare provider.',
   'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=800',
   '5 min', 'intermediate', 'HealthEdu AI Editorial Team', true),

  ('cat-children-000000-0000-0000-0000-000000000009',
   'Child Health Basics: Supporting Healthy Development',
   'child-health-basics',
   'An educational overview of key factors that support physical and developmental health in children.',
   '# Child Health Basics

Children have unique health needs that evolve across developmental stages. Understanding these needs supports informed care.

## Nutrition in Childhood

Children require adequate energy and nutrients for growth and development. A varied diet including vegetables, fruits, whole grains, lean proteins, and dairy (or appropriate alternatives) supports healthy development.

## Physical Activity

Children benefit from regular active play and structured physical activity. Physical activity supports healthy growth, motor skill development, healthy weight, bone strength, and emotional wellbeing.

## Sleep Needs

Children require more sleep than adults. Adequate sleep supports growth hormone release, memory consolidation, immune function, and emotional regulation. Sleep needs gradually decrease as children age.

## Immunization

Childhood immunization programs protect against serious preventable infectious diseases and contribute to community-level protection. Following recommended immunization schedules is an important aspect of preventive child health care.

## Regular Health Reviews

Scheduled child health checks allow monitoring of growth and development, early identification of concerns, hearing and vision screening, and immunization delivery.

> **HealthEdu AI Disclaimer**: This article is educational. Child health concerns should be discussed with a qualified healthcare provider.',
   'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&q=80&w=800',
   '5 min', 'beginner', 'HealthEdu AI Editorial Team', true),

  ('cat-nutrition-00000000-0000-0000-0000-000000000001',
   'Understanding Sugar and Its Effects on Health',
   'understanding-sugar-effects',
   'Learn the difference between natural and added sugars and how excessive consumption affects wellbeing.',
   '# Understanding Sugar and Its Effects on Health

Sugar is a type of carbohydrate found naturally in fruits, vegetables, and dairy, and is also added to many processed foods.

## Natural Sugars vs. Added Sugars

**Natural sugars** come packaged with fiber, vitamins, and minerals in whole foods, and their consumption is generally not considered problematic in the context of a varied diet. **Added sugars** are those added during food processing or preparation and contribute calories without nutritional benefit.

## Effects of Excessive Added Sugar Consumption

- Blood sugar spikes and crashes, which can affect energy and mood
- Increased calorie intake, which can contribute to weight gain over time
- Association with dental caries (tooth decay)
- High sugar-sweetened beverage consumption is associated with metabolic health concerns

## Practical Approaches

- Read food labels to identify added sugar content
- Choose whole foods over processed alternatives where possible
- Choose water or unsweetened beverages over sugar-sweetened drinks
- Enjoy naturally sweet foods like fruit as primary sources of sweetness

> **HealthEdu AI Disclaimer**: This article provides general educational information and is not personalized dietary advice.',
   'https://images.unsplash.com/photo-1499195333224-3ce974eecb47?auto=format&fit=crop&q=80&w=800',
   '5 min', 'beginner', 'HealthEdu AI Editorial Team', true),

  ('cat-exercise-00000000-0000-0000-0000-000000000002',
   'Flexibility and Mobility: Why They Matter',
   'flexibility-mobility-importance',
   'Understand the difference between flexibility and mobility and why maintaining both supports long-term function.',
   '# Flexibility and Mobility

Flexibility and mobility are often used interchangeably but refer to slightly different things. Both are important components of physical health.

## Flexibility vs. Mobility

**Flexibility** refers to the ability of a muscle to lengthen. **Mobility** refers to the ability to move a joint through its full range of motion with control and strength.

## Why Flexibility and Mobility Matter

- Support posture and alignment
- Reduce injury risk during daily activities and exercise
- Contribute to ease of movement and functional independence
- May reduce certain types of musculoskeletal discomfort associated with tightness

## Supporting Flexibility and Mobility

**Static stretching**: Holding a stretch for 20-60 seconds after exercise, when muscles are warm. Generally not recommended as a primary warm-up.

**Dynamic movement**: Controlled movement through a joint''s range of motion is a more effective warm-up and mobility strategy.

**Regular movement variety**: Using your body in different ways and positions throughout the day supports joint health.

> **HealthEdu AI Disclaimer**: For musculoskeletal concerns or pain during movement, consult a qualified healthcare provider such as a physiotherapist.',
   'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800',
   '5 min', 'beginner', 'HealthEdu AI Editorial Team', true);

-- ============================================================
-- LEARNING MODULES (10)
-- ============================================================
insert into public.learning_modules (id, category_id, title, description, thumbnail, difficulty, estimated_minutes, xp_reward, is_published) values
  ('mod-nutrition-1-0000-0000-0000-000000000001', 'cat-nutrition-00000000-0000-0000-0000-000000000001', 'Nutrition Fundamentals', 'Master the basics of nutrition including macronutrients, micronutrients, and healthy eating patterns.', 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=600', 'beginner', 20, 50, true),
  ('mod-nutrition-2-0000-0000-0000-000000000002', 'cat-nutrition-00000000-0000-0000-0000-000000000001', 'Hydration and Gut Health', 'Explore the essential roles of water and dietary fiber in supporting digestive and overall health.', 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600', 'beginner', 15, 40, true),
  ('mod-exercise-1-0000-0000-0000-000000000003', 'cat-exercise-00000000-0000-0000-0000-000000000002', 'Physical Activity Essentials', 'Understand the benefits of physical activity and how to build a sustainable movement habit.', 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=600', 'beginner', 20, 50, true),
  ('mod-sleep-1-00000-0000-0000-0000-000000000004', 'cat-sleep-000000000-0000-0000-0000-000000000003', 'Sleep Science Foundations', 'Learn the science of sleep, sleep cycles, and practical strategies for improving sleep quality.', 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=600', 'beginner', 15, 40, true),
  ('mod-mental-1-00000-0000-0000-0000-000000000005', 'cat-mental-00000000-0000-0000-0000-000000000004', 'Understanding Stress and Coping', 'Explore the biology of stress and discover evidence-informed coping strategies.', 'https://images.unsplash.com/photo-1493836512294-502baa1986e2?auto=format&fit=crop&q=80&w=600', 'beginner', 20, 50, true),
  ('mod-preventive-1-000-0000-0000-000000000006', 'cat-preventive-0000-0000-0000-0000-000000000005', 'Preventive Health Foundations', 'Learn how lifestyle choices influence long-term health and how to build health-protective habits.', 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=600', 'beginner', 25, 60, true),
  ('mod-firstaid-1-0000-0000-0000-000000000007', 'cat-firstaid-00000-0000-0000-0000-000000000006', 'First Aid Awareness', 'An educational overview of first aid principles for common emergency situations.', 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=600', 'beginner', 20, 50, true),
  ('mod-gut-1-000000000-0000-0000-0000-000000000008', 'cat-gut-000000000000-0000-0000-0000-000000000012', 'Gut Health and the Microbiome', 'Understand the role of the gut microbiome and how to support a healthy digestive system.', 'https://images.unsplash.com/photo-1559757175-7b8bcae36e9b?auto=format&fit=crop&q=80&w=600', 'intermediate', 20, 50, true),
  ('mod-cardio-1-00000-0000-0000-0000-000000000009', 'cat-preventive-0000-0000-0000-0000-000000000005', 'Cardiovascular Health Basics', 'Learn the fundamentals of cardiovascular health and the key risk factors associated with heart disease.', 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600', 'intermediate', 25, 60, true),
  ('mod-aging-1-00000-0000-0000-0000-000000000010', 'cat-elderly-0000000-0000-0000-0000-000000000010', 'Healthy Aging Essentials', 'Explore key health considerations for healthy aging and wellbeing in later life.', 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=600', 'intermediate', 20, 50, true);

-- ============================================================
-- HEALTH TERMS (30)
-- ============================================================
insert into public.health_terms (term, slug, short_definition, simple_explanation, related_terms) values
  ('Hypertension', 'hypertension', 'Persistently elevated blood pressure', 'High blood pressure. The force of blood pushing against your artery walls is consistently too high, which over time can damage blood vessels and increase risk of cardiovascular events.', ARRAY['blood pressure', 'cardiovascular disease', 'arterial health']),
  ('Metabolism', 'metabolism', 'Chemical processes that sustain life', 'All the chemical reactions in your body that convert food and drink into energy. Your metabolic rate refers to how quickly these processes occur at rest.', ARRAY['basal metabolic rate', 'energy', 'calories']),
  ('Inflammation', 'inflammation', 'The body''s immune response', 'Your body''s natural response to injury or infection, causing redness, warmth, swelling, and pain. Chronic (long-lasting) inflammation is associated with many health conditions.', ARRAY['immune system', 'chronic disease', 'cytokines']),
  ('Hyperglycemia', 'hyperglycemia', 'Abnormally high blood sugar', 'When there is too much glucose (sugar) in the bloodstream. This can occur in people with diabetes or prediabetes, particularly after eating.', ARRAY['diabetes', 'blood glucose', 'insulin']),
  ('Hypoglycemia', 'hypoglycemia', 'Abnormally low blood sugar', 'When blood glucose levels fall below normal. Symptoms can include shakiness, sweating, confusion, and fatigue. Requires prompt management, especially in people with diabetes.', ARRAY['diabetes', 'blood glucose', 'insulin']),
  ('Myocardial Infarction', 'myocardial-infarction', 'Heart attack', 'A serious medical emergency where blood flow to part of the heart muscle is blocked, causing damage to the heart tissue. Requires immediate emergency medical attention.', ARRAY['heart disease', 'coronary artery', 'chest pain']),
  ('Dyspnea', 'dyspnea', 'Difficulty breathing', 'The sensation of breathlessness or difficulty breathing. Can occur with exertion in healthy people, but persistent or sudden dyspnea at rest should be evaluated by a healthcare provider.', ARRAY['breathing', 'respiratory', 'oxygen']),
  ('Pathogen', 'pathogen', 'Disease-causing microorganism', 'A microorganism such as a bacterium, virus, fungus, or parasite that can cause disease in a host.', ARRAY['infection', 'immune system', 'bacteria', 'virus']),
  ('Chronic', 'chronic', 'Long-lasting or persistent', 'A medical term describing a condition that is persistent or long-lasting, typically more than three months. Opposite of acute.', ARRAY['long-term', 'disease', 'acute']),
  ('Acute', 'acute', 'Sudden onset or short duration', 'A medical term for a condition or symptom that comes on suddenly and is typically short-lived. Opposite of chronic.', ARRAY['short-term', 'sudden', 'chronic']),
  ('Cardiovascular', 'cardiovascular', 'Relating to the heart and blood vessels', 'Referring to the heart and blood vessel system. Cardiovascular health encompasses the health of these structures and their function in circulating blood.', ARRAY['heart', 'blood vessels', 'circulation']),
  ('Diabetes Mellitus', 'diabetes-mellitus', 'Disorder of blood sugar regulation', 'A group of metabolic conditions characterized by elevated blood sugar levels over a prolonged period, resulting from problems with insulin production or action.', ARRAY['blood glucose', 'insulin', 'pancreas', 'hyperglycemia']),
  ('Insulin', 'insulin', 'Hormone that regulates blood sugar', 'A hormone produced by the pancreas that allows cells to take in glucose from the blood for energy. Essential for blood sugar regulation.', ARRAY['pancreas', 'blood glucose', 'diabetes']),
  ('Cortisol', 'cortisol', 'Primary stress hormone', 'A hormone produced by the adrenal glands in response to stress. It has many functions including regulating metabolism, immune response, and the stress response.', ARRAY['stress', 'adrenal glands', 'hormones']),
  ('BMI', 'bmi', 'Body Mass Index', 'A numerical value calculated from a person''s weight and height, commonly used as a screening tool. Note that BMI has significant limitations and does not directly measure body fat or health.', ARRAY['weight', 'height', 'body composition']),
  ('Aerobic Exercise', 'aerobic-exercise', 'Exercise that uses oxygen for energy', 'Physical activity that is sustained for extended periods and relies primarily on the aerobic energy system. Examples include walking, swimming, and cycling.', ARRAY['cardio', 'endurance', 'heart rate', 'fitness']),
  ('Anaerobic Exercise', 'anaerobic-exercise', 'High-intensity short-duration exercise', 'Exercise of high intensity that cannot be sustained for long periods because energy demand exceeds the rate of aerobic energy production. Examples include sprinting and heavy resistance training.', ARRAY['strength training', 'high intensity', 'lactic acid']),
  ('Gut Microbiome', 'gut-microbiome', 'Community of microorganisms in the digestive tract', 'The trillions of microorganisms, including bacteria, viruses, and fungi, that live in the digestive tract. These microbes play important roles in digestion, immunity, and other body functions.', ARRAY['bacteria', 'digestive health', 'probiotics', 'prebiotics']),
  ('Macronutrient', 'macronutrient', 'Nutrient needed in large amounts', 'The three major categories of nutrients needed in relatively large quantities: carbohydrates, proteins, and fats. They provide energy and essential building blocks for the body.', ARRAY['carbohydrate', 'protein', 'fat', 'nutrition']),
  ('Micronutrient', 'micronutrient', 'Nutrient needed in small amounts', 'Vitamins and minerals required in small amounts for various physiological functions. Essential despite being needed in smaller quantities than macronutrients.', ARRAY['vitamins', 'minerals', 'nutrition']),
  ('Antioxidant', 'antioxidant', 'Substance that helps neutralize free radicals', 'A compound that helps protect cells from damage caused by unstable molecules called free radicals. Found in many fruits, vegetables, and other plant foods.', ARRAY['oxidative stress', 'free radicals', 'vitamins', 'polyphenols']),
  ('Probiotics', 'probiotics', 'Beneficial live microorganisms', 'Live microorganisms that, when consumed in adequate amounts, may provide health benefits, particularly for gut health. Found in fermented foods like yogurt, kefir, and some fermented vegetables.', ARRAY['gut microbiome', 'bacteria', 'fermented foods']),
  ('Prebiotics', 'prebiotics', 'Food for beneficial gut bacteria', 'Non-digestible dietary components, mainly types of fiber, that selectively support the growth and activity of beneficial gut bacteria.', ARRAY['fiber', 'gut microbiome', 'probiotics']),
  ('Osteoporosis', 'osteoporosis', 'Reduced bone density condition', 'A condition characterized by decreased bone mass and deterioration of bone tissue, increasing bone fragility and fracture risk. Influenced by calcium and vitamin D status, physical activity, and hormonal factors.', ARRAY['bone density', 'calcium', 'fracture', 'aging']),
  ('Circadian Rhythm', 'circadian-rhythm', 'Body''s internal 24-hour clock', 'The natural, roughly 24-hour cycle that regulates sleep-wake patterns, hormone release, metabolism, and other physiological processes. Influenced by light and dark cycles.', ARRAY['sleep', 'melatonin', 'biological clock']),
  ('Melatonin', 'melatonin', 'Sleep-regulating hormone', 'A hormone produced by the pineal gland that helps regulate the sleep-wake cycle. Production increases in response to darkness and is suppressed by light.', ARRAY['sleep', 'circadian rhythm', 'pineal gland']),
  ('Immunity', 'immunity', 'Ability to resist disease', 'The body''s capacity to resist specific pathogens or toxins. Involves both innate (non-specific) and adaptive (specific) immune mechanisms.', ARRAY['immune system', 'antibodies', 'pathogens', 'lymphocytes']),
  ('Blood Pressure', 'blood-pressure', 'Force of blood against artery walls', 'The pressure exerted by circulating blood on the walls of blood vessels, recorded as two numbers (systolic/diastolic). Both high and low blood pressure can be relevant to health.', ARRAY['hypertension', 'cardiovascular', 'heart']),
  ('Sedentary Behavior', 'sedentary-behavior', 'Extended time with minimal physical activity', 'Time spent awake in behaviors with very low energy expenditure, such as prolonged sitting. High levels of sedentary behavior are associated with health risks independent of exercise habits.', ARRAY['physical activity', 'sitting', 'lifestyle']),
  ('Calorie', 'calorie', 'Unit of food energy', 'A unit of energy. In nutrition contexts, it refers to kilocalories (kcal), the energy provided by food. Calorie balance—energy intake versus expenditure—influences body weight over time.', ARRAY['energy', 'nutrition', 'metabolism', 'macronutrient']);

-- ============================================================
-- HABITS (8)
-- ============================================================
insert into public.habits (id, name, description, icon, is_active) values
  ('hab-water-00000000-0000-0000-0000-000000000001', 'Drink enough water', 'Aim for about 8 glasses of water throughout the day to stay well hydrated.', 'droplets', true),
  ('hab-exercise-00000-0000-0000-0000-000000000002', 'Be physically active', 'Get at least 30 minutes of moderate physical activity today.', 'activity', true),
  ('hab-sleep-0000000-0000-0000-0000-000000000003', 'Prioritize good sleep', 'Aim for 7-9 hours of quality sleep. Wind down before bed and maintain a consistent schedule.', 'moon', true),
  ('hab-vegetables-000-0000-0000-0000-000000000004', 'Eat vegetables and fruit', 'Include at least 3 servings of vegetables or fruit in your meals today.', 'apple', true),
  ('hab-sugar-0000000-0000-0000-0000-000000000005', 'Limit sugary drinks', 'Choose water or unsweetened beverages instead of sugar-sweetened drinks.', 'ban', true),
  ('hab-screen-0000000-0000-0000-0000-000000000006', 'Limit screen time before bed', 'Avoid bright screens for at least 30-60 minutes before your intended sleep time.', 'monitor-off', true),
  ('hab-mindful-00000-0000-0000-0000-000000000007', 'Take mindful breaks', 'Take 2-3 short breaks today to pause, breathe slowly, and check in with how you are feeling.', 'pause', true),
  ('hab-move-0000000-0000-0000-0000-000000000008', 'Reduce prolonged sitting', 'Take a short standing or walking break at least every 60 minutes during sedentary periods.', 'footprints', true);

-- ============================================================
-- ACHIEVEMENTS (10)
-- ============================================================
insert into public.achievements (id, name, description, icon, xp_required, condition_type, condition_value) values
  ('ach-welcome-000000-0000-0000-0000-000000000001', 'Welcome Explorer', 'Created your HealthEdu AI account and joined the learning community.', 'star', 0, 'signup', 1),
  ('ach-streak7-000000-0000-0000-0000-000000000002', '7-Day Learner', 'Logged in and engaged with the platform for 7 consecutive days.', 'flame', 0, 'streak', 7),
  ('ach-streak30-00000-0000-0000-0000-000000000003', '30-Day Committed', 'Maintained a 30-day learning streak. Outstanding commitment to health education.', 'trophy', 0, 'streak', 30),
  ('ach-xp500-0000000-0000-0000-0000-000000000004', 'Health Scholar', 'Earned 500 XP through learning activities.', 'award', 500, 'xp', 500),
  ('ach-xp1000-000000-0000-0000-0000-000000000005', 'Health Expert', 'Earned 1000 XP through learning activities.', 'medal', 1000, 'xp', 1000),
  ('ach-quiz1-0000000-0000-0000-0000-000000000006', 'Quiz Taker', 'Completed your first quiz on HealthEdu AI.', 'clipboard-check', 0, 'quizzes_completed', 1),
  ('ach-quiz5-0000000-0000-0000-0000-000000000007', 'Quiz Enthusiast', 'Completed 5 quizzes on the platform.', 'clipboard-list', 0, 'quizzes_completed', 5),
  ('ach-habit10-00000-0000-0000-0000-000000000008', 'Habit Builder', 'Completed a daily habit check-in 10 times.', 'check-square', 0, 'habit_completions', 10),
  ('ach-articles10-000-0000-0000-0000-000000000009', 'Avid Reader', 'Read 10 articles on HealthEdu AI.', 'book-open', 0, 'articles_read', 10),
  ('ach-module1-00000-0000-0000-0000-000000000010', 'Module Champion', 'Completed your first full learning module.', 'graduation-cap', 0, 'modules_completed', 1);

-- ============================================================
-- QUIZZES (5)
-- ============================================================
insert into public.quizzes (id, module_id, title, description, passing_score) values
  ('qz-nutrition-1-000-0000-0000-000000000001', 'mod-nutrition-1-0000-0000-0000-000000000001', 'Nutrition Fundamentals Quiz', 'Test your understanding of macronutrients, micronutrients, and balanced nutrition.', 70),
  ('qz-sleep-1-000000-0000-0000-0000-000000000002', 'mod-sleep-1-00000-0000-0000-0000-000000000004', 'Sleep Science Quiz', 'Test your knowledge of sleep science, sleep cycles, and sleep hygiene.', 70),
  ('qz-exercise-1-000-0000-0000-0000-000000000003', 'mod-exercise-1-0000-0000-0000-000000000003', 'Physical Activity Quiz', 'Test your understanding of the benefits and principles of physical activity.', 70),
  ('qz-mental-1-0000-0000-0000-0000-000000000004', 'mod-mental-1-00000-0000-0000-0000-000000000005', 'Stress and Coping Quiz', 'Test your knowledge of stress biology and evidence-informed coping strategies.', 70),
  ('qz-preventive-1-0-0000-0000-000000000005', 'mod-preventive-1-000-0000-0000-000000000006', 'Preventive Health Quiz', 'Test your understanding of preventive health principles and lifestyle risk factors.', 70);

-- ============================================================
-- QUIZ QUESTIONS (30 = 6 per quiz)
-- ============================================================
insert into public.quiz_questions (quiz_id, question, options, correct_answer, explanation, order_index) values
  -- Nutrition Quiz (6 questions)
  ('qz-nutrition-1-000-0000-0000-000000000001', 'Which of the following is the body''s preferred source of energy?', '["Protein","Carbohydrates","Dietary fat","Vitamins"]', 1, 'Carbohydrates are the body''s preferred energy source. They are broken down into glucose, which is the primary fuel for cells, especially the brain.', 1),
  ('qz-nutrition-1-000-0000-0000-000000000001', 'What is the main role of protein in the body?', '["Providing quick energy","Storing energy for later use","Building and repairing tissues","Regulating body temperature"]', 2, 'Proteins provide amino acids that serve as structural building blocks for muscles, organs, enzymes, and many other body components.', 2),
  ('qz-nutrition-1-000-0000-0000-000000000001', 'Which type of dietary fat is generally considered most heart-healthy?', '["Trans fats","Saturated fats","Unsaturated fats","Cholesterol"]', 2, 'Unsaturated fats, found in foods like olive oil, avocados, nuts, and fatty fish, are generally associated with better cardiovascular health outcomes.', 3),
  ('qz-nutrition-1-000-0000-0000-000000000001', 'What does the term ''macronutrient'' refer to?', '["A nutrient needed in very small amounts","A nutrient needed in large amounts that provides energy","A type of vitamin","A supplement used by athletes"]', 1, 'Macronutrients are nutrients required in relatively large quantities. They include carbohydrates, proteins, and fats, all of which provide energy.', 4),
  ('qz-nutrition-1-000-0000-0000-000000000001', 'What is a primary benefit of dietary fiber?', '["It provides significant calories for energy","It supports gut health and regular bowel function","It is a complete protein source","It is the body''s main fat storage form"]', 1, 'Dietary fiber supports digestive health by adding bulk to stool, feeding beneficial gut bacteria, and supporting regular bowel function.', 5),
  ('qz-nutrition-1-000-0000-0000-000000000001', 'Which fat-soluble vitamins does the body need healthy dietary fats to absorb?', '["B vitamins and Vitamin C","Vitamins A, D, E, and K","Iron and Zinc","Vitamin B12 and Folate"]', 1, 'Vitamins A, D, E, and K are fat-soluble, meaning dietary fat is required for their absorption. Low-fat diets can impair the absorption of these vitamins.', 6),

  -- Sleep Quiz (6 questions)
  ('qz-sleep-1-000000-0000-0000-0000-000000000002', 'What is the primary function of the brain''s glymphatic system?', '["Producing sleep hormones like melatonin","Regulating circadian rhythms","Clearing metabolic waste from the brain during sleep","Controlling muscle activity during dreaming"]', 2, 'The glymphatic system is the brain''s waste clearance system. It becomes highly active during sleep, flushing out metabolic waste products including proteins associated with neurodegenerative conditions.', 1),
  ('qz-sleep-1-000000-0000-0000-0000-000000000002', 'Which hormone helps regulate the sleep-wake cycle by responding to darkness?', '["Cortisol","Adrenaline","Insulin","Melatonin"]', 3, 'Melatonin is produced by the pineal gland in response to darkness and signals to the body that it is time to sleep. Bright light suppresses melatonin production.', 2),
  ('qz-sleep-1-000000-0000-0000-0000-000000000002', 'During which Isleep stage does most memory consolidation and dreaming occur?', '["Stage 1 (NREM 1)","Stage 2 (NREM 2)","Stage 3 (Deep Sleep)","REM Sleep"]', 3, 'REM (Rapid Eye Movement) sleep is associated with dreaming and plays an important role in memory consolidation and emotional processing.', 3),
  ('qz-sleep-1-000000-0000-0000-0000-000000000002', 'Why should bright screen use be limited before bed?', '["Screens emit radiation that damages sleep quality","Blue light from screens suppresses melatonin production","Screens cause the brain to overheat","Looking at screens strains eyes, causing headaches that prevent sleep"]', 1, 'The blue light wavelength emitted by electronic screens mimics daylight and suppresses melatonin production, making it harder to fall asleep and reducing sleep quality.', 4),
  ('qz-sleep-1-000000-0000-0000-0000-000000000002', 'What is a circadian rhythm?', '["The number of hours of sleep a person needs","The body''s internal roughly 24-hour biological clock","A type of sleep disorder","The brain wave pattern during deep sleep"]', 1, 'The circadian rhythm is the body''s internal clock that operates on a roughly 24-hour cycle, regulating sleep, hormone release, body temperature, and other physiological processes.', 5),
  ('qz-sleep-1-000000-0000-0000-0000-000000000002', 'How many hours of sleep per night are generally recommended for healthy adults?', '["4-5 hours","5-6 hours","7-9 hours","10-12 hours"]', 2, 'Most health authorities recommend 7-9 hours of sleep per night for healthy adults, though individual needs vary somewhat.', 6),

  -- Exercise Quiz (6 questions)
  ('qz-exercise-1-000-0000-0000-0000-000000000003', 'According to general public health recommendations, how many minutes of moderate-intensity aerobic activity per week is commonly suggested for adults?', '["30 minutes","90 minutes","150 minutes","300 minutes"]', 2, 'Many public health guidelines suggest at least 150 minutes of moderate-intensity aerobic activity per week for adults, though more can provide additional benefits.', 1),
  ('qz-exercise-1-000-0000-0000-0000-000000000003', 'Which of the following is a benefit of regular resistance (strength) training?', '["It reduces bone density over time","It has no effect on metabolic rate","It helps maintain muscle mass and can increase resting metabolic rate","It is only beneficial for professional athletes"]', 2, 'Resistance training helps maintain and build muscle mass. Since muscle tissue is metabolically active, having more muscle mass can increase the amount of energy your body burns at rest.', 2),
  ('qz-exercise-1-000-0000-0000-0000-000000000003', 'What is a primary cardiovascular benefit of regular aerobic exercise?', '["Immediate permanent cure of high blood pressure","Improved heart efficiency and reduced resting heart rate over time","Replacement of necessary medications","Elimination of all cardiovascular risk"]', 1, 'Regular aerobic exercise strengthens the heart muscle, making it more efficient. This typically results in a lower resting heart rate and can contribute to better blood pressure management.', 3),
  ('qz-exercise-1-000-0000-0000-0000-000000000003', 'What distinguishes aerobic from anaerobic exercise?', '["Aerobic exercise uses weights, anaerobic does not","Aerobic is sustained activity relying on oxygen for energy; anaerobic is high-intensity and cannot be sustained for long","Aerobic exercise always requires gym equipment","There is no meaningful difference"]', 1, 'Aerobic exercise is characterized by sustained activity that relies on the oxygen-based energy system, while anaerobic exercise is high-intensity activity where energy demand exceeds what the aerobic system can provide.', 4),
  ('qz-exercise-1-000-0000-0000-0000-000000000003', 'What does research suggest about long periods of sitting, even in people who exercise regularly?', '["Sitting is perfectly healthy as long as you exercise","Prolonged sitting is associated with health risks independent of exercise habits","Regular exercise completely cancels out the effects of sitting","Sitting only affects posture, not systemic health"]', 1, 'Research indicates that high levels of sedentary behavior are associated with health risks independently of whether a person also meets exercise guidelines. Regular movement breaks are recommended.', 5),
  ('qz-exercise-1-000-0000-0000-0000-000000000003', 'What is a mental health benefit of regular physical activity?', '["It eliminates all mental health conditions","It can improve mood and reduce symptoms of anxiety and depression","It only affects physical health","It replaces the need for professional mental health support"]', 1, 'Physical activity promotes the release of endorphins and influences neurotransmitter systems associated with mood regulation. Regular exercise is associated with reduced symptoms of anxiety and depression.', 6),

  -- Mental Health/Stress Quiz (6 questions)
  ('qz-mental-1-0000-0000-0000-0000-000000000004', 'What is cortisol?', '["A neurotransmitter produced in the brain","The primary sleep hormone","The body''s primary stress hormone, produced by the adrenal glands","A vitamin essential for immune function"]', 2, 'Cortisol is a hormone produced by the adrenal glands in response to stress. It plays many roles including regulating the stress response, metabolism, and immune function.', 1),
  ('qz-mental-1-0000-0000-0000-0000-000000000004', 'What is the difference between acute and chronic stress?', '["Acute stress is more severe than chronic stress","Acute stress is short-term and often manageable; chronic stress is persistent and can have wide-ranging health effects","Chronic stress is always beneficial, acute stress is harmful","They are the same thing"]', 1, 'Acute stress is short-term and is a normal and sometimes helpful response. Chronic stress occurs when stress responses are repeatedly or continuously activated, which can negatively affect health.', 2),
  ('qz-mental-1-0000-0000-0000-0000-000000000004', 'Which of the following is an evidence-informed coping strategy for managing stress?', '["Avoiding all challenges","Regular physical activity","Consuming alcohol to relax","Suppressing all emotional responses"]', 1, 'Regular physical activity is one of the most consistently evidence-supported strategies for managing stress, improving mood, and supporting mental wellbeing.', 3),
  ('qz-mental-1-0000-0000-0000-0000-000000000004', 'What does mindfulness practice involve?', '["Thinking positively at all times","Deliberately paying non-judgmental attention to present-moment experience","Avoiding all negative thoughts","Achieving a state of complete mental silence"]', 1, 'Mindfulness involves intentionally directing attention to present-moment experience (thoughts, feelings, sensations) with an attitude of openness and non-judgment.', 4),
  ('qz-mental-1-0000-0000-0000-0000-000000000004', 'Why is social connection important for mental wellbeing?', '["It is not actually important for health","It provides emotional support, perspective, and can help regulate the stress response","It automatically resolves mental health conditions","It is only important in childhood"]', 1, 'Social connection is a fundamental human need. Trusted relationships provide emotional support, help regulate the nervous system, offer perspective, and provide practical assistance during challenges.', 5),
  ('qz-mental-1-0000-0000-0000-0000-000000000004', 'What distinguishes adaptive from maladaptive coping strategies?', '["Adaptive coping is always easy; maladaptive coping requires effort","Adaptive coping addresses challenges constructively and supports wellbeing; maladaptive coping may provide short-term relief but creates longer-term problems","They are equally effective in the long term","Maladaptive coping is always intentional; adaptive coping is not"]', 1, 'Adaptive coping strategies help manage challenges in ways that support long-term wellbeing. Maladaptive strategies may reduce discomfort in the short term but tend to create additional problems over time.', 6),

  -- Preventive Health Quiz (6 questions)
  ('qz-preventive-1-0-0000-0000-000000000005', 'What does primary prevention focus on?', '["Treating diseases after diagnosis","Preventing disease before it occurs through protective lifestyle choices and behaviors","Rehabilitating people after major health events","Detecting conditions through screening"]', 1, 'Primary prevention involves strategies aimed at preventing disease from occurring in the first place, through behaviors and factors that reduce risk.', 1),
  ('qz-preventive-1-0-0000-0000-000000000005', 'Which of the following is a modifiable cardiovascular risk factor?', '["Age","Family history of heart disease","Physical inactivity","Biological sex"]', 2, 'Physical inactivity is a modifiable cardiovascular risk factor, meaning it can be changed through behavior. Age, family history, and biological sex are non-modifiable.', 2),
  ('qz-preventive-1-0-0000-0000-000000000005', 'What is hypertension?', '["A condition of low blood sugar","Abnormally elevated blood pressure that can damage blood vessels over time","A type of inflammatory joint condition","An acute respiratory infection"]', 1, 'Hypertension means persistently elevated blood pressure. Over time, it damages blood vessel walls and is a major risk factor for cardiovascular disease and stroke.', 3),
  ('qz-preventive-1-0-0000-0000-000000000005', 'How does regular physical activity help support cardiovascular health?', '["It permanently replaces the need for any cardiovascular medications","It can improve blood pressure, cholesterol levels, and heart efficiency","It has no real effect on cardiovascular risk","It only benefits people who already have heart disease"]', 1, 'Regular physical activity supports cardiovascular health by helping manage blood pressure, improving cholesterol profiles, reducing body weight, and strengthening the heart muscle.', 4),
  ('qz-preventive-1-0-0000-0000-000000000005', 'What is secondary prevention?', '["Preventing disease before it develops","Early detection of existing conditions through screening, when they are easier to manage","Rehabilitation after major health events","Treating conditions in their advanced stages"]', 1, 'Secondary prevention involves identifying conditions early, often through screening, before they cause significant symptoms or complications, when management is typically more effective.', 5),
  ('qz-preventive-1-0-0000-0000-000000000005', 'What is the general public health recommendation for fruit and vegetable consumption?', '["One serving per week is sufficient","At least 5 servings per day","Fruits and vegetables are optional in a healthy diet","Only specific vegetables provide health benefits"]', 1, 'Many health authorities recommend at least five servings of fruits and vegetables per day. Diets rich in plant foods are consistently associated with reduced risk of chronic disease.', 6);
