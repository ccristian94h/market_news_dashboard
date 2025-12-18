export async function GET() {
  return Response.json({
    updatedAt: new Date().toISOString(),
    items: [
      {
        ts: new Date().toISOString(),
        title: "Feed is live ?",
        impact: "2?",
        source: "local"
      }
    ]
  });
}