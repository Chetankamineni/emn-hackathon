import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://fmuelomcdhcehuwivfwx.supabase.co";
const ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtdWVsb21jZGhjZWh1d2l2Znd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4NzQyOTksImV4cCI6MjA3NDQ1MDI5OX0.tox0leie8nwVDkksvHnAbmH3vCOqilWJACK0Zv--JPg";

export const supabase = createClient(SUPABASE_URL, ANON_KEY);