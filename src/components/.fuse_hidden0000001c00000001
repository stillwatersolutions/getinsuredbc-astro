import { useEffect, useState, useCallback } from 'react';
import { z } from 'zod';
import {
  fetchQuizData,
  submitLead,
  fetchOutcomePdf,
  type Question,
  type Answer,
  type Outcome,
  type LeadData,
} from '../lib/supabase-browser';

const pixel = (event: string) => {
  const fbq = (window as any).fbq;
  if (typeof fbq !== 'undefined') fbq('track', event);
};

const VERIFIED_EMAIL_PROVIDERS = [
  'gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'icloud.com',
  'protonmail.com', 'mail.com', 'aol.com', 'live.com', 'msn.com',
];

const leadSchema = z.object({
  firstName: z.string().trim().min(1, 'First name is required').max(100),
  lastName: z.string().trim().min(1, 'Last name is required').max(100),
  email: z.string().trim().email('Invalid email address').max(255).refine((e) => {
    const d = e.split('@')[1]?.toLowerCase();
    return VERIFIED_EMAIL_PROVIDERS.includes(d);
  }, 'Use an email from a common provider (Gmail, Yahoo, Outlook, etc.)'),
  phone: z.string().trim().min(1, 'Phone number is required').regex(
    /^(\+?1)?[\s.-]?\(?([2-9]\d{2})\)?[\s.-]?(\d{3})[\s.-]?(\d{4})$/,
    'Enter a valid US or Canadian phone number',
  ),
});

type Step = 'quiz' | 'loading' | 'lead' | 'generating' | 'success';

