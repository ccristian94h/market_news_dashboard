import crypto from "crypto";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

function hashOf(s: string) {
  return crypto.createHash("sha256").update(s).digest("hex");
}

export async function GET() {
  const ts = new Date().toISOString();
  const title = "Test insert (Supabase connected)";
  const impact = "2?";
  const source = "local";
  const url = null;

  const hash = hashOf(`${title}|${impact}|${source}|${ts}`);

  const { error } = await supabaseAdmin.from("news_items").insert([
    { ts, title, impact, source, url, hash }
  ]);

  // If it already exists, unique hash will block; that's fine.
  return Response.json({
    ok: !error,
    ranAt: ts,
    inserted: !error,
    error: error?.message || null,
  });
}