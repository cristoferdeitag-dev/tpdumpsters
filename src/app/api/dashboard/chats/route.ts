import { NextRequest, NextResponse } from "next/server";
import { getConnection } from "@/lib/db";
import { checkAuth } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const authError = checkAuth(request);
  if (authError) return authError;

  try {
    const { searchParams } = request.nextUrl;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const offset = (page - 1) * limit;
    const language = searchParams.get("language");
    const status = searchParams.get("status");
    const search = searchParams.get("search");
    const dateFrom = searchParams.get("dateFrom");
    const dateTo = searchParams.get("dateTo");

    const connection = await getConnection();

    let whereClause = "WHERE 1=1";
    const params: any[] = [];

    if (language) {
      whereClause += " AND cs.language = ?";
      params.push(language);
    }
    if (status) {
      whereClause += " AND cs.status = ?";
      params.push(status);
    }
    if (dateFrom) {
      whereClause += " AND cs.created_at >= ?";
      params.push(dateFrom);
    }
    if (dateTo) {
      whereClause += " AND cs.created_at <= ?";
      params.push(dateTo + " 23:59:59");
    }
    if (search) {
      whereClause += " AND (cs.first_message LIKE ? OR cs.last_message LIKE ? OR cs.session_id LIKE ?)";
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm, searchTerm);
    }

    const [countResult] = await connection.execute(
      `SELECT COUNT(*) as total FROM chat_sessions cs ${whereClause}`,
      params
    );
    const total = (countResult as any[])[0].total;

    const [sessions] = await connection.execute(
      `SELECT cs.* FROM chat_sessions cs ${whereClause} ORDER BY cs.updated_at DESC LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    );

    await connection.end();

    return NextResponse.json({
      sessions,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Dashboard chats error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
