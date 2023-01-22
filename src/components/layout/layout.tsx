import Link from "next/link";
import layoutStyles from "./layout.module.css";
import { ReactNode } from "react";
import {signOut} from "next-auth/react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className={layoutStyles.navbar}>
        <Link href={"/"}>GFT Arena</Link>
        <span onClick={() => signOut()}>Logout</span>
      </div>
      {children}
    </>
  );
}
