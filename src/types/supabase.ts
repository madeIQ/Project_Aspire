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
      workers: {
        Row: {
          id: string
          name: string
          role: string
          status: 'active' | 'inactive' | 'alert'
          location: string
          last_check_in: string
          next_check_in: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          role: string
          status?: 'active' | 'inactive' | 'alert'
          location: string
          last_check_in?: string
          next_check_in?: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          role?: string
          status?: 'active' | 'inactive' | 'alert'
          location?: string
          last_check_in?: string
          next_check_in?: string
          created_at?: string
        }
      }
      daily_reports: {
        Row: {
          id: string
          date: string
          worker_id: string
          worker_name: string
          check_ins: number
          incidents: number
          hours_worked: number
          locations: string[]
          created_at: string
        }
        Insert: {
          id?: string
          date: string
          worker_id: string
          worker_name: string
          check_ins?: number
          incidents?: number
          hours_worked: number
          locations?: string[]
          created_at?: string
        }
        Update: {
          id?: string
          date?: string
          worker_id?: string
          worker_name?: string
          check_ins?: number
          incidents?: number
          hours_worked?: number
          locations?: string[]
          created_at?: string
        }
      }
    }
  }
}