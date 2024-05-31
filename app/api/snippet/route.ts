import { NextRequest, NextResponse } from "next/server";
import { createSnippet, readAllSnippet } from "./service";

export async function GET(req: NextRequest) {
  const filters = Object.fromEntries(req.nextUrl.searchParams);
  return NextResponse.json(await readAllSnippet(filters));
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  return NextResponse.json(await createSnippet(body));
}
