import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

type DemoKind = 'document' | 'support' | 'content';

const prompts: Record<DemoKind, string> = {
  document: `You are an AI document assistant. Analyze the user's document excerpt and return valid JSON only with this shape: {"heading":"Executive brief","body":"short grounded summary","items":["action or insight 1","action or insight 2","action or insight 3"]}. Do not invent facts that are not in the excerpt. Keep the response concise and practical.`,
  support: `You are a helpful customer-support assistant for a software product. Answer the user's question clearly and honestly. Return valid JSON only with this shape: {"heading":"Support response","body":"helpful answer","items":["recommended next step 1","recommended next step 2"]}. If the question needs a human or account-specific information, say so clearly.`,
  content: `You are an AI content and launch workflow strategist. Turn the user's product or campaign idea into a practical plan. Return valid JSON only with this shape: {"heading":"Launch workflow","body":"short strategic summary","items":["concrete deliverable 1","concrete deliverable 2","concrete deliverable 3"]}. Make the plan specific to the user's idea.`,
};

function isDemoKind(value: unknown): value is DemoKind {
  return value === 'document' || value === 'support' || value === 'content';
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Gemini is not configured yet. Add GEMINI_API_KEY to .env.local.' }, { status: 503 });
    }

    const body = await request.json();
    const input = typeof body.input === 'string' ? body.input.trim() : '';
    const kind = body.kind;

    if (!isDemoKind(kind)) {
      return NextResponse.json({ error: 'Unknown AI demo.' }, { status: 400 });
    }
    if (!input) {
      return NextResponse.json({ error: 'Please enter some text first.' }, { status: 400 });
    }
    if (input.length > 8000) {
      return NextResponse.json({ error: 'Please keep your input under 8,000 characters.' }, { status: 413 });
    }

    const client = new GoogleGenerativeAI(apiKey);
    const model = client.getGenerativeModel({
      model: 'gemini-2.5-flash',
      generationConfig: {
        responseMimeType: 'application/json',
      },
    });
    const result = await model.generateContent(`${prompts[kind]}\n\nUser input:\n${input}`);
    const text = result.response.text().trim().replace(/^```json\s*/, '').replace(/\s*```$/, '');

    try {
      return NextResponse.json(JSON.parse(text));
    } catch {
      return NextResponse.json({ heading: 'AI response', body: text, items: [] });
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : '';
    console.error('Gemini request failed:', message);

    if (/api key|unauthenticated|permission|forbidden|401|403/i.test(message)) {
      return NextResponse.json({ error: 'Gemini rejected the API key. Check that it is active, unrestricted for the Generative Language API, and copied correctly in .env.local.' }, { status: 502 });
    }
    if (/quota|rate limit|429/i.test(message)) {
      return NextResponse.json({ error: 'The Gemini API quota or rate limit was reached. Please try again later.' }, { status: 429 });
    }
    if (/model|not found|404/i.test(message)) {
      return NextResponse.json({ error: 'The configured Gemini model is unavailable for this API key or project.' }, { status: 502 });
    }
    return NextResponse.json({ error: 'Gemini could not process this request. Check the server terminal for the upstream error.' }, { status: 502 });
  }
}