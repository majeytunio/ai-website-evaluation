// src/supabaseClient.js

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://yaaobexfoabasueqmbdw.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlhYW9iZXhmb2FiYXN1ZXFtYmR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2MjEwMjAsImV4cCI6MjA2ODE5NzAyMH0.QmTXK1sribesoKxHokah0WX4fR6dr4NN6RrZyCOfkr0";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);