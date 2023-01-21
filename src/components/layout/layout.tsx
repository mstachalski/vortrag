import Link from "next/link";
import layoutStyles from "./layout.module.css";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className={layoutStyles.navbar}>
        <ul>
          <li>GF 1</li>
          <li>GF 2</li>
          <li>GF 3</li>
        </ul>
        <Link href={"/"}>GFT Arena</Link>
        <span>Login</span>
      </div>
      {children}
    </>
  );
}