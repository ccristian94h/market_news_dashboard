export async function GET() {
  // Temporary demo: returns a “new item” (next step is to STORE it)
  return Response.json({
    ok: true,
    ranAt: new Date().toISOString(),
    message: "Update ran ? (next we’ll store + dedupe items)"
  });
}