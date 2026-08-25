export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string | null
          full_name: string | null
          avatar_url: string | null
          bio: string | null
          date_of_birth: string | null
          total_xp: number
          current_streak: number
          longest_streak: number
          last_active: string | null
          notification_preferences: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          date_of_birth?: string | null
          total_xp?: number
          current_streak?: number
          longest_streak?: number
          last_active?: string | null
          notification_preferences?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          date_of_birth?: string | null
          total_xp?: number
          current_streak?: number
          longest_streak?: number
          last_active?: string | null
          notification_preferences?: Json
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          icon: string | null
          color: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          icon?: string | null
          color?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          icon?: string | null
          color?: string | null
          created_at?: string
        }
        Relationships: []
      }
      articles: {
        Row: {
          id: string
          category_id: string | null
          title: string
          slug: string
          excerpt: string | null
          content: string
          cover_image: string | null
          reading_time: string | null
          difficulty: string | null
          author_name: string | null
          is_published: boolean
          view_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          category_id?: string | null
          title: string
          slug: string
          excerpt?: string | null
          content: string
          cover_image?: string | null
          reading_time?: string | null
          difficulty?: string | null
          author_name?: string | null
          is_published?: boolean
          view_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          category_id?: string | null
          title?: string
          slug?: string
          excerpt?: string | null
          content?: string
          cover_image?: string | null
          reading_time?: string | null
          difficulty?: string | null
          author_name?: string | null
          is_published?: boolean
          view_count?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      bookmarks: {
        Row: {
          id: string
          user_id: string
          article_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          article_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          article_id?: string
          created_at?: string
        }
        Relationships: []
      }
      learning_modules: {
        Row: {
          id: string
          category_id: string | null
          title: string
          description: string | null
          thumbnail: string | null
          difficulty: string | null
          estimated_minutes: number | null
          xp_reward: number
          is_published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          category_id?: string | null
          title: string
          description?: string | null
          thumbnail?: string | null
          difficulty?: string | null
          estimated_minutes?: number | null
          xp_reward?: number
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          category_id?: string | null
          title?: string
          description?: string | null
          thumbnail?: string | null
          difficulty?: string | null
          estimated_minutes?: number | null
          xp_reward?: number
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      learning_progress: {
        Row: {
          id: string
          user_id: string
          module_id: string
          status: string
          progress_percentage: number
          completed_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          module_id: string
          status?: string
          progress_percentage?: number
          completed_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          module_id?: string
          status?: string
          progress_percentage?: number
          completed_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      health_terms: {
        Row: {
          id: string
          term: string
          slug: string
          short_definition: string
          simple_explanation: string | null
          related_terms: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          term: string
          slug: string
          short_definition: string
          simple_explanation?: string | null
          related_terms?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          term?: string
          slug?: string
          short_definition?: string
          simple_explanation?: string | null
          related_terms?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      quizzes: {
        Row: {
          id: string
          module_id: string | null
          title: string
          description: string | null
          passing_score: number
          created_at: string
        }
        Insert: {
          id?: string
          module_id?: string | null
          title: string
          description?: string | null
          passing_score?: number
          created_at?: string
        }
        Update: {
          id?: string
          module_id?: string | null
          title?: string
          description?: string | null
          passing_score?: number
          created_at?: string
        }
        Relationships: []
      }
      quiz_questions: {
        Row: {
          id: string
          quiz_id: string
          question: string
          options: string[]
          correct_answer: number
          explanation: string | null
          order_index: number
        }
        Insert: {
          id?: string
          quiz_id: string
          question: string
          options: string[]
          correct_answer: number
          explanation?: string | null
          order_index?: number
        }
        Update: {
          id?: string
          quiz_id?: string
          question?: string
          options?: string[]
          correct_answer?: number
          explanation?: string | null
          order_index?: number
        }
        Relationships: []
      }
      quiz_results: {
        Row: {
          id: string
          user_id: string
          quiz_id: string
          score: number
          total_questions: number
          correct_answers: number
          time_taken: number | null
          passed: boolean
          xp_earned: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          quiz_id: string
          score: number
          total_questions: number
          correct_answers: number
          time_taken?: number | null
          passed?: boolean
          xp_earned?: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          quiz_id?: string
          score?: number
          total_questions?: number
          correct_answers?: number
          time_taken?: number | null
          passed?: boolean
          xp_earned?: number
          created_at?: string
        }
        Relationships: []
      }
      habits: {
        Row: {
          id: string
          name: string
          description: string | null
          icon: string | null
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          icon?: string | null
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          icon?: string | null
          is_active?: boolean
          created_at?: string
        }
        Relationships: []
      }
      habit_progress: {
        Row: {
          id: string
          user_id: string
          habit_id: string
          date: string
          completed: boolean
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          habit_id: string
          date: string
          completed?: boolean
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          habit_id?: string
          date?: string
          completed?: boolean
          notes?: string | null
          created_at?: string
        }
        Relationships: []
      }
      achievements: {
        Row: {
          id: string
          name: string
          description: string | null
          icon: string | null
          xp_required: number
          condition_type: string | null
          condition_value: number | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          icon?: string | null
          xp_required?: number
          condition_type?: string | null
          condition_value?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          icon?: string | null
          xp_required?: number
          condition_type?: string | null
          condition_value?: number | null
          created_at?: string
        }
        Relationships: []
      }
      user_achievements: {
        Row: {
          id: string
          user_id: string
          achievement_id: string
          earned_at: string
        }
        Insert: {
          id?: string
          user_id: string
          achievement_id: string
          earned_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          achievement_id?: string
          earned_at?: string
        }
        Relationships: []
      }
      certificates: {
        Row: {
          id: string
          user_id: string
          module_id: string
          certificate_url: string | null
          issued_at: string
        }
        Insert: {
          id?: string
          user_id: string
          module_id: string
          certificate_url?: string | null
          issued_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          module_id?: string
          certificate_url?: string | null
          issued_at?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          title: string
          message: string
          type: string
          is_read: boolean
          action_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          message: string
          type?: string
          is_read?: boolean
          action_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          message?: string
          type?: string
          is_read?: boolean
          action_url?: string | null
          created_at?: string
        }
        Relationships: []
      }
      ai_conversations: {
        Row: {
          id: string
          user_id: string
          title: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      ai_messages: {
        Row: {
          id: string
          conversation_id: string
          role: string
          content: string
          created_at: string
        }
        Insert: {
          id?: string
          conversation_id: string
          role: string
          content: string
          created_at?: string
        }
        Update: {
          id?: string
          conversation_id?: string
          role?: string
          content?: string
          created_at?: string
        }
        Relationships: []
      }
      feedback: {
        Row: {
          id: string
          user_id: string | null
          type: string
          message: string
          rating: number | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          type?: string
          message: string
          rating?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          type?: string
          message?: string
          rating?: number | null
          created_at?: string
        }
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}

// Convenience type aliases
export type Profile = Database['public']['Tables']['profiles']['Row']
export type Category = Database['public']['Tables']['categories']['Row']
export type Article = Database['public']['Tables']['articles']['Row']
export type Bookmark = Database['public']['Tables']['bookmarks']['Row']
export type LearningModule = Database['public']['Tables']['learning_modules']['Row']
export type LearningProgress = Database['public']['Tables']['learning_progress']['Row']
export type HealthTerm = Database['public']['Tables']['health_terms']['Row']
export type Quiz = Database['public']['Tables']['quizzes']['Row']
export type QuizQuestion = Database['public']['Tables']['quiz_questions']['Row']
export type QuizResult = Database['public']['Tables']['quiz_results']['Row']
export type Habit = Database['public']['Tables']['habits']['Row']
export type HabitProgress = Database['public']['Tables']['habit_progress']['Row']
export type Achievement = Database['public']['Tables']['achievements']['Row']
export type UserAchievement = Database['public']['Tables']['user_achievements']['Row']
export type Certificate = Database['public']['Tables']['certificates']['Row']
export type Notification = Database['public']['Tables']['notifications']['Row']
export type AIConversation = Database['public']['Tables']['ai_conversations']['Row']
export type AIMessage = Database['public']['Tables']['ai_messages']['Row']
