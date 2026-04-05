import { NextRequest, NextResponse } from "next/server";
import { getConnection } from "@/lib/db";
import { checkAuth } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const authError = checkAuth(request);
  if (authError) return authError;

  try {
    const connection = await getConnection();

    const [todayChats] = await connection.execute(
      `SELECT COUNT(*) as count FROM chat_sessions WHERE DATE(created_at) = CURDATE()`
    );
    const [weekChats] = await connection.execute(
      `SELECT COUNT(*) as count FROM chat_sessions WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)`
    );
    const [totalMessages] = await connection.execute(
      `SELECT COUNT(*) as count FROM chat_messages`
    );
    const [totalSessions] = await connection.execute(
      `SELECT COUNT(*) as count FROM chat_sessions`
    );
    const [activeChats] = await connection.execute(
      `SELECT COUNT(*) as count FROM chat_sessions WHERE status = 'active'`
    );
    const [langStats] = await connection.execute(
      `SELECT language, COUNT(*) as count FROM chat_sessions GROUP BY language`
    );

    await connection.end();

    return NextResponse.json({
      chatsToday: (todayChats as any[])[0].count,
      chatsThisWeek: (weekChats as any[])[0].count,
      totalMessages: (totalMessages as any[])[0].count,
      totalSessions: (totalSessions as any[])[0].count,
      activeChats: (activeChats as any[])[0].count,
      languageBreakdown: langStats,
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
