import { SNIPPETS_METADATA, SnippetMetadata } from "@/app/constant";
import Link from "next/link";
import Image from "next/image";

export function Nav() {
  const randerLinkItem = (snippetMetadata: SnippetMetadata) => {
    return (
      <li
        key={snippetMetadata.technology}
        className="transition transform hover:scale-125"
      >
        <Link
          href={`/snippets/technology/${snippetMetadata.technology}`}
          className="flex items-center gap-4 font-semibold"
        >
          <Image
            src={snippetMetadata.src}
            alt={`Icon for ${snippetMetadata.label}`}
            width={30}
            height={30}
          />
          {snippetMetadata.label}
        </Link>
      </li>
    );
  };
  return (
    <div className="text-white bg-main-900 rounded-lg text-sm py-8 px-6 h-[80vh] overflow-y-auto">
      <ul className="space-y-4">
        {Object.values(SNIPPETS_METADATA).map(randerLinkItem)}
      </ul>
    </div>
  );
}
