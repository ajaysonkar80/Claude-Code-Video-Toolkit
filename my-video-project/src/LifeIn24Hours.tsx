import React from "react";
import {
  AbsoluteFill,
  Composition,
  Easing,
  Interactive,
  interpolate,
  interpolateColors,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const SANS_STACK =
  '"Segoe UI", system-ui, -apple-system, Roboto, "Helvetica Neue", Arial, sans-serif';
const MONO_STACK =
  'Consolas, "Cascadia Mono", "SF Mono", ui-monospace, Menlo, monospace';

const RING_RADIUS = 200;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

const formatThousands = (value: number): string =>
  value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const DriftingOrbs: React.FC = () => {
  const frame = useCurrentFrame();
  const driftEasing = Easing.inOut(Easing.sin);

  return (
    <AbsoluteFill style={{backgroundColor: "#09090b"}}>
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 1100,
          height: 1100,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(139,92,246,0.34) 0%, rgba(139,92,246,0.1) 42%, rgba(139,92,246,0) 70%)",
          translate: `${interpolate(frame, [0, 300, 600, 900], [-250, 230, -310, -250], {extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: driftEasing})}px ${interpolate(frame, [0, 300, 600, 900], [-250, 350, 950, -250], {extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: driftEasing})}px`,
          opacity: interpolate(frame, [0, 225, 450, 675, 900], [0.7, 1, 0.75, 1, 0.7], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 900,
          height: 900,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(244,63,94,0.3) 0%, rgba(244,63,94,0.09) 45%, rgba(244,63,94,0) 72%)",
          translate: `${interpolate(frame, [0, 300, 600, 900], [370, -190, 310, 370], {extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: driftEasing})}px ${interpolate(frame, [0, 300, 600, 900], [1050, 700, -30, 1050], {extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: driftEasing})}px`,
          opacity: interpolate(frame, [0, 225, 450, 675, 900], [0.75, 1, 0.7, 1, 0.75], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 700,
          height: 700,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(139,92,246,0.22) 0%, rgba(139,92,246,0.06) 48%, rgba(139,92,246,0) 74%)",
          translate: `${interpolate(frame, [0, 300, 600, 900], [190, -230, 550, 190], {extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: driftEasing})}px ${interpolate(frame, [0, 300, 600, 900], [610, 1350, 1400, 610], {extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: driftEasing})}px`,
          opacity: interpolate(frame, [0, 225, 450, 675, 900], [0.6, 0.95, 0.7, 1, 0.6], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
    </AbsoluteFill>
  );
};

const CrimsonVeil: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(ellipse at 50% 45%, #7f1d1d 0%, #4c0519 45%, #170404 100%)",
        opacity: interpolate(frame, [596, 656, 756, 816], [0, 1, 1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.inOut(Easing.sin),
        }),
      }}
    />
  );
};

const WarningVignette: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0) 42%, rgba(0,0,0,0.62) 100%)",
        opacity: interpolate(frame, [596, 656, 756, 816], [0, 1, 1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.inOut(Easing.sin),
        }),
      }}
    />
  );
};

