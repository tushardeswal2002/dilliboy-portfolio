import { ImageResponse } from "next/og";

export const runtime = "nodejs";

export const alt = "DILLIBOY — Music Producer, DJ & Sound Designer";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "70px",
          background: "#050505",
          color: "white",
          fontFamily: "Arial",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 24,
            letterSpacing: "0.25em",
            fontWeight: 700,
            opacity: 0.55,
          }}
        >
          MUSIC / SOUND / CULTURE
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 150,
              lineHeight: 0.85,
              fontWeight: 900,
              letterSpacing: "-0.06em",
            }}
          >
            DILLIBOY
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 32,
              fontSize: 34,
              fontWeight: 500,
              opacity: 0.7,
            }}
          >
            MUSIC PRODUCER · DJ · SOUND DESIGNER
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 22,
            opacity: 0.5,
          }}
        >
          <span>DELHI, INDIA</span>
          <span>dilliboy.com</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}