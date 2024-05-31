import { readAllSnippet } from "@/app/api/snippet/service";
import SnippetSearch from "@/app/components/SnippetSearch/SnippetSearch";
import { Technology } from "@prisma/client";

export default async function TechnologyPage(p: {
  params: { technology: Technology };
}) {
  const { data: snippets } = await readAllSnippet({
    technology: p.params.technology,
  });
  return (
    <div>
      <SnippetSearch
        placeholder={`Seacher ${p.params.technology} snippet`}
        snippets={snippets}
      />
    </div>
  );
}
