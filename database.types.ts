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
      _prisma_migrations: {
        Row: {
          applied_steps_count: number
          checksum: string
          finished_at: string | null
          id: string
          logs: string | null
          migration_name: string
          rolled_back_at: string | null
          started_at: string
        }
        Insert: {
          applied_steps_count?: number
          checksum: string
          finished_at?: string | null
          id: string
          logs?: string | null
          migration_name: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Update: {
          applied_steps_count?: number
          checksum?: string
          finished_at?: string | null
          id?: string
          logs?: string | null
          migration_name?: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Relationships: []
      }
      answers: {
        Row: {
          id: number
          question_id: number | null
          title: string
          True_or_False: boolean
        }
        Insert: {
          id?: number
          question_id?: number | null
          title: string
          True_or_False?: boolean
        }
        Update: {
          id?: number
          question_id?: number | null
          title?: string
          True_or_False?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "answers_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          }
        ]
      }
      questions: {
        Row: {
          id: number
          level: Database["public"]["Enums"]["Level"]
          title: string
        }
        Insert: {
          id?: number
          level?: Database["public"]["Enums"]["Level"]
          title: string
        }
        Update: {
          id?: number
          level?: Database["public"]["Enums"]["Level"]
          title?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string
          email: string
          id: string
          password: string
          username: string
        }
        Insert: {
          created_at?: string
          email?: string
          id?: string
          password?: string
          username?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          password?: string
          username?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      Level: "Easy" | "Medium" | "Hard" | "Ridikkulus"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