const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const headlineIn = spring({
    frame,
    fps,
    config: {damping: 12, mass: 0.7, stiffness: 160},
  });
  const tickerIn = spring({
    frame: frame - 14,
    fps,
    config: {damping: 13, mass: 0.7, stiffness: 140},
  });
  const subtextIn = spring({
    frame: frame - 48,
    fps,
    config: {damping: 14, mass: 0.8, stiffness: 120},
  });

  const secondsLeft = interpolate(frame, [24, 114], [86400, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });
  const glow = interpolate(frame % 30, [0, 15, 30], [0.7, 1, 0.7], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.sin),
  });

  return (
    <AbsoluteFill
      style={{
        opacity: interpolate(frame, [0, 4, 118, 134], [0, 1, 1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 74,
        padding: "0 84px",
      }}
    >
      <Interactive.Div
        name="Hook headline"
        style={{
          fontSize: 96,
          fontWeight: 800,
          lineHeight: 1.08,
          letterSpacing: -2,
          textAlign: "center",
          maxWidth: 900,
          opacity: Math.min(1, headlineIn * 2.4),
          translate: `0px ${-220 * (1 - headlineIn)}px`,
        }}
      >
        You get 86,400 seconds today.
      </Interactive.Div>

      <Interactive.Div
        name="Countdown ticker"
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: Math.min(1, tickerIn * 2),
          scale: interpolate(tickerIn, [0, 1], [0.7, 1]),
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: -70,
            background:
              "radial-gradient(ellipse at center, rgba(244,63,94,0.5) 0%, rgba(244,63,94,0) 70%)",
            filter: "blur(30px)",
            opacity: glow,
          }}
        />
        <div
          style={{
            position: "relative",
            fontSize: 172,
            fontFamily: MONO_STACK,
            fontWeight: 800,
            letterSpacing: -6,
            fontVariantNumeric: "tabular-nums",
            color: "#ffffff",
            textShadow: `0 0 12px rgba(244,63,94,${0.85 * glow}), 0 0 44px rgba(244,63,94,${0.65 * glow}), 0 0 110px rgba(244,63,94,${0.4 * glow})`,
          }}
        >
          {formatThousands(Math.round(secondsLeft))}
        </div>
      </Interactive.Div>

      <Interactive.Div
        name="Hook subtext"
        style={{
          fontSize: 52,
          fontWeight: 500,
          color: "#a1a1aa",
          textAlign: "center",
          opacity: Math.min(1, subtextIn * 2.2),
          translate: `0px ${70 * (1 - subtextIn)}px`,
        }}
      >
        Here is where it actually went...
      </Interactive.Div>
    </AbsoluteFill>
  );
};

const ActOneScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const ringIn = spring({
    frame: frame - 124,
    fps,
    config: {damping: 13, mass: 0.7, stiffness: 130},
  });
  const cardOneIn = spring({
    frame: frame - 138,
    fps,
    config: {damping: 12, mass: 0.6},
  });
  const cardTwoIn = spring({
    frame: frame - 214,
    fps,
    config: {damping: 12, mass: 0.6},
  });
  const remainingIn = spring({
    frame: frame - 286,
    fps,
    config: {damping: 12, mass: 0.6},
  });

  const cyanArc = interpolate(frame, [144, 192], [0, RING_CIRCUMFERENCE * 0.29], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const amberArc = interpolate(frame, [220, 268], [0, RING_CIRCUMFERENCE * 0.33], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const cyanProgress = interpolate(frame, [144, 192], [0, 0.29], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const amberProgress = interpolate(frame, [220, 268], [0.29, 0.62], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const shownProgress = frame < 220 ? cyanProgress : amberProgress;

  return (
    <AbsoluteFill
      style={{
        opacity: interpolate(frame, [120, 128, 324, 342], [0, 1, 1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 56,
      }}
    >
      <div
        style={{
          position: "relative",
          width: 480,
          height: 480,
          opacity: Math.min(1, ringIn * 2),
          scale: interpolate(ringIn, [0, 1], [0.8, 1]),
        }}
      >
        <svg
          width={480}
          height={480}
          viewBox="0 0 480 480"
          style={{position: "absolute", inset: 0}}
        >
          <circle
            cx={240}
            cy={240}
            r={RING_RADIUS}
            fill="none"
            stroke="rgba(255,255,255,0.07)"
            strokeWidth={40}
          />
          <circle
            cx={240}
            cy={240}
            r={RING_RADIUS}
            fill="none"
            stroke="#22d3ee"
            strokeWidth={40}
            strokeLinecap="round"
            strokeDasharray={`${cyanArc} ${RING_CIRCUMFERENCE}`}
            transform="rotate(-90 240 240)"
            opacity={interpolate(frame, [144, 147], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}
            style={{filter: "drop-shadow(0 0 18px rgba(34,211,238,0.75))"}}
          />
          <circle
            cx={240}
            cy={240}
            r={RING_RADIUS}
            fill="none"
            stroke="#f59e0b"
            strokeWidth={40}
            strokeLinecap="round"
            strokeDasharray={`${amberArc} ${RING_CIRCUMFERENCE}`}
            strokeDashoffset={-RING_CIRCUMFERENCE * 0.29}
            transform="rotate(14.4 240 240)"
            opacity={interpolate(frame, [220, 223], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}
            style={{filter: "drop-shadow(0 0 18px rgba(245,158,11,0.75))"}}
          />
        </svg>
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontSize: 124,
              fontWeight: 800,
              letterSpacing: -4,
              color: "#ffffff",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {Math.round(shownProgress * 100)}
            <span style={{fontSize: 62, color: "#a1a1aa"}}>%</span>
          </div>
          <div
            style={{
              fontSize: 26,
              letterSpacing: 6,
              fontWeight: 700,
              color: "#71717a",
            }}
          >
            OF YOUR DAY
          </div>
        </div>
      </div>

      <Interactive.Div
        name="Sleep card"
        style={{
          boxSizing: "border-box",
          display: "flex",
          alignItems: "center",
          gap: 30,
          width: 860,
          padding: "34px 40px",
          borderRadius: 32,
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.09), rgba(255,255,255,0.03))",
          border: "1px solid rgba(255,255,255,0.13)",
          backdropFilter: "blur(24px)",
          boxShadow: "0 24px 70px rgba(0,0,0,0.5)",
          opacity: Math.min(1, cardOneIn * 2.4),
          scale: interpolate(cardOneIn, [0, 1], [0.55, 1]),
        }}
      >
        <div
          style={{
            width: 88,
            height: 88,
            borderRadius: 24,
            boxSizing: "border-box",
            background: "rgba(34,211,238,0.14)",
            border: "1px solid rgba(34,211,238,0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 46,
            flexShrink: 0,
          }}
        >
          🛌
        </div>
        <div style={{flex: 1, fontSize: 44, fontWeight: 700, letterSpacing: -0.5}}>
          Sleep: 7 Hours
        </div>
        <div
          style={{
            fontSize: 32,
            fontWeight: 600,
            color: "#a1a1aa",
            fontFamily: MONO_STACK,
            whiteSpace: "nowrap",
          }}
        >
          (25,200s)
        </div>
      </Interactive.Div>

      <Interactive.Div
        name="Work card"
        style={{
          boxSizing: "border-box",
          display: "flex",
          alignItems: "center",
          gap: 30,
          width: 860,
          padding: "34px 40px",
          borderRadius: 32,
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.09), rgba(255,255,255,0.03))",
          border: "1px solid rgba(255,255,255,0.13)",
          backdropFilter: "blur(24px)",
          boxShadow: "0 24px 70px rgba(0,0,0,0.5)",
          opacity: Math.min(1, cardTwoIn * 2.4),
          translate: `${260 * (1 - cardTwoIn)}px 0px`,
        }}
      >
        <div
          style={{
            width: 88,
            height: 88,
            borderRadius: 24,
            boxSizing: "border-box",
            background: "rgba(245,158,11,0.14)",
            border: "1px solid rgba(245,158,11,0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 46,
            flexShrink: 0,
          }}
        >
          💼
        </div>
        <div style={{flex: 1, fontSize: 44, fontWeight: 700, letterSpacing: -0.5}}>
          Work / Study: 8 Hours
        </div>
        <div
          style={{
            fontSize: 32,
            fontWeight: 600,
            color: "#a1a1aa",
            fontFamily: MONO_STACK,
            whiteSpace: "nowrap",
          }}
        >
          (28,800s)
        </div>
      </Interactive.Div>

      <Interactive.Div
        name="Remaining time"
        style={{
          fontSize: 62,
          fontWeight: 800,
          letterSpacing: -1,
          textAlign: "center",
          opacity: Math.min(1, remainingIn * 2.4),
          translate: `0px ${50 * (1 - remainingIn)}px`,
        }}
      >
        Remaining: <span style={{color: "#8b5cf6"}}>9 Hours.</span>
      </Interactive.Div>
    </AbsoluteFill>
  );
};

const ActTwoScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const badgeIn = spring({
    frame: frame - 340,
    fps,
    config: {damping: 13, mass: 0.7, stiffness: 150},
  });
  const cardThreeIn = spring({
    frame: frame - 376,
    fps,
    config: {damping: 12, mass: 0.6},
  });
  const counterIn = spring({
    frame: frame - 424,
    fps,
    config: {damping: 14, mass: 0.8, stiffness: 120},
  });
  const chartIn = spring({
    frame: frame - 448,
    fps,
    config: {damping: 14, mass: 0.8, stiffness: 120},
  });

  const badgePulse = interpolate(frame % 34, [0, 17, 34], [0, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.sin),
  });
  const hours = interpolate(frame, [440, 540], [0, 4.5], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill
      style={{
        opacity: interpolate(frame, [330, 338, 594, 612], [0, 1, 1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 48,
        padding: "0 90px",
      }}
    >
      <Interactive.Div
        name="Warning badge shell"
        style={{
          opacity: Math.min(1, badgeIn * 2.4),
          scale: interpolate(badgeIn, [0, 1], [0.6, 1]),
        }}
      >
        <Interactive.Div
          name="Warning badge pulse"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            padding: "20px 40px",
            borderRadius: 999,
            boxSizing: "border-box",
            background: "rgba(244,63,94,0.12)",
            border: "2px solid rgba(244,63,94,0.65)",
            boxShadow: `0 0 ${20 + 34 * badgePulse}px rgba(244,63,94,${0.25 + 0.5 * badgePulse}), inset 0 0 30px rgba(244,63,94,0.12)`,
            fontSize: 38,
            fontWeight: 800,
            letterSpacing: 4,
            color: "#ffe4e6",
            whiteSpace: "nowrap",
            scale: interpolate(badgePulse, [0, 1], [0.97, 1.04]),
          }}
        >
          <span>⚠️</span> THE SILENT TIME KILLER
        </Interactive.Div>
      </Interactive.Div>

      <Interactive.Div
        name="Phone card"
        style={{
          boxSizing: "border-box",
          display: "flex",
          alignItems: "center",
          gap: 30,
          width: 860,
          padding: "36px 40px",
          borderRadius: 32,
          background:
            "linear-gradient(135deg, rgba(244,63,94,0.16), rgba(139,92,246,0.08))",
          border: "1px solid rgba(244,63,94,0.4)",
          boxShadow: "0 30px 80px rgba(0,0,0,0.55), 0 0 60px rgba(244,63,94,0.18)",
          opacity: Math.min(1, cardThreeIn * 2.6),
          scale: interpolate(cardThreeIn, [0, 1], [1.5, 1]),
          translate: `0px ${-70 * (1 - cardThreeIn)}px`,
        }}
      >
        <div
          style={{
            width: 96,
            height: 96,
            borderRadius: 26,
            boxSizing: "border-box",
            background: "rgba(244,63,94,0.18)",
            border: "1px solid rgba(244,63,94,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 50,
            flexShrink: 0,
          }}
        >
          📱
        </div>
        <div style={{fontSize: 50, fontWeight: 800, letterSpacing: -1}}>
          Phone &amp; Social Media
        </div>
      </Interactive.Div>

      <Interactive.Div
        name="Screen time counter"
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          opacity: Math.min(1, counterIn * 2.4),
          translate: `0px ${60 * (1 - counterIn)}px`,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: -50,
            background:
              "radial-gradient(ellipse at center, rgba(244,63,94,0.4) 0%, rgba(244,63,94,0) 70%)",
            filter: "blur(40px)",
            opacity: interpolate(frame, [440, 480], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        />
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "baseline",
            gap: 24,
          }}
        >
          <div
            style={{
              fontSize: 210,
              fontFamily: MONO_STACK,
              fontWeight: 800,
              letterSpacing: -10,
              fontVariantNumeric: "tabular-nums",
              background: "linear-gradient(180deg, #ffffff 15%, #fda4af 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              color: "transparent",
            }}
          >
            {hours.toFixed(1)}
          </div>
          <div
            style={{
              fontSize: 60,
              fontWeight: 800,
              letterSpacing: 6,
              color: "#f43f5e",
            }}
          >
            HOURS
          </div>
        </div>
      </Interactive.Div>

      <Interactive.Div
        name="Screen time chart"
        style={{
          width: 900,
          display: "flex",
          flexDirection: "column",
          gap: 22,
          opacity: Math.min(1, chartIn * 2.4),
          translate: `0px ${60 * (1 - chartIn)}px`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 30,
            letterSpacing: 6,
            fontWeight: 800,
            color: "#fda4af",
          }}
        >
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: 999,
              background: "#f43f5e",
              boxShadow: "0 0 16px #f43f5e",
            }}
          />
          SCREEN TIME
        </div>

        <div
          style={{
            display: "flex",
            width: 900,
            height: 100,
            borderRadius: 28,
            overflow: "hidden",
            boxSizing: "border-box",
            border: "1px solid rgba(255,255,255,0.12)",
            boxShadow: "0 24px 60px rgba(0,0,0,0.5)",
            background: "rgba(255,255,255,0.04)",
          }}
        >
          <div
            style={{
              width: 262.5,
              background: "linear-gradient(180deg, #67e8f9, #22d3ee)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 30,
              fontWeight: 800,
              color: "#083344",
            }}
          >
            Sleep
          </div>
          <div
            style={{
              width: 300,
              background: "linear-gradient(180deg, #fbbf24, #f59e0b)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 30,
              fontWeight: 800,
              color: "#451a03",
            }}
          >
            Work
          </div>
          <Interactive.Div
            name="Screen time segment"
            style={{
              width: interpolate(frame, [440, 540], [0, 168.75], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.out(Easing.cubic),
              }),
              background: "linear-gradient(180deg, #fb7185, #f43f5e)",
              boxShadow: "inset 0 0 30px rgba(69,5,10,0.35)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 30,
              fontWeight: 800,
              color: "#4c0519",
            }}
          >
            <span
              style={{
                opacity: interpolate(frame, [478, 512], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
              }}
            >
              Screen
            </span>
          </Interactive.Div>
          <Interactive.Div
            name="Free time segment"
            style={{
              width: interpolate(frame, [440, 540], [337.5, 168.75], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.out(Easing.cubic),
              }),
              background:
                "linear-gradient(180deg, rgba(139,92,246,0.5), rgba(139,92,246,0.22))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 30,
              fontWeight: 800,
              color: "#ddd6fe",
            }}
          >
            Free
          </Interactive.Div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 26,
            fontWeight: 600,
            color: "#71717a",
          }}
        >
          <span>0h</span>
          <span>12h</span>
          <span>24h</span>
        </div>
      </Interactive.Div>
    </AbsoluteFill>
  );
};

const ClimaxScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const titleIn = spring({
    frame: frame - 604,
    fps,
    config: {damping: 13, mass: 0.7, stiffness: 140},
  });
  const numberIn = spring({
    frame: frame - 614,
    fps,
    config: {damping: 13, mass: 0.7, stiffness: 140},
  });
  const batteryIn = spring({
    frame: frame - 628,
    fps,
    config: {damping: 13, mass: 0.7, stiffness: 140},
  });

  const hoursLeft = interpolate(frame, [618, 700], [4.5, 1.5], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const batteryPct = interpolate(frame, [630, 726], [100, 6], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.quad),
  });
  const fillColor = interpolateColors(
    batteryPct,
    [6, 25, 55, 100],
    ["#ef4444", "#f43f5e", "#eab308", "#22c55e"],
  );
  const warningStripes = interpolate(batteryPct, [25, 35], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const flash = interpolate(frame % 18, [0, 9, 18], [1, 0.2, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.sin),
  });

  return (
    <AbsoluteFill
      style={{
        opacity: interpolate(frame, [600, 608, 774, 790], [0, 1, 1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 56,
      }}
    >
      <Interactive.Div
        name="Climax headline"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 18,
          opacity: Math.min(1, titleIn * 2.4),
          translate: `0px ${-50 * (1 - titleIn)}px`,
        }}
      >
        <div
          style={{
            fontSize: 42,
            fontWeight: 800,
            letterSpacing: 10,
            color: "#fda4af",
          }}
        >
          TIME LEFT FOR
        </div>
        <div
          style={{
            fontSize: 92,
            fontWeight: 900,
            letterSpacing: -2,
            color: "#ffffff",
            whiteSpace: "nowrap",
          }}
        >
          YOUR REAL DREAMS
        </div>
      </Interactive.Div>

      <Interactive.Div
        name="Hours left number"
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 24,
          opacity: Math.min(1, numberIn * 2.4),
          scale: interpolate(numberIn, [0, 1], [0.7, 1]),
        }}
      >
        <div
          style={{
            fontSize: 260,
            fontFamily: MONO_STACK,
            fontWeight: 800,
            letterSpacing: -12,
            fontVariantNumeric: "tabular-nums",
            color: "#ffffff",
            textShadow:
              "0 0 40px rgba(244,63,94,0.75), 0 0 110px rgba(244,63,94,0.5)",
          }}
        >
          {hoursLeft.toFixed(1)}
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            letterSpacing: 6,
            color: "#fda4af",
          }}
        >
          HOURS
        </div>
      </Interactive.Div>

      <Interactive.Div
        name="Battery gauge"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 26,
          opacity: Math.min(1, batteryIn * 2.4),
          translate: `0px ${60 * (1 - batteryIn)}px`,
        }}
      >
        <div
          style={{
            fontSize: 28,
            letterSpacing: 8,
            fontWeight: 800,
            color: "#fca5a5",
          }}
        >
          YOUR DAY&apos;S BATTERY
        </div>
        <div style={{display: "flex", alignItems: "center", gap: 40}}>
          <div style={{position: "relative", width: 560, height: 168}}>
            <div
              style={{
                position: "absolute",
                inset: 0,
                boxSizing: "border-box",
                border: "10px solid rgba(255,255,255,0.3)",
                borderRadius: 36,
                background: "rgba(255,255,255,0.06)",
                overflow: "hidden",
                boxShadow: `0 0 ${interpolate(batteryPct, [6, 40], [70, 0], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                })}px rgba(244,63,94,${interpolate(batteryPct, [6, 40], [0.8, 0], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                })})`,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 10,
                  bottom: 10,
                  left: 10,
                  width: `calc((100% - 20px) * ${batteryPct / 100})`,
                  borderRadius: 20,
                  background: fillColor,
                  boxShadow: `0 0 30px ${fillColor}`,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: 10,
                  bottom: 10,
                  left: `calc((100% - 20px) * ${batteryPct / 100} + 20px)`,
                  right: 10,
                  borderRadius: 20,
                  background:
                    "repeating-linear-gradient(45deg, rgba(244,63,94,0.9) 0px, rgba(244,63,94,0.9) 14px, rgba(244,63,94,0) 14px, rgba(244,63,94,0) 30px)",
                  opacity: warningStripes * flash,
                }}
              />
            </div>
            <div
              style={{
                position: "absolute",
                right: -30,
                top: 47,
                width: 22,
                height: 74,
                borderRadius: 12,
                background: "rgba(255,255,255,0.35)",
              }}
            />
          </div>
          <div
            style={{
              fontSize: 76,
              fontFamily: MONO_STACK,
              fontWeight: 800,
              fontVariantNumeric: "tabular-nums",
              color: fillColor,
            }}
          >
            {Math.round(batteryPct)}%
          </div>
        </div>
      </Interactive.Div>
    </AbsoluteFill>
  );
};

const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const lineOneIn = spring({
    frame: frame - 790,
    fps,
    config: {damping: 13, mass: 0.7, stiffness: 150},
  });
  const lineTwoIn = spring({
    frame: frame - 825,
    fps,
    config: {damping: 13, mass: 0.7, stiffness: 150},
  });
  const lineThreeIn = spring({
    frame: frame - 860,
    fps,
    config: {damping: 13, mass: 0.7, stiffness: 150},
  });

  const stackShift = interpolate(frame, [818, 848, 853, 883], [164, 77, 77, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });

  return (
    <AbsoluteFill
      style={{
        opacity: interpolate(frame, [780, 790], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 84px",
      }}
    >
      <Interactive.Div
        name="Outro kinetic stack"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 44,
          translate: `0px ${stackShift}px`,
        }}
      >
        <Interactive.Div
          name="Stop scrolling"
          style={{
            height: 130,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 96,
            fontWeight: 900,
            letterSpacing: -2,
            whiteSpace: "nowrap",
            opacity: Math.min(1, lineOneIn * 2.4),
            scale: interpolate(lineOneIn, [0, 1], [0.8, 1]),
            translate: `0px ${-70 * (1 - lineOneIn)}px`,
          }}
        >
          Stop<span style={{color: "#f43f5e", marginLeft: 26}}>scrolling.</span>
        </Interactive.Div>

        <Interactive.Div
          name="Start building"
          style={{
            height: 130,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 96,
            fontWeight: 900,
            letterSpacing: -2,
            whiteSpace: "nowrap",
            opacity: Math.min(1, lineTwoIn * 2.4),
            scale: interpolate(lineTwoIn, [0, 1], [0.8, 1]),
            translate: `0px ${70 * (1 - lineTwoIn)}px`,
          }}
        >
          Start<span style={{color: "#8b5cf6", marginLeft: 26}}>building.</span>
        </Interactive.Div>

        <Interactive.Div
          name="Rendered tag"
          style={{
            height: 110,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: Math.min(1, lineThreeIn * 2.6),
            scale: interpolate(lineThreeIn, [0, 1], [0.6, 1]),
          }}
        >
          <div
            style={{
              boxSizing: "border-box",
              padding: "22px 44px",
              borderRadius: 999,
              background: "rgba(139,92,246,0.16)",
              border: "2px solid rgba(139,92,246,0.7)",
              boxShadow:
                "0 0 50px rgba(139,92,246,0.5), inset 0 0 30px rgba(139,92,246,0.18)",
              color: "#ddd6fe",
              fontSize: 40,
              fontWeight: 700,
              letterSpacing: 1,
              whiteSpace: "nowrap",
            }}
          >
            Rendered entirely with Code &amp; AI.
          </div>
        </Interactive.Div>
      </Interactive.Div>
    </AbsoluteFill>
  );
};

