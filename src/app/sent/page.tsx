"use client";

import Link from "next/link";
import { useState } from "react";

export default function SentPage() {
  const [copied, setCopied] = useState(false);

  function handleCopyLink() {
    navigator.clipboard.writeText(window.location.origin).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }
  return (
    <div
      className="relative mx-auto flex min-h-[calc(100vh-108px)] max-w-[480px] flex-col items-center justify-center overflow-hidden px-5 pb-12"
      style={{ background: "#f9f9f9" }}
    >
      {/* Decorative background blobs */}
      <div
        className="pointer-events-none absolute rounded-full"
        style={{
          top: "25%",
          left: "-2.5rem",
          width: "160px",
          height: "160px",
          background: "#ff1cf7",
          filter: "blur(80px)",
          opacity: 0.15,
        }}
      />
      <div
        className="pointer-events-none absolute rounded-full"
        style={{
          bottom: "25%",
          right: "-2.5rem",
          width: "240px",
          height: "240px",
          background: "#ff8a00",
          filter: "blur(100px)",
          opacity: 0.15,
        }}
      />

      {/* Floating celebration circle */}
      <div className="floating-bubble relative mb-8">
        <div
          className="flex h-32 w-32 items-center justify-center rounded-full shadow-[0_20px_60px_rgba(0,0,0,0.2)]"
          style={{ background: "#1b1b1b" }}
        >
          <span className="text-6xl">🎉</span>
        </div>

        {/* SENT! badge */}
        <div
          className="absolute -top-4 -right-6 rounded-full px-4 py-1 text-[14px] font-bold text-white shadow-sm"
          style={{
            background: "#aa00a5",
            transform: "rotate(12deg)",
            fontFamily: "var(--font-body)",
            letterSpacing: "0.02em",
          }}
        >
          SENT!
        </div>

        {/* YAY! badge */}
        <div
          className="absolute -bottom-2 -left-8 rounded-full px-3 py-1 text-[14px] font-bold text-white shadow-sm"
          style={{
            background: "#ff8a00",
            transform: "rotate(-6deg)",
            fontFamily: "var(--font-body)",
            letterSpacing: "0.02em",
          }}
        >
          YAY!
        </div>
      </div>

      {/* Speech bubble confirmation card */}
      <div className="speech-bubble-tail mb-8 w-full max-w-[400px] rounded-2xl bg-white p-8 shadow-[0_10px_30px_rgba(0,0,0,0.1)] text-center flex flex-col items-center gap-3">
        <h1
          className="lowercase leading-tight text-[#1b1b1b]"
          style={{
            fontFamily: "var(--font-headline)",
            fontWeight: 800,
            fontSize: "36px",
            lineHeight: "36px",
            letterSpacing: "-0.04em",
          }}
        >
          your message is in 🎉
        </h1>
        <p
          className="text-[18px]"
          style={{ color: "#564051", fontFamily: "var(--font-body)", fontWeight: 500 }}
        >
          thanks for making paska&apos;s day.
        </p>
      </div>

      {/* Action buttons */}
      <div className="flex w-full max-w-[400px] flex-col gap-4">
        <Link
          href="/write"
          className="bouncy-tap w-full rounded-full py-4 text-center text-white shadow-lg transition-all hover:scale-[1.02] active:scale-95"
          style={{
            background: "#1b1b1b",
            fontFamily: "var(--font-headline)",
            fontWeight: 800,
            fontSize: "24px",
            lineHeight: "28px",
            letterSpacing: "-0.02em",
          }}
        >
          <span className="lowercase">submit another</span>
        </Link>
        <button
          onClick={handleCopyLink}
          className="bouncy-tap w-full rounded-full py-4 text-center transition-all active:scale-95"
          style={{
            background: copied ? "#aa00a5" : "#e8e8e8",
            color: copied ? "white" : "#1b1b1b",
            fontFamily: "var(--font-headline)",
            fontWeight: 800,
            fontSize: "24px",
            lineHeight: "28px",
            letterSpacing: "-0.02em",
            transition: "background 0.2s, color 0.2s",
          }}
        >
          <span className="lowercase">{copied ? "link copied! 🎉" : "share link"}</span>
        </button>
      </div>

      {/* Decorative sticker circles */}
      <div className="mt-8 flex gap-4 opacity-60">
        {[
          { emoji: "👤", rotate: "0deg" },
          { emoji: "❤️", rotate: "12deg" },
          { emoji: "☀️", rotate: "-12deg" },
        ].map(({ emoji, rotate }, i) => (
          <div
            key={i}
            className="flex h-12 w-12 items-center justify-center rounded-full text-2xl shadow-sm"
            style={{
              background: "#eeeeee",
              transform: `rotate(${rotate})`,
            }}
          >
            {emoji}
          </div>
        ))}
      </div>
    </div>
  );
}
