"use server";

import { db } from "@/app/lib/db";
import { auth } from "@clerk/nextjs/server";
import { Language, Snippet, Technology } from "@prisma/client";
import { z } from "zod";

const readAllSnippetSchema = z
  .object({
    title: z.string().optional(),
    content: z.string().optional(),
    technology: z.nativeEnum(Technology).optional(),
    language: z.nativeEnum(Language).optional(),
  })
  .optional();

export async function readAllSnippet(filters?: Partial<Snippet>) {
  const { userId } = auth();
  if (!userId) {
    return {
      data: [],
      error: true,
      status: 401,
      message: "You must be signed in",
    };
  }
  try {
    readAllSnippetSchema.parse(filters);
    const snippets = await db.snippet.findMany({
      where: {
        ...filters,
        userId: userId,
      },
    });
    return {
      data: snippets,
    };
  } catch (err) {
    return {
      data: [],
      error: true,
      status: 500,
      message:
        "Something went wrong fetching the snippets " + (err as Error).message,
    };
  }
}

const createSnippetSchema = z.object({
  title: z.string(),
  content: z.string(),
  technology: z.nativeEnum(Technology),
  language: z.nativeEnum(Language),
});

export async function createSnippet(body: typeof createSnippetSchema._type) {
  const { userId } = auth();
  if (!userId) {
    return {
      data: null,
      error: true,
      status: 401,
      message: "You must be signed in",
    };
  }

  try {
    createSnippetSchema.parse(body);
    const snippetCreated = await db.snippet.create({
      data: { ...body, userId },
    });
    return {
      data: snippetCreated,
    };
  } catch (error) {
    return {
      data: null,
      error: true,
      status: 500,
      message:
        "Something went wrong creating the snippet " + (error as Error).message,
    };
  }
}
