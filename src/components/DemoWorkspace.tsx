'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';

type DemoKind = 'document' | 'support' | 'content';

const demoCopy = {
  document: {
    eyebrow: 'AI DOCUMENT ASSISTANT',
    title: 'Turn long notes into a useful brief.',
    description: 'Paste a document excerpt and see how an AI workspace can surface the important details for a busy team.',
    placeholder: 'Paste meeting notes, a product brief, or a policy excerpt here...',
    button: 'Analyze document',
  },
  support: {
    eyebrow: 'AI CUSTOMER SUPPORT',
    title: 'Give every visitor a helpful first answer.',
    description: 'Test a support assistant that understands common questions and guides visitors to a next step.',
    placeholder: 'Ask about pricing, implementation, support, or integrations...',
    button: 'Send message',
  },
  content: {
    eyebrow: 'AI CONTENT WORKFLOW',
    title: 'Turn one idea into a launch-ready plan.',
    description: 'Describe a product or campaign and generate a structured content workflow your team can act on.',
    placeholder: 'Example: Launch an AI scheduling assistant for small clinics...',
    button: 'Generate workflow',
  },
} as const;

export default function DemoWorkspace({ kind }: { kind: DemoKind }) {
  const copy = demoCopy[kind];
  const [input, setInput] = useState('');
  const [result, setResult] = useState<{ heading?: string; body: string; items?: string[] } | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setResult(null);
    setIsLoading(true);
    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kind, input }),
      });
      const contentType = response.headers.get('content-type') || '';
      const data = contentType.includes('application/json')
        ? await response.json()
        : { error: `The AI endpoint returned an unexpected response (${response.status}). Redeploy the project with server-side API routes enabled.` };
      if (!response.ok) throw new Error(data.error || 'The AI service could not respond.');
      if (!contentType.includes('application/json')) throw new Error(data.error);
      setResult(data);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'The AI service could not respond.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f5f2eb] text-neutral-900">
      <div className="mx-auto max-w-6xl px-6 py-8 sm:px-10 lg:py-12">
        <Link href="/projects" className="text-sm font-medium text-neutral-500 transition hover:text-neutral-900">← Back to AI demos</Link>
        <div className="mt-16 grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <header>
            <p className="text-xs font-bold tracking-[0.22em] text-emerald-700">{copy.eyebrow}</p>
            <h1 className="mt-5 max-w-xl text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">{copy.title}</h1>
            <p className="mt-6 max-w-lg text-base leading-7 text-neutral-600">{copy.description}</p>
            <p className="mt-8 max-w-sm border-l-2 border-emerald-600 pl-4 text-sm leading-6 text-neutral-500">Live Gemini-powered portfolio demo. Do not paste confidential documents or private customer data.</p>
          </header>

          <section className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-[0_18px_50px_rgba(41,37,36,0.09)]">
            <div className="flex items-center justify-between border-b border-neutral-200 px-5 py-4">
              <div className="flex gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-red-300" /><span className="h-2.5 w-2.5 rounded-full bg-yellow-300" /><span className="h-2.5 w-2.5 rounded-full bg-green-300" /></div>
              <span className="text-xs font-medium text-neutral-400">{kind === 'support' ? 'Live conversation' : 'Workspace preview'}</span>
            </div>
            <form onSubmit={handleSubmit} className="p-5 sm:p-8">
              <label htmlFor="demo-input" className="text-sm font-semibold text-neutral-800">Try the workflow</label>
              <textarea id="demo-input" value={input} onChange={(event) => setInput(event.target.value)} placeholder={copy.placeholder} className="mt-3 min-h-36 w-full resize-y rounded-xl border border-neutral-200 bg-neutral-50 p-4 text-sm leading-6 outline-none transition placeholder:text-neutral-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100" />
              <button type="submit" disabled={isLoading || !input.trim()} className="mt-4 rounded-xl bg-neutral-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 disabled:cursor-not-allowed disabled:opacity-50">{isLoading ? 'Reasoning...' : copy.button} <span aria-hidden="true">↗</span></button>
            </form>
            {error && <div className="border-t border-red-200 bg-red-50 p-5 text-sm leading-6 text-red-700 sm:p-8">{error}</div>}
            {result && (
              <div className="border-t border-neutral-200 bg-[#fbfaf7] p-5 sm:p-8">
                <p className="text-xs font-bold tracking-[0.18em] text-emerald-700">{result.heading}</p><p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-neutral-700">{result.body}</p><ul className="mt-5 space-y-3 text-sm text-neutral-700">{result.items?.map((item) => <li key={item} className="flex gap-3"><span className="text-emerald-700">✓</span>{item}</li>)}</ul>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}