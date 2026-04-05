import { NextRequest, NextResponse } from "next/server";
import { getConnection } from "@/lib/db";
import { checkAuth } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  const authError = checkAuth(request);
  if (authError) return authError;

  try {
    const { sessionId } = await params;
    const connection = await getConnection();

    const [messages] = await connection.execute(
      `SELECT * FROM chat_messages WHERE session_id = ? ORDER BY created_at ASC`,
      [sessionId]
    );

    const [sessionRows] = await connection.execute(
      `SELECT * FROM chat_sessions WHERE session_id = ? LIMIT 1`,
      [sessionId]
    );

    await connection.end();

    const session = (sessionRows as any[])[0] || null;

    return NextResponse.json({ session, messages });
  } catch (error) {
    console.error("Dashboard chat detail error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
