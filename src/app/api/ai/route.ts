import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { createClient } from "@/lib/supabase/server";

interface ClientMessage {
  role: "user" | "assistant";
  content: string;
}

interface AIRequestBody {
  messages: ClientMessage[];
}

const apiKey = process.env.GEMINI_API_KEY;
const MODEL_NAME = process.env.GEMINI_MODEL ?? "gemini-2.5-flash";

const SYSTEM_INSTRUCTION = `
You are HealthEdu AI, an educational health assistant.

Your identity:
- Your name is HealthEdu AI.
- You help users understand health and medical education topics.
- Explain difficult medical concepts in simple language.

Safety rules:
- You are NOT a doctor.
- Do NOT diagnose diseases.
- Do NOT confirm that a user has a specific disease.
- Do NOT prescribe medication.
- Do NOT recommend medication dosage.
- Do NOT tell users to start, stop, or change prescription medication.
- Do NOT replace professional medical advice.

When users describe symptoms:
- Provide general educational information.
- Explain that symptoms alone cannot establish a diagnosis.
- Recommend consulting a qualified healthcare professional when appropriate.

For emergencies:
- Encourage the user to seek immediate local emergency medical assistance.
- Do not pretend to provide emergency medical care.

For casual questions:
- Answer naturally and briefly.

For health education questions:
- Give clear and understandable explanations.
- Use simple language.
- Use bullet points or headings when useful.

HealthEdu AI is an educational platform, not a diagnosis or treatment service.
`;

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Silakan login terlebih dahulu untuk menggunakan HealthEdu AI." },
        { status: 401 },
      );
    }

    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "GEMINI_API_KEY belum dikonfigurasi di environment Vercel atau local. Tambahkan variable ini di Vercel Project Settings > Environment Variables.",
        },
        { status: 500 },
      );
    }

    const ai = new GoogleGenAI({
      apiKey: apiKey,
    });

    const body = (await request.json()) as Partial<AIRequestBody>;

    if (!Array.isArray(body.messages)) {
      return NextResponse.json(
        {
          error: "Messages harus berupa array.",
        },
        { status: 400 },
      );
    }

    const messages: ClientMessage[] = body.messages.filter(
      (message): message is ClientMessage =>
        !!message &&
        typeof message === "object" &&
        (message.role === "user" || message.role === "assistant") &&
        typeof message.content === "string" &&
        message.content.trim().length > 0,
    );

    if (messages.length === 0) {
      return NextResponse.json(
        {
          error: "Tidak ada message yang valid.",
        },
        { status: 400 },
      );
    }

    const recentMessages = messages.slice(-20);

    const contents = recentMessages.map((message) => ({
      role: message.role === "assistant" ? "model" : "user",
      parts: [
        {
          text: message.content.slice(0, 8000),
        },
      ],
    }));

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.4,
        maxOutputTokens: 1000,
      },
    });

    const text = response.text?.trim();

    if (!text) {
      return NextResponse.json(
        {
          error: "Gemini tidak mengembalikan response.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({
      response: text,
    });
  } catch (error) {
    console.error("Gemini API error:", error);

    const message =
      error instanceof Error ? error.message : "Terjadi kesalahan saat menghubungkan ke Gemini AI.";

    return NextResponse.json(
      {
        error: message,
      },
      { status: 500 },
    );
  }
}
