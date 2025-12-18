"use client";

import { useEffect, useState } from "react";

type Item = { ts: string; title: string; impact: string; source: string };
type Feed = { updatedAt: string; items: Item[] };

export default function Home() {
  const [feed, setFeed] = useState<Feed | null>(null);
  const [err, setErr] = useState<string>("");

  async function load() {
    setErr("");
    try {
      const res = await fetch("/api/feed", { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setFeed(await res.json());
    } catch (e: any) {
      setErr(e?.message || "Failed to load feed");
    }
  }

  useEffect(() => {
    load();
    const id = setInterval(load, 60_000); // refresh every 60s
    return () => clearInterval(id);
  }, []);

  return (
    <main style={{ padding: 24, fontFamily: "system-ui", maxWidth: 900, margin: "0 auto" }}>
      <h1 style={{ fontSize: 28, fontWeight: 800 }}>Market Dashboard</h1>
      <p style={{ opacity: 0.7 }}>
        Updated: {feed?.updatedAt ? new Date(feed.updatedAt).toLocaleString() : "—"}
      </p>

      <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
        <button onClick={load} style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid #ddd" }}>
          Refresh
        </button>
        <a href="/api/feed" target="_blank" style={{ alignSelf: "center", opacity: 0.7 }}>
          View raw feed JSON
        </a>
      </div>

      {err && (
        <div style={{ marginTop: 16, padding: 12, borderRadius: 12, border: "1px solid #f2c2c2" }}>
          Error: {err}
        </div>
      )}

      <div style={{ marginTop: 16, display: "grid", gap: 12 }}>
        {(feed?.items || []).map((x, i) => (
          <div key={i} style={{ padding: 14, borderRadius: 14, border: "1px solid #ddd" }}>
            <div style={{ fontWeight: 800 }}>
              {x.impact} — {x.title}
            </div>
            <div style={{ opacity: 0.7, fontSize: 13 }}>
              {new Date(x.ts).toLocaleString()} · {x.source}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}