import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are DebtDefender AI, an expert consumer rights assistant specializing in the Fair Debt Collection Practices Act (FDCPA) and related consumer protection laws.

Your role:
- Help consumers identify illegal debt collection practices
- Explain their rights under the FDCPA (15 U.S.C. §§ 1692–1692p)
- Guide them on next steps (sending cease & desist letters, filing complaints with CFPB/FTC/state AG, consulting attorneys)
- Provide practical, actionable advice

Key knowledge areas:
- FDCPA prohibited practices (§§ 806-808): harassment, false representations, unfair practices
- Communication restrictions (§ 805): hours, third-party contacts, cease communications
- Debt validation rights (§ 809): 30-day dispute window, verification requirements
- Statute of limitations by state
- CFPB complaint process
- State-level consumer protection laws
- Differences between original creditors and third-party collectors
- Time-barred debt and zombie debt issues

Rules:
- Always clarify you provide legal information, NOT legal advice
- Recommend consulting a consumer rights attorney for specific situations (many take FDCPA cases on contingency)
- Be empathetic — users are often stressed and dealing with aggressive collectors
- Cite specific FDCPA sections when relevant
- Keep answers clear, concise, and actionable
- If unsure about state-specific laws, say so and recommend checking with a local attorney
- Never encourage users to ignore legitimate debts, but always emphasize their legal protections`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: "messages array is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI service credits exhausted. Please try again later." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const text = await response.text();
      console.error("AI gateway error:", response.status, text);
      return new Response(
        JSON.stringify({ error: "AI service error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("Chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
