import { createClient } from '@supabase/supabase-js';

// Browser-side Supabase client for the interactive quiz island.
const url = import.meta.env.PUBLIC_SUPABASE_URL as string | undefined;
const key = import.meta.env.PUBLIC_SUPABASE_ANON_KEY as string | undefined;

// Guard so importing this module never throws during the build when env vars
// aren't set. At runtime in the browser the vars are present (set on the host).
export const supabase =
  url && key ? createClient(url, key, { auth: { persistSession: false } }) : (null as any);

export interface Answer {
  id: string;
  text: string;
  nextQuestionId?: string | null;
  outcomeId?: string | null;
  outcomeRules: { outcomeKey: string; weight: number }[];
}
export interface Question {
  id: string;
  question: string;
  sectionTitle?: string | null;
  answers: Answer[];
}
export interface Outcome {
  title: string;
  description: string;
  calendlyUrl: string;
}

// Mirrors the original useQuizData(): builds the quiz graph from four tables.
export async function fetchQuizData(): Promise<{ questions: Question[]; outcomes: Record<string, Outcome> }> {
  const [q, a, o, r] = await Promise.all([
    supabase.from('quiz_questions').select('*').order('display_order'),
    supabase.from('quiz_answers').select('*').order('display_order'),
    supabase.from('quiz_outcomes').select('*'),
    supabase.from('answer_outcome_rules').select('*'),
  ]);
  if (q.error) throw q.error;
  if (a.error) throw a.error;
  if (o.error) throw o.error;
  if (r.error) throw r.error;

  const rulesMap = new Map<string, { outcomeKey: string; weight: number }[]>();
  (r.data ?? []).forEach((row: any) => {
    const list = rulesMap.get(row.answer_id) || [];
    list.push({ outcomeKey: row.outcome_key, weight: row.weight });
    rulesMap.set(row.answer_id, list);
  });

  const questions: Question[] = (q.data ?? []).map((qq: any) => ({
    id: qq.question_key,
    question: qq.question_text,
    sectionTitle: qq.section_title,
    answers: (a.data ?? [])
      .filter((ans: any) => ans.question_id === qq.id)
      .map((ans: any) => ({
        id: ans.answer_key,
        text: ans.answer_text,
        nextQuestionId: ans.next_question_key,
        outcomeId: ans.outcome_key,
        outcomeRules: rulesMap.get(ans.id) || [],
      })),
  }));

  const outcomes: Record<string, Outcome> = {};
  (o.data ?? []).forEach((row: any) => {
    outcomes[row.outcome_key] = {
      title: row.title,
      description: row.description,
      calendlyUrl: row.calendly_url,
    };
  });

  return { questions, outcomes };
}

export interface LeadData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export async function submitLead(
  data: LeadData,
  outcomeKey: string | null,
  answers: Record<string, string>,
) {
  const name = `${data.firstName} ${data.lastName}`.trim();
  const { error } = await supabase
    .from('quiz_submissions')
    .insert({ name, email: data.email, phone: data.phone, outcome_key: outcomeKey, answers });
  if (error) throw error;

  const payload = {
    name,
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    phone: data.phone,
    outcome_key: outcomeKey,
    answers,
    submitted_at: new Date().toISOString(),
  };
  // fire-and-forget integrations (same as original)
  supabase.functions.invoke('send-to-hubspot', { body: payload }).catch((e) => console.error('HubSpot error:', e));
  supabase.functions
    .invoke('send-quiz-pdf-email', { body: { email: data.email, firstName: data.firstName, outcomeKey } })
    .catch((e) => console.error('PDF email error:', e));
}

export async function fetchOutcomePdf(outcomeKey: string) {
  const { data } = await supabase
    .from('quiz_outcome_pdfs')
    .select('pdf_url, title')
    .eq('outcome_key', outcomeKey)
    .eq('is_active', true)
    .limit(1)
    .single();
  return data as { pdf_url: string; title: string } | null;
}
