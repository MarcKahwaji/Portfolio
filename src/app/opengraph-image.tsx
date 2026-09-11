import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/data/site";

export const alt = site.metaTitle;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const centre = { x: 200, y: 200 };
const nodes = [
  { x: 200, y: 62 },
  { x: 322, y: 118 },
  { x: 348, y: 232 },
  { x: 282, y: 330 },
  { x: 172, y: 344 },
  { x: 72, y: 282 },
  { x: 58, y: 152 },
];
const pairs: [number, number][] = [
  [0, 1],
  [2, 3],
  [5, 6],
];

export default async function OpengraphImage() {
  const bricolage = await readFile(
    join(process.cwd(), "src/assets/fonts/BricolageGrotesque-Bold.ttf"),
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#0B1220",
          padding: "80px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "680px",
          }}
        >
          <div
            style={{
              fontFamily: "Bricolage Grotesque",
              fontSize: 64,
              fontWeight: 700,
              color: "#E6EAF2",
              letterSpacing: "-0.02em",
            }}
          >
            {site.name}
          </div>
          <div
            style={{
              marginTop: 28,
              fontFamily: "Bricolage Grotesque",
              fontSize: 36,
              fontWeight: 700,
              color: "#8B97AD",
              letterSpacing: "-0.02em",
              lineHeight: 1.25,
            }}
          >
            {site.hero.headline}
          </div>
        </div>
        <svg width="340" height="340" viewBox="0 0 400 400">
          {nodes.map((n, i) => (
            <line
              key={`e-${i}`}
              x1={centre.x}
              y1={centre.y}
              x2={n.x}
              y2={n.y}
              stroke="#22304A"
              strokeWidth="1.5"
            />
          ))}
          {pairs.map(([a, b]) => (
            <line
              key={`p-${a}-${b}`}
              x1={nodes[a].x}
              y1={nodes[a].y}
              x2={nodes[b].x}
              y2={nodes[b].y}
              stroke="#22304A"
              strokeWidth="1.5"
            />
          ))}
          {nodes.map((n, i) => (
            <circle key={`n-${i}`} cx={n.x} cy={n.y} r="6" fill="#3DDC97" />
          ))}
          <circle cx={centre.x} cy={centre.y} r="9" fill="#3DDC97" />
        </svg>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Bricolage Grotesque",
          data: bricolage,
          weight: 700,
          style: "normal",
        },
      ],
    },
  );
}
