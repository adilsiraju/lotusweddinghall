// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://nvuypbcaysqhtuoxzhva.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im52dXlwYmNheXNxaHR1b3h6aHZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5NDAzMTgsImV4cCI6MjA2MTUxNjMxOH0.-0S0eCDRSDr1sm0eGIZhQpN4OkOfABjEeB0munwshq0";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);