import { Snippet } from "@prisma/client";
import SnippetCard from "../SnippetCard/SnippetCard";

export default function SnippetList(p: { snippets: Snippet[] }) {
  return (
    <div className="py-20 flex flex-wrap gap-y-20 gap-x-6">
      {p.snippets.map((snippet) => (
        <SnippetCard key={snippet.id} snippet={snippet} />
      ))}
    </div>
  );
}
