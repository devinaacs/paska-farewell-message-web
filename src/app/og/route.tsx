import { ImageResponse } from "next/og";

export const runtime = "edge";

const size = { width: 1200, height: 630 };

export function GET() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: "#f9f9f9",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Gradient mesh blobs */}
      <div
        style={{
          position: "absolute",
          top: -80,
          left: -80,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "rgba(255, 28, 247, 0.18)",
          filter: "blur(80px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -80,
          right: -80,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "rgba(255, 138, 0, 0.18)",
          filter: "blur(80px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 200,
          right: 200,
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "rgba(170, 0, 165, 0.10)",
          filter: "blur(80px)",
        }}
      />

      {/* Decorative post-it cards (background) */}
      <div
        style={{
          position: "absolute",
          top: 60,
          right: 80,
          width: 180,
          height: 180,
          background: "#EF9480",
          borderRadius: 16,
          transform: "rotate(8deg)",
          boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
          display: "flex",
          flexDirection: "column",
          padding: 20,
          gap: 12,
        }}
      >
        <span style={{ fontSize: 36 }}>🚀</span>
        <span style={{ color: "white", fontSize: 18, fontWeight: 700, fontFamily: "sans-serif" }}>good luck!</span>
      </div>
      <div
        style={{
          position: "absolute",
          top: 260,
          right: 50,
          width: 160,
          height: 160,
          background: "#6667AB",
          borderRadius: 16,
          transform: "rotate(-6deg)",
          boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
          display: "flex",
          flexDirection: "column",
          padding: 20,
          gap: 12,
        }}
      >
        <span style={{ fontSize: 32 }}>❤️</span>
        <span style={{ color: "white", fontSize: 16, fontWeight: 700, fontFamily: "sans-serif" }}>we'll miss you</span>
      </div>
      <div
        style={{
          position: "absolute",
          top: 420,
          right: 180,
          width: 150,
          height: 150,
          background: "#95B4AA",
          borderRadius: 16,
          transform: "rotate(5deg)",
          boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
          display: "flex",
          flexDirection: "column",
          padding: 20,
          gap: 10,
        }}
      >
        <span style={{ fontSize: 28 }}>✨</span>
        <span style={{ color: "white", fontSize: 14, fontWeight: 700, fontFamily: "sans-serif" }}>congrats!</span>
      </div>

      {/* Main content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "64px 80px",
          gap: 24,
          maxWidth: 780,
        }}
      >
        {/* Eyebrow chip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: "#aa00a5",
            color: "white",
            borderRadius: 999,
            padding: "10px 24px",
            width: "max-content",
            fontFamily: "sans-serif",
            fontSize: 20,
            fontWeight: 700,
            letterSpacing: "0.02em",
          }}
        >
          🎉 paska post-it wall
        </div>

        {/* Headline */}
        <h1
          style={{
            margin: 0,
            fontFamily: "sans-serif",
            fontWeight: 900,
            fontSize: 100,
            lineHeight: 0.9,
            letterSpacing: "-0.04em",
            color: "#1b1b1b",
          }}
        >
          farewell,{"\n"}paska! 👋
        </h1>

        {/* Subtitle */}
        <p
          style={{
            margin: 0,
            fontFamily: "sans-serif",
            fontSize: 28,
            color: "#564051",
            fontWeight: 500,
            lineHeight: 1.4,
          }}
        >
          leave a note on the wall before
          <br />
          he heads to tripatra ✈️
        </p>

        {/* Footer tag */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginTop: 8,
          }}
        >
          <div
            style={{
              background: "#ff8a00",
              color: "white",
              borderRadius: 999,
              padding: "8px 20px",
              fontFamily: "sans-serif",
              fontSize: 18,
              fontWeight: 700,
            }}
          >
            cmk → tripatra
          </div>
          <span style={{ color: "#564051", fontFamily: "sans-serif", fontSize: 18 }}>
            · july 17, 2026
          </span>
        </div>
      </div>
    </div>,
    size,
  );
}
