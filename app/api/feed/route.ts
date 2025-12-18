import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("news_items")
    .select("ts,title,impact,source,url")
    .order("ts", { ascending: false })
    .limit(50);

  if (error) {
    return Response.json({ updatedAt: new Date().toISOString(), items: [], error: error.message }, { status: 500 });
  }

  return Response.json({
    updatedAt: new Date().toISOString(),
    items: (data || []).map((x) => ({
      ts: x.ts,
      title: x.title,
      impact: x.impact,
      source: x.source,
      url: x.url,
    })),
  });
}