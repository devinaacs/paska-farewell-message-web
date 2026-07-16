"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TICKER_TEXT =
  "new beginnings • good luck paska • we'll miss you • cmk fam • tripatra awaits • ";

export function AppHeader() {
  const pathname = usePathname();
  const isWrite = pathname === "/write";

  const tickerBg = isWrite
    ? "bg-[#ff8a00] text-white"
    : "bg-[#1b1b1b] text-white";

  return (
    <>
      {/* Fixed ticker strip */}
      <div
        className={`fixed top-0 left-0 w-full z-[60] py-2 overflow-hidden ${tickerBg}`}
      >
        <div
          className="ticker-track whitespace-nowrap"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {[...Array(6)].map((_, i) => (
            <span key={i} className="inline-block px-6 text-[13px] font-bold lowercase tracking-wide">
              {TICKER_TEXT}
            </span>
          ))}
        </div>
      </div>

      {/* Fixed pill header */}
      <header
        className="fixed z-50 left-1/2 -translate-x-1/2 bg-white/85 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.08)] h-14 flex items-center px-5 rounded-full"
        style={{ top: "44px", width: "calc(100% - 40px)", maxWidth: "440px" }}
      >
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl">🎉</span>
          <h1
            className="text-[18px] font-black text-[#1b1b1b] tracking-tight lowercase"
            style={{ fontFamily: "var(--font-headline)" }}
          >
            farewell, paska!
          </h1>
        </Link>
      </header>
    </>
  );
}
