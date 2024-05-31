"use server";
import { db } from "@/app/lib/db";
import { auth } from "@clerk/nextjs/server";
import { Language, Snippet, Technology } from "@prisma/client";
import { z } from "zod";

const updateSnippetSchema = z
  .object({
    title: z.string().optional(),
    content: z.string().optional(),
    technology: z.nativeEnum(Technology).optional(),
    language: z.nativeEnum(Language).optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one value must be provided",
  });

export async function updateSnippet(
  id: number,
  body: typeof updateSnippetSchema._type
) {
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
    updateSnippetSchema.parse(body);
    const updateSnippet = await db.snippet.update({
      data: body,
      where: { id },
    });
    return {
      data: updateSnippetSchema,
    };
  } catch (error) {
    return {
      data: null,
      error: true,
      status: 500,
      message:
        "Something went wrong updata the snippet " + (error as Error).message,
    };
  }
}

const deleteSnippetSchema = z.number();

export async function deleteSnippet(id: number) {
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
    deleteSnippetSchema.parse(id);
    const deleteSnippet = await db.snippet.delete({ where: { id } });
    return {
      data: deleteSnippet,
    };
  } catch (error) {
    return {
      data: null,
      error: true,
      status: 500,
      message:
        "Something went wrong delete the snippet " + (error as Error).message,
    };
  }
}

const readSnippetSchema = z.number();

export async function readSnippet(id: number) {
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
    readSnippetSchema.parse(id);
    const snippet = await db.snippet.findUnique({
      where: { id, userId },
    });
    return {
      data: snippet,
    };
  } catch (err) {
    return {
      data: null,
      error: true,
      status: 500,
      message:
        "Something went wrong reading the snippet " + (err as Error).message,
    };
  }
}
