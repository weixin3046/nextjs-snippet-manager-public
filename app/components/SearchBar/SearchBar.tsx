"use client";
import { useRouter } from "next/navigation";
import { RiSearchLine } from "react-icons/ri";

export default function SearchBar(p: {
  onChange: (text: string) => void;
  placeholder: string;
}) {
  const router = useRouter();
  const input = (
    <div className="relative w-full">
      <input
        className="pl-10"
        placeholder={p.placeholder}
        onChange={(e) => p.onChange(e.currentTarget.value)}
      />
      <RiSearchLine className="h-5 w-5 absolute top-2 text-gray-400 left-3" />
    </div>
  );
  return (
    <div className="flex space-x-4 items-center bg-main-900 rounded-lg p-6">
      {input}
      <button className="w-24 " onClick={() => router.push("/snippets/create")}>
        + Add
      </button>
    </div>
  );
}
