"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { createMessage } from "@/lib/api";

const STICKERS = ["✨", "🚀", "❤️", "🥳", "🌈", "🍕"];

type NameMode = "name" | "anonymous";

export default function WritePage() {
  const router = useRouter();
  const [nameMode, setNameMode] = useState<NameMode>("name");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [sticker, setSticker] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const displayFrom =
    nameMode === "anonymous" ? "anonymous" : name.trim() || "you";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim()) return;
    setLoading(true);
    setError(null);
    try {
      await createMessage({
        name:
          nameMode === "anonymous"
            ? "Anonymous"
            : name.trim() || "Anonymous",
        message: message.trim(),
        sticker: sticker ?? undefined,
      });
      router.push("/sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  }

  return (
    <div
      className="mx-auto max-w-[480px] px-5 pb-8"
      style={{ background: "#f9f9f9" }}
    >
      {/* Page heading */}
      <div className="flex flex-col gap-2 pt-2 pb-6">
        <h2
          className="lowercase tracking-tighter text-[#1b1b1b]"
          style={{
            fontFamily: "var(--font-headline)",
            fontWeight: 800,
            fontSize: "36px",
            lineHeight: "36px",
            letterSpacing: "-0.04em",
          }}
        >
          leave a note
        </h2>
        <p
          className="text-[18px]"
          style={{ color: "#564051", fontFamily: "var(--font-body)", fontWeight: 500 }}
        >
          send your best wishes before they go!
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Speech bubble card */}
        <div
          className="speech-bubble-tail flex flex-col gap-4 rounded-2xl bg-white p-6"
          style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.08)" }}
        >
          <div className="flex items-center gap-4 border-b border-[#eeeeee] pb-4">
            <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full bg-[#e8e8e8] flex items-center justify-center text-xl">
              👤
            </div>
            <div>
              <p
                className="font-bold text-[14px] text-[#1b1b1b]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                to: paska
              </p>
              <p className="text-[14px]" style={{ color: "#564051" }}>
                from: {displayFrom}
              </p>
            </div>
          </div>
          <textarea
            placeholder="write something paska will remember..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            maxLength={1000}
            required
            rows={6}
            className="w-full resize-none bg-transparent text-[18px] outline-none"
            style={{
              color: "#1b1b1b",
              fontFamily: "var(--font-body)",
              fontWeight: 500,
            }}
          />
        </div>

        {/* Identity toggle */}
        <div
          className="flex items-center justify-between rounded-full p-1.5"
          style={{ background: "#eeeeee" }}
        >
          {(["name", "anonymous"] as NameMode[]).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setNameMode(mode)}
              className="bouncy-tap flex-1 rounded-full py-3 px-6 lowercase transition-all duration-300"
              style={{
                background: nameMode === mode ? "#1b1b1b" : "transparent",
                color: nameMode === mode ? "white" : "#564051",
                fontFamily: "var(--font-body)",
                fontWeight: 700,
                fontSize: "14px",
                letterSpacing: "0.02em",
              }}
            >
              {mode === "name" ? "use my name" : "anonymous"}
            </button>
          ))}
        </div>

        {/* Name input (shown only in name mode) */}
        {nameMode === "name" && (
          <input
            type="text"
            placeholder="your name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={100}
            className="h-14 w-full rounded-full px-6 text-[16px] outline-none focus:ring-2 focus:ring-[#aa00a5]"
            style={{
              background: "#eeeeee",
              color: "#1b1b1b",
              fontFamily: "var(--font-body)",
            }}
          />
        )}

        {/* Sticker picker */}
        <div className="flex flex-col gap-3">
          <p
            className="ml-2 lowercase"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 700,
              fontSize: "14px",
              letterSpacing: "0.02em",
              color: "#564051",
            }}
          >
            add a sticker
          </p>
          <div className="no-scrollbar flex gap-4 overflow-x-auto pb-4">
            {STICKERS.map((s, i) => {
              const rotations = ["-3deg", "0deg", "-3deg", "6deg", "0deg", "-6deg"];
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSticker(sticker === s ? null : s)}
                  className="bouncy-tap flex h-20 w-20 shrink-0 items-center justify-center rounded-xl text-4xl shadow-md transition-all hover:scale-110 active:scale-95"
                  style={{
                    background: sticker === s ? "#aa00a520" : "white",
                    borderWidth: sticker === s ? "2px" : "0",
                    borderStyle: "solid",
                    borderColor: sticker === s ? "#aa00a5" : "transparent",
                    transform: `rotate(${rotations[i]})`,
                  }}
                >
                  {s}
                </button>
              );
            })}
          </div>
        </div>

        {error && (
          <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-500">
            {error}
          </p>
        )}

        {/* Submit button */}
        <button
          type="submit"
          disabled={loading || !message.trim()}
          className="bouncy-tap flex w-full items-center justify-center gap-2 rounded-full py-5 text-white shadow-[0_10px_30px_rgba(0,0,0,0.1)] transition-all hover:scale-[1.02] disabled:opacity-50"
          style={{
            background: "#1b1b1b",
            fontFamily: "var(--font-headline)",
            fontWeight: 800,
            fontSize: "24px",
            lineHeight: "28px",
            letterSpacing: "-0.02em",
          }}
        >
          <span className="lowercase">{loading ? "sending…" : "send it!"}</span>
          {!loading && <span className="text-lg">➤</span>}
        </button>

        {/* Hashtag stickers */}
        <div className="flex flex-wrap gap-3 pb-2">
          {[
            { label: "#farewell", bg: "#aa00a5", rotate: "-3deg" },
            { label: "#paskalife", bg: "#914c00", rotate: "3deg" },
            { label: "#cmklegacy", bg: "#303030", rotate: "-2deg" },
          ].map(({ label, bg, rotate }) => (
            <span
              key={label}
              className="rounded-full px-4 py-1.5 text-xs font-bold lowercase text-white"
              style={{
                background: bg,
                fontFamily: "var(--font-body)",
                transform: `rotate(${rotate})`,
              }}
            >
              {label}
            </span>
          ))}
        </div>
      </form>
    </div>
  );
}
