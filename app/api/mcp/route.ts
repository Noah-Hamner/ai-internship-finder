import { NextRequest, NextResponse } from "next/server";
import { WebStandardStreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js";

import { createInternshipMcpServer } from "@/lib/mcp/server";

export async function POST(request: NextRequest) {
  const ingestSecret = process.env.INGEST_SECRET;

  if (!ingestSecret) {
    console.error("INGEST_SECRET is not configured");

    return NextResponse.json(
      { error: "Server configuration error" },
      { status: 500 }
    );
  }

  const authorization = request.headers.get("authorization");

  if (authorization !== `Bearer ${ingestSecret}`) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const server = createInternshipMcpServer();

  const transport = new WebStandardStreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
  });

  await server.connect(transport);

  return transport.handleRequest(request);
}