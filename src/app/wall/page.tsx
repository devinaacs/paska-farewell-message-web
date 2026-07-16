"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { type Message, getMessages } from "@/lib/api";

const CARD_COLORS = ["#EF9480", "#87A2AB", "#95B4AA", "#6667AB", "#E88796", "#AC8AAD", "#FDB813"];
const CARD_ROTATIONS = ["-6deg", "5deg", "-3.5deg", "7deg", "-5deg", "4deg", "-7deg", "3deg", "6deg"];
const CARD_OFFSETS = ["0px", "12px", "-8px", "20px", "-16px", "8px", "-12px", "16px", "-4px"];
const ICON_EMOJIS = ["🎉", "🚀", "❤️", "✨", "👏", "🌟"];


function initials(name: string) {
  return name.trim().split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 1);
}

function PostItCard({ msg, index }: { msg: Message; index: number }) {
  const bg = CARD_COLORS[index % CARD_COLORS.length];
  const rotate = CARD_ROTATIONS[index % CARD_ROTATIONS.length];
  const offset = CARD_OFFSETS[index % CARD_OFFSETS.length];
  const icon = msg.sticker || ICON_EMOJIS[index % ICON_EMOJIS.length];

  return (
    <div
      className="float-in"
      style={{ animationDelay: `${Math.min(index * 60, 400)}ms` }}
    >
    <div
      className="flex flex-col gap-4 rounded-xl p-6"
      style={{
        background: bg,
        boxShadow: "0 10px 25px rgba(0,0,0,0.18)",
        transform: `rotate(${rotate}) translateX(${offset})`,
        transition: "transform 0.2s ease",
      }}
      onMouseEnter={e => (e.currentTarget.style.transform = "rotate(0deg) translateX(0px) scale(1.04)")}
      onMouseLeave={e => (e.currentTarget.style.transform = `rotate(${rotate}) translateX(${offset})`)}
    >
      {/* Icon / sticker */}
      <span className="text-2xl drop-shadow">{icon}</span>

      {/* Message */}
      <p
        className="flex-1 text-[16px] leading-relaxed text-white break-words"
        style={{ fontFamily: "var(--font-body)", fontWeight: 700, overflowWrap: "break-word", wordBreak: "break-word" }}
      >
        {msg.message}
      </p>

      {/* Author */}
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[12px] font-bold bg-white/30 text-white">
          {initials(msg.name)}
        </div>
        <span
          className="text-[14px] text-white/80"
          style={{ fontFamily: "var(--font-body)", fontWeight: 700 }}
        >
          {msg.name}
        </span>
      </div>
    </div>
    </div>
  );
}

export default function WallPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getMessages()
      .then(setMessages)
      .catch(() => setError("Could not load messages. Is the backend running?"))
      .finally(() => setLoading(false));
  }, []);

  // Split into two columns for staggered masonry layout
  const leftCol = messages.filter((_, i) => i % 2 === 0);
  const rightCol = messages.filter((_, i) => i % 2 === 1);

  return (
    <div className="bg-gradient-mesh min-h-screen">
      <div className="mx-auto max-w-[480px] px-5 pb-12">
        {/* Hero section */}
        <section className="mb-8 pt-6 text-center">
          <div className="relative mb-3 inline-block">
            <div className="mx-auto h-24 w-24 overflow-hidden rounded-full border-4 border-white shadow-xl bg-[#e8e8e8]">
              <Image
                src="/image/paska.jpeg"
                alt="Paska"
                width={96}
                height={96}
                className="object-cover w-full h-full"
              />
            </div>
            <div
              className="absolute -bottom-2 -right-2 flex h-9 w-9 items-center justify-center rounded-full p-2 shadow-lg text-white text-sm"
              style={{ background: "#aa00a5" }}
            >
              ❤️
            </div>
          </div>

          <h2
            className="mb-2 lowercase text-[#1b1b1b]"
            style={{
              fontFamily: "var(--font-headline)",
              fontWeight: 800,
              fontSize: "36px",
              lineHeight: "36px",
              letterSpacing: "-0.04em",
            }}
          >
            we&apos;ll miss you, legend!
          </h2>
          <p
            className="opacity-80 lowercase"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 400,
              fontSize: "16px",
              color: "#564051",
            }}
          >
            here&apos;s a wall of love from the whole team. scroll to see the messages.
          </p>
        </section>

        {/* Messages grid */}
        {loading && (
          <div className="flex flex-col items-center gap-3 py-12">
            <div className="animate-spin text-4xl">⏳</div>
            <p className="text-sm" style={{ color: "#564051" }}>
              loading messages…
            </p>
          </div>
        )}

        {error && (
          <div className="rounded-2xl bg-white/60 px-5 py-5 text-center shadow-md">
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        {!loading && !error && messages.length === 0 && (
          <div className="flex flex-col items-center gap-3 py-12 text-center">
            <div className="text-4xl">📭</div>
            <p
              className="font-bold text-sm"
              style={{ fontFamily: "var(--font-headline)", color: "#1b1b1b" }}
            >
              no messages yet
            </p>
            <p className="text-xs" style={{ color: "#564051" }}>
              be the first to leave a note!
            </p>
          </div>
        )}

        {!loading && !error && messages.length > 0 && (
          <div className="grid grid-cols-2 gap-4 pb-12 items-start">
            {/* Left column */}
            <div className="flex flex-col gap-4">
              {leftCol.map((msg, i) => (
                <PostItCard key={msg.id} msg={msg} index={i * 2} />
              ))}
            </div>
            {/* Right column — offset by mt-8 for staggered masonry feel */}
            <div className="flex flex-col gap-4 mt-8">
              {rightCol.map((msg, i) => (
                <PostItCard key={msg.id} msg={msg} index={i * 2 + 1} />
              ))}
            </div>
          </div>
        )}

        {/* Closing section */}
        {!loading && (
          <div className="py-12 text-center">
            <div
              className="rounded-xl p-8"
              style={{ background: "#f3f3f3" }}
            >
              <div className="mb-4 text-5xl" style={{ color: "#aa00a5" }}>✨</div>
              <h3
                className="mb-4 lowercase text-[#1b1b1b]"
                style={{
                  fontFamily: "var(--font-headline)",
                  fontWeight: 800,
                  fontSize: "24px",
                  lineHeight: "28px",
                  letterSpacing: "-0.02em",
                }}
              >
                ready for your next adventure?
              </h3>
              <Link
                href="/write"
                className="bouncy-tap inline-block rounded-full px-8 py-4 text-white shadow-xl transition-all hover:scale-105 active:scale-95 lowercase"
                style={{
                  background: "#1b1b1b",
                  fontFamily: "var(--font-body)",
                  fontWeight: 700,
                  fontSize: "14px",
                  letterSpacing: "0.02em",
                }}
              >
                send a final note
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
