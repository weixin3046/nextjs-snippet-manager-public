"use client";
import { Snippet } from "@prisma/client";
import SearchBar from "../SearchBar/SearchBar";
import SnippetList from "../SnippetList/SnippetList";
import { useState } from "react";

export default function SnippetSearch(p: {
  placeholder: string;
  snippets: Snippet[];
}) {
  const [currSearchQuery, setCurrSearchQuery] = useState("");
  const filteredSnippets = p.snippets.filter((snippet) => {
    return [
      snippet.title,
      snippet.technology,
      snippet.language,
      snippet.content,
    ].some((snippetAttribute) =>
      snippetAttribute.toLowerCase().includes(currSearchQuery.toLowerCase())
    );
  });
  return (
    <div>
      <SearchBar placeholder={p.placeholder} onChange={setCurrSearchQuery} />
      <div className="ov overflow-y-auto h-[66vh] pb-20">
        <SnippetList snippets={filteredSnippets} />
      </div>
    </div>
  );
}