export const LifeIn24HoursVideo: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#09090b",
        fontFamily: SANS_STACK,
        color: "#fafafa",
      }}
    >
      <AbsoluteFill
        style={{
          scale: interpolate(frame, [330, 600, 780, 845], [1, 1.08, 1.08, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.inOut(Easing.cubic),
            output: "perceptual-scale",
          }),
          translate: interpolate(
            frame,
            [396, 401, 406, 411, 416],
            ["0px 0px", "-18px 10px", "12px -7px", "-6px 4px", "0px 0px"],
            {extrapolateLeft: "clamp", extrapolateRight: "clamp"},
          ),
        }}
      >
        <DriftingOrbs />
        <CrimsonVeil />
        {frame < 134 ? <HookScene /> : null}
        {frame >= 118 && frame < 346 ? <ActOneScene /> : null}
        {frame >= 324 && frame < 616 ? <ActTwoScene /> : null}
        {frame >= 594 && frame < 792 ? <ClimaxScene /> : null}
        {frame >= 774 ? <OutroScene /> : null}
      </AbsoluteFill>
      <WarningVignette />
    </AbsoluteFill>
  );
};

export const LifeIn24Hours: React.FC = () => {
  return (
    <Composition
      id="LifeIn24Hours"
      component={LifeIn24HoursVideo}
      durationInFrames={900}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};
