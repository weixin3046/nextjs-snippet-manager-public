import { NextRequest, NextResponse } from "next/server";
import { deleteSnippet, updateSnippet } from "./service";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const body = await req.json();
  return NextResponse.json(await updateSnippet(Number(id), body));
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  return NextResponse.json(await deleteSnippet(Number(id)));
}
