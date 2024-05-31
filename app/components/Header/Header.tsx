import Link from "next/link";
import Image from "next/image";
import LogpPng from "/public/logo.png";
import { SignedIn, UserButton } from "@clerk/nextjs";

export function Header() {
  return (
    <header className="bg-main-700 flex justify-between p-8 items-center">
      <Link href={"/"}>
        <Image src={LogpPng} alt="logo" className="w-48" />
      </Link>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
  );
}