const Icon = {
  X: () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12" /></svg>),
  Back: () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6" /></svg>),
  Check: () => (<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6 9 17l-5-5" /></svg>),
};

export default function Quiz() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<{ questions: Question[]; outcomes: Record<string, Outcome> } | null>(null);
  const [loadError, setLoadError] = useState(false);

  const [step, setStep] = useState<Step>('quiz');
  const [qIndex, setQIndex] = useState(0);
  const [history, setHistory] = useState<number[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [scores, setScores] = useState<Record<string, number>>({});
  const [outcomeKey, setOutcomeKey] = useState<string | null>(null);
  const [initiated, setInitiated] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [firstName, setFirstName] = useState('');

  // open via global event (static buttons dispatch 'open-quiz')
  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener('open-quiz', handler);
    return () => window.removeEventListener('open-quiz', handler);
  }, []);

  // load quiz data on first open
  useEffect(() => {
    if (open && !data && !loadError) {
      fetchQuizData().then(setData).catch((e) => { console.error(e); setLoadError(true); });
    }
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) pixel('ViewContent');
    return () => { document.body.style.overflow = ''; };
  }, [open, data, loadError]);

  const reset = () => {
    setStep('quiz'); setQIndex(0); setHistory([]); setAnswers({});
    setScores({}); setOutcomeKey(null); setInitiated(false); setSubmitting(false); setFirstName('');
  };
  const close = useCallback(() => { setOpen(false); reset(); }, []);

  if (!open) return null;

  const questions = data?.questions ?? [];
  const outcomes = data?.outcomes ?? {};
  const current = questions[qIndex];
  const total = questions.length;
  const progress = total > 0 ? ((qIndex + 1) / total) * 100 : 0;

  const onAnswer = (answer: Answer) => {
    if (!initiated) { pixel('InitiateCheckout'); setInitiated(true); }
    setAnswers((prev) => ({ ...prev, [current.id]: answer.id }));
    const newScores = { ...scores };
    answer.outcomeRules?.forEach((r) => { newScores[r.outcomeKey] = (newScores[r.outcomeKey] || 0) + r.weight; });
    setScores(newScores);

    if (answer.outcomeId) {
      setOutcomeKey(answer.outcomeId);
      setStep('loading'); setTimeout(() => setStep('lead'), 1800);
    } else if (answer.nextQuestionId) {
      const next = questions.findIndex((q) => q.id === answer.nextQuestionId);
      if (next !== -1) { setHistory((h) => [...h, qIndex]); setQIndex(next); }
    } else {
      const best = Object.entries(newScores).sort((a, b) => (b[1] !== a[1] ? b[1] - a[1] : b[0].localeCompare(a[0])))[0];
      if (best) setOutcomeKey(best[0]);
      setStep('loading'); setTimeout(() => setStep('lead'), 1800);
    }
  };

  const back = () => {
    if (step === 'lead') { setStep('quiz'); return; }
    if (history.length > 0) { const h = [...history]; const prev = h.pop()!; setHistory(h); setQIndex(prev); }
    else close();
  };

  const onLeadSubmit = async (lead: LeadData) => {
    setSubmitting(true); setFirstName(lead.firstName);
    try {
      await submitLead(lead, outcomeKey, answers);
      pixel('Lead');
      setStep('generating'); setTimeout(() => setStep('success'), 1400);
    } catch (e) {
      console.error('submit error', e);
      alert('Something went wrong saving your info. Please try again.');
    } finally { setSubmitting(false); }
  };

  const showBack = step === 'quiz' || step === 'lead';
  const headerTitle = step === 'generating' ? 'Generating report' : '';

  return (
    <div className="fixed inset-0 z-[100] animate-[fadeIn_.2s_ease]">
      {/* backdrop */}
      <div className="absolute inset-0 bg-gradient-to-br from-skyblue/40 via-secondary to-peach/40" />
      <div className="relative h-[100dvh] md:h-[760px] md:max-w-2xl md:mx-auto md:mt-12 flex flex-col bg-background md:rounded-2xl md:shadow-2xl overflow-hidden">
        {/* header */}
        <div className="border-b border-muted">
          <div className="flex items-center justify-between p-4">
            <div className="w-9">
              {showBack && (
                <button onClick={back} aria-label="Back" className="h-9 w-9 grid place-items-center rounded-lg text-muted-foreground hover:bg-muted"><Icon.Back /></button>
              )}
            </div>
            <div className="flex-1 px-2 text-center">
              {step === 'quiz' && data ? (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Step {qIndex + 1} of {total}</span>
                  <span className="text-sm font-semibold text-primary">{current?.sectionTitle || ''}</span>
                </div>
              ) : (<h2 className="text-lg font-semibold text-primary">{headerTitle}</h2>)}
            </div>
            <div className="w-9">
              <button onClick={close} aria-label="Close" className="h-9 w-9 grid place-items-center rounded-lg text-muted-foreground hover:bg-muted"><Icon.X /></button>
            </div>
          </div>
          {step === 'quiz' && data && (
            <div className="h-1.5 bg-muted"><div className="h-full bg-primary transition-all" style={{ width: `${progress}%` }} /></div>
          )}
        </div>

        {/* body */}
        <div className="flex-1 overflow-y-auto px-5 py-8">
          {loadError && <p className="text-center text-muted-foreground">Couldn't load the quiz right now. Please try again later.</p>}

          {!data && !loadError && (
            <div className="grid h-full place-items-center"><div className="h-12 w-12 animate-spin rounded-full border-b-2 border-primary" /></div>
          )}

          {data && step === 'quiz' && current && (
            <div className="max-w-lg mx-auto animate-[fadeIn_.2s_ease]">
              <h3 className="font-display text-2xl font-black text-primary text-center">{current.question}</h3>
              <div className="mt-6 space-y-3">
                {current.answers.map((a) => (
                  <button key={a.id} onClick={() => onAnswer(a)} className="w-full text-left rounded-xl border-2 border-muted bg-secondary/40 px-5 py-4 font-medium text-foreground transition-all hover:border-primary hover:bg-secondary">
                    {a.text}
                  </button>
                ))}
              </div>
            </div>
          )}

          {data && step === 'loading' && (
            <div className="grid h-full place-items-center"><div className="text-center"><div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-primary" /><p className="mt-4 text-sm text-muted-foreground">Analyzing your answers…</p></div></div>
          )}

          {data && step === 'lead' && (
            <LeadForm onSubmit={onLeadSubmit} submitting={submitting} />
          )}

          {data && step === 'generating' && (
            <div className="grid h-full place-items-center"><div className="text-center"><div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-primary" /><p className="mt-4 text-sm text-muted-foreground">Generating your report…</p></div></div>
          )}

          {data && step === 'success' && (
            <SuccessView firstName={firstName} outcomeKey={outcomeKey} outcome={outcomeKey ? outcomes[outcomeKey] : undefined} onClose={close} />
          )}
        </div>
      </div>
      <style>{`@keyframes fadeIn{from{opacity:0}to{opacity:1}}`}</style>
    </div>
  );
}

