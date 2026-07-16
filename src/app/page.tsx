import Image from "next/image";
import Link from "next/link";

const MEMORY_PHOTOS = [
  "/image/paska-n-friend-1.jpg",
  "/image/paska-n-friend-2.jpg",
  "/image/paska-n-friend-3.JPEG",
  "/image/paska-n-friend-4.JPEG",
  "/image/paska-n-friend-5.JPEG",
  "/image/paska-n-friend-6.JPEG",
  "/image/paska-n-friend-8.JPEG",
  "/image/paska-n-friend-10.jpeg",
  "/image/paska-n-friend-11.jpeg",
  "/image/paska-n-friend-12.jpeg",
  "/image/paska-n-friend-13.jpeg",
  "/image/paska-n-friend-14.jpeg",
];

import { getMessageCount } from "@/lib/api";

function getDaysLeft() {
  const departure = new Date("2026-07-17T00:00:00");
  return Math.ceil((departure.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
}

export default async function HomePage() {
  let count = 0;
  try {
    count = await getMessageCount();
  } catch {
    // show 0 if API unavailable
  }

  const daysLeft = getDaysLeft();

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{ background: "#f9f9f9" }}
    >
      {/* Background gradient mesh (subtle, fixed) */}
      <div
        className="fixed inset-0 gradient-mesh opacity-20 pointer-events-none"
        style={{ zIndex: 0 }}
      />
      {/* Glowing blobs */}
      <div
        className="fixed w-64 h-64 rounded-full pointer-events-none"
        style={{
          top: "25%",
          right: "-5rem",
          background: "#ff1cf7",
          filter: "blur(100px)",
          opacity: 0.25,
          zIndex: 0,
        }}
      />
      <div
        className="fixed w-64 h-64 rounded-full pointer-events-none"
        style={{
          bottom: "25%",
          left: "-5rem",
          background: "#ff8a00",
          filter: "blur(100px)",
          opacity: 0.25,
          zIndex: 0,
        }}
      />

      {/* Content */}
      <div
        className="relative mx-auto flex max-w-[480px] flex-col items-center px-5 text-center"
        style={{ zIndex: 1 }}
      >
        {/* Hero section */}
        <section className="flex w-full flex-col items-center gap-8 pt-8">
          {/* Polaroid */}
          <div className="relative mb-4 h-48 w-48">
            {/* Outer white rotated backing */}
            <div
              className="absolute inset-0 rounded-xl bg-white shadow-xl"
              style={{ transform: "rotate(3deg)" }}
            />
            {/* Image layer */}
            <div
              className="absolute inset-0 overflow-hidden rounded-xl border-4 border-white shadow-lg"
              style={{ background: "#e8e8e8", transform: "rotate(-3deg)" }}
            >
              <Image
                src="/image/paska.jpeg"
                alt="Paska"
                fill
                className="object-cover"
                priority
              />
            </div>
            {/* CMK FAM badge */}
            <div
              className="absolute -bottom-4 -right-4 rounded-full px-3 py-1 text-[12px] font-bold uppercase tracking-wider text-white shadow-md"
              style={{
                background: "#aa00a5",
                transform: "rotate(12deg)",
                fontFamily: "var(--font-body)",
              }}
            >
              cmk fam
            </div>
          </div>

          {/* Headlines */}
          <div className="flex flex-col gap-3">
            <h2
              className="font-extrabold lowercase leading-none tracking-tighter text-[#1b1b1b]"
              style={{
                fontFamily: "var(--font-headline)",
                fontSize: "36px",
                lineHeight: "36px",
                letterSpacing: "-0.04em",
              }}
            >
              say bye to{" "}
              <span style={{ color: "#aa00a5" }}>paska</span> 👋
            </h2>
            <p
              className="mx-auto max-w-[320px] lowercase text-[18px]"
              style={{ color: "#564051", fontFamily: "var(--font-body)", fontWeight: 500 }}
            >
              paska is leaving cmk for a new adventure on july 17.
            </p>
          </div>

          {/* CTA */}
          <div className="w-full pt-2">
            <Link
              href="/write"
              className="bouncy-tap flex w-full items-center justify-center gap-3 rounded-full py-5 px-8 text-white shadow-2xl transition-transform hover:scale-[1.02]"
              style={{
                background: "#1b1b1b",
                fontFamily: "var(--font-body)",
                fontWeight: 700,
                fontSize: "16px",
              }}
            >
              <span className="lowercase">leave a message</span>
              <span>✏️</span>
            </Link>
          </div>
        </section>

        {/* Feature grid */}
        <section className="mt-8 grid w-full grid-cols-2 gap-4">
          {/* Card 1: notes sent */}
          <div
            className="floating-card speech-bubble-tail flex flex-col gap-2 rounded-2xl bg-white p-6"
            style={{ transform: "rotate(1deg)" }}
          >
            <span className="text-2xl" style={{ color: "#914c00" }}>❤️</span>
            <p
              className="lowercase"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 700,
                fontSize: "14px",
                letterSpacing: "0.02em",
                color: "#1b1b1b",
              }}
            >
              {count} notes sent
            </p>
          </div>
          {/* Card 2: next stop */}
          <div
            className="floating-card flex flex-col gap-2 rounded-2xl bg-white p-6"
            style={{ transform: "rotate(-2deg)" }}
          >
            <span className="text-2xl" style={{ color: "#aa00a5" }}>✈️</span>
            <p
              className="lowercase"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 700,
                fontSize: "14px",
                letterSpacing: "0.02em",
                color: "#1b1b1b",
              }}
            >
              next stop: tripatra
            </p>
          </div>
          {/* Card 3: countdown (full width) */}
          <div className="floating-card col-span-2 flex items-center gap-4 rounded-2xl bg-white p-6">
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-xl"
              style={{ background: "#c9a900", color: "#4c3e00" }}
            >
              ⏰
            </div>
            <div className="flex flex-col">
              <p
                className="lowercase"
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 700,
                  fontSize: "14px",
                  letterSpacing: "0.02em",
                  color: "#564051",
                }}
              >
                countdown
              </p>
              <p
                className="lowercase"
                style={{
                  fontFamily: "var(--font-headline)",
                  fontWeight: 800,
                  fontSize: "24px",
                  lineHeight: "28px",
                  letterSpacing: "-0.02em",
                  color: "#aa00a5",
                }}
              >
                {daysLeft > 0 ? `${daysLeft} days left` : "the day is here! 🎉"}
              </p>
            </div>
          </div>
        </section>

        {/* Mini gallery */}
        <section className="mt-8 w-full">
          <h3
            className="mb-4 ml-2 lowercase text-[#564051]"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 700,
              fontSize: "14px",
              letterSpacing: "0.02em",
            }}
          >
            recent memories
          </h3>
          <div className="no-scrollbar flex gap-4 overflow-x-auto pb-4">
            {MEMORY_PHOTOS.map((src, i) => {
              const rotations = ["0deg", "3deg", "-2deg", "1.5deg", "-1deg", "2deg", "-2.5deg", "1deg", "-1.5deg", "2.5deg", "-1deg", "1.5deg", "-2deg", "1deg"];
              return (
                <div
                  key={i}
                  className="relative shrink-0 w-32 h-40 overflow-hidden rounded-2xl shadow-sm transition-transform hover:scale-105"
                  style={{ transform: `rotate(${rotations[i % rotations.length]})` }}
                >
                  <Image
                    src={src}
                    alt={`memory ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="128px"
                  />
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