function LeadForm({ onSubmit, submitting }: { onSubmit: (d: LeadData) => void; submitting: boolean }) {
  const [form, setForm] = useState<LeadData>({ firstName: '', lastName: '', email: '', phone: '' });
  const [errors, setErrors] = useState<Partial<Record<keyof LeadData, string>>>({});

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = leadSchema.safeParse(form);
    if (!r.success) {
      const fe: Partial<Record<keyof LeadData, string>> = {};
      r.error.errors.forEach((err) => { fe[err.path[0] as keyof LeadData] = err.message; });
      setErrors(fe); return;
    }
    setErrors({}); onSubmit(form);
  };

  const field = (key: keyof LeadData, label: string, type: string, placeholder: string) => (
    <div>
      <label htmlFor={key} className="block text-sm font-medium mb-2 text-foreground">{label}</label>
      <input
        id={key} type={type} value={form[key]} disabled={submitting} placeholder={placeholder}
        onChange={(e) => { setForm({ ...form, [key]: e.target.value }); if (errors[key]) setErrors({ ...errors, [key]: undefined }); }}
        className="w-full rounded-xl border-2 border-muted bg-background px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
      />
      {errors[key] && <p className="mt-1 text-sm text-red-600">{errors[key]}</p>}
    </div>
  );

  return (
    <form onSubmit={submit} className="max-w-md mx-auto space-y-5 animate-[fadeIn_.2s_ease]">
      <div className="text-center space-y-2">
        <h3 className="font-display text-2xl font-black text-primary">Almost there!</h3>
        <p className="font-medium text-foreground">Where should we send your report?</p>
        <p className="text-sm text-muted-foreground">Get a simple PDF summary of your insurance options and any coverage gaps.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {field('firstName', 'First Name', 'text', 'John')}
        {field('lastName', 'Last Name', 'text', 'Doe')}
      </div>
      {field('email', 'Email Address', 'email', 'john@gmail.com')}
      {field('phone', 'Phone Number', 'tel', '(604) 123-4567')}
      <button type="submit" disabled={submitting} className="w-full rounded-full bg-primary px-6 py-3.5 font-semibold text-white disabled:opacity-60">
        {submitting ? 'Submitting…' : 'Email me my PDF report'}
      </button>
      <p className="text-xs text-muted-foreground text-center">By submitting, you agree to receive emails and texts about your report. You can opt out anytime.</p>
    </form>
  );
}

function SuccessView({ firstName, outcomeKey, outcome, onClose }: { firstName: string; outcomeKey: string | null; outcome?: Outcome; onClose: () => void; }) {
  const [pdf, setPdf] = useState<{ pdf_url: string; title: string } | null>(null);
  useEffect(() => { if (outcomeKey) fetchOutcomePdf(outcomeKey).then(setPdf).catch(() => {}); }, [outcomeKey]);

  const steps = [
    { t: 'We review your assessment', d: 'Our team reviews your details and identifies opportunities.' },
    { t: 'A licensed advisor contacts you', d: 'Expect a quick call or email to go over your options.' },
    { t: 'Go over your report', d: "Together you'll walk through your personalized recommendations." },
  ];

  return (
    <div className="max-w-md mx-auto space-y-6 py-2 animate-[fadeIn_.2s_ease]">
      <div className="text-center space-y-3">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-sage/30 text-sage-dark"><span className="text-green-600"><Icon.Check /></span></div>
        <h3 className="font-display text-2xl font-black text-primary">Thanks {firstName}, you're all set!</h3>
        <p className="text-sm text-muted-foreground">Your benefits assessment has been submitted. Here's what happens next:</p>
      </div>
      {outcome && (
        <div className="rounded-2xl bg-secondary/60 border border-muted p-5 text-center">
          <p className="font-display text-lg font-bold text-primary">{outcome.title}</p>
          <p className="mt-1 text-sm text-muted-foreground">{outcome.description}</p>
          {outcome.calendlyUrl && (
            <a href={outcome.calendlyUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block rounded-full bg-primary px-6 py-3 font-semibold text-white">Book a call</a>
          )}
        </div>
      )}
      <div className="space-y-4">
        {steps.map((s, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary/10 text-sm font-semibold text-primary">{i + 1}</div>
            <p className="text-sm text-muted-foreground"><span className="font-semibold text-foreground">{s.t}</span> – {s.d}</p>
          </div>
        ))}
      </div>
      {pdf && (
        <a href={pdf.pdf_url} target="_blank" rel="noopener noreferrer" className="block w-full rounded-full bg-primary px-6 py-3.5 text-center font-semibold text-white">Download your personalized report</a>
      )}
      <button onClick={onClose} className="w-full rounded-full border-2 border-muted px-6 py-3 font-semibold text-primary">Back to GetInsuredBC</button>
    </div>
  );
}
