import {
  AbsoluteFill,
  Img,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont as loadDisplay } from "@remotion/google-fonts/DMSerifDisplay";
import { loadFont as loadBody } from "@remotion/google-fonts/Outfit";

const { fontFamily: displayFont } = loadDisplay();
const { fontFamily: bodyFont } = loadBody("normal", {
  weights: ["400", "600", "700", "800"],
  subsets: ["latin"],
});

// Variation B: "Bold & Confident" — dark backgrounds, large scale,
// high-contrast gold accents, cinematic feel

const colors = {
  dark: "#1a1410",
  darkGreen: "#0a2e22",
  seafoam: "#2dad86",
  seafoamBright: "#3de0a8",
  gold: "#c9a46c",
  goldBright: "#e8c78a",
  cream: "#faf8f3",
  white: "#ffffff",
};

const FadeScene: React.FC<{
  children: React.ReactNode;
  durationInFrames: number;
  fadeFrames?: number;
}> = ({ children, durationInFrames, fadeFrames = 15 }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(
    frame,
    [0, fadeFrames, durationInFrames - fadeFrames, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  return <AbsoluteFill style={{ opacity }}>{children}</AbsoluteFill>;
};

// Scene 1: Cinematic logo reveal on dark background
const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoSpring = spring({ frame, fps, config: { damping: 200 }, delay: 5 });
  const lineSpring = spring({ frame, fps, config: { damping: 200 }, delay: 18 });
  const tagSpring = spring({ frame, fps, config: { damping: 200 }, delay: 28 });
  const pillSpring = spring({ frame, fps, config: { damping: 200 }, delay: 42 });

  const logoScale = interpolate(logoSpring, [0, 1], [1.1, 1]);

  // Ambient glow behind logo
  const glowPulse = 0.15 + Math.sin((frame / fps) * Math.PI * 0.8) * 0.05;

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 45%, ${colors.darkGreen} 0%, ${colors.dark} 70%)`,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          width: 900,
          height: 900,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${colors.seafoam}${Math.round(glowPulse * 255).toString(16).padStart(2, "0")} 0%, transparent 70%)`,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -55%)",
        }}
      />

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Img
          src={staticFile("petcare-logo.svg")}
          style={{
            width: 750,
            opacity: logoSpring,
            transform: `scale(${logoScale})`,
            filter: `drop-shadow(0 0 40px ${colors.seafoam}40)`,
          }}
        />

        <div
          style={{
            width: 200,
            height: 3,
            background: `linear-gradient(90deg, transparent, ${colors.gold}, transparent)`,
            marginTop: 36,
            marginBottom: 28,
            opacity: lineSpring,
            transform: `scaleX(${lineSpring})`,
          }}
        />

        <div
          style={{
            fontFamily: bodyFont,
            fontSize: 56,
            color: colors.cream,
            opacity: tagSpring,
            fontWeight: 700,
            letterSpacing: "2px",
            textAlign: "center",
          }}
        >
          Affordable Care.{" "}
          <span style={{ color: colors.goldBright }}>Locally Owned.</span>
        </div>

        <div
          style={{
            fontFamily: bodyFont,
            fontSize: 30,
            color: colors.seafoamBright,
            opacity: pillSpring,
            marginTop: 24,
            fontWeight: 400,
            letterSpacing: "6px",
            textTransform: "uppercase",
          }}
        >
          Tucson, Arizona
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 2: Grand Opening — dramatic reveal
const AnnouncementScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headSpring = spring({ frame, fps, config: { damping: 15, stiffness: 80 } });
  const subSpring = spring({ frame, fps, config: { damping: 200 }, delay: 15 });

  const headScale = interpolate(headSpring, [0, 1], [0.6, 1]);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, ${colors.dark} 0%, ${colors.darkGreen} 50%, ${colors.dark} 100%)`,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Gold accent lines */}
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 0,
          right: 0,
          height: 2,
          background: `linear-gradient(90deg, transparent 10%, ${colors.gold}60 50%, transparent 90%)`,
          opacity: subSpring,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 80,
          left: 0,
          right: 0,
          height: 2,
          background: `linear-gradient(90deg, transparent 10%, ${colors.gold}60 50%, transparent 90%)`,
          opacity: subSpring,
        }}
      />

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div
          style={{
            fontFamily: displayFont,
            fontSize: 200,
            color: colors.white,
            opacity: headSpring,
            transform: `scale(${headScale})`,
            textShadow: `0 0 80px ${colors.seafoam}30`,
            lineHeight: 1,
          }}
        >
          Grand Opening
        </div>

        <div
          style={{
            fontFamily: bodyFont,
            fontSize: 52,
            color: colors.goldBright,
            opacity: subSpring,
            marginTop: 28,
            fontWeight: 600,
            letterSpacing: "4px",
            textTransform: "uppercase",
          }}
        >
          Now Welcoming Patients
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 3: The deal — price as hero on dark
const DealScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const priceSpring = spring({ frame, fps, config: { damping: 12, stiffness: 80 } });
  const labelSpring = spring({ frame, fps, config: { damping: 200 }, delay: 12 });
  const badgeSpring = spring({ frame, fps, config: { damping: 200 }, delay: 24 });

  const priceScale = interpolate(priceSpring, [0, 1], [0.5, 1]);
  const pulse = frame > 30 ? 1 + Math.sin((frame / fps) * Math.PI * 1.5) * 0.015 : 1;

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 50%, ${colors.darkGreen} 0%, ${colors.dark} 80%)`,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Glowing ring behind price */}
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          border: `3px solid ${colors.gold}30`,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          opacity: badgeSpring,
        }}
      />

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div
          style={{
            fontFamily: bodyFont,
            fontSize: 32,
            color: colors.dark,
            backgroundColor: colors.goldBright,
            padding: "14px 48px",
            borderRadius: 6,
            fontWeight: 700,
            letterSpacing: "3px",
            textTransform: "uppercase",
            opacity: badgeSpring,
            transform: `scale(${badgeSpring})`,
            marginBottom: 36,
          }}
        >
          Grand Opening Special
        </div>

        <div
          style={{
            fontFamily: displayFont,
            fontSize: 320,
            color: colors.white,
            opacity: priceSpring,
            transform: `scale(${priceScale * pulse})`,
            lineHeight: 0.9,
            textShadow: `0 0 60px ${colors.seafoam}40, 0 4px 20px rgba(0,0,0,0.5)`,
          }}
        >
          $18
        </div>

        <div
          style={{
            fontFamily: bodyFont,
            fontSize: 72,
            color: colors.seafoamBright,
            opacity: labelSpring,
            fontWeight: 700,
            marginTop: 16,
            letterSpacing: "2px",
          }}
        >
          Dog Vaccines
        </div>

        <div
          style={{
            fontFamily: bodyFont,
            fontSize: 36,
            color: colors.gold,
            opacity: labelSpring,
            marginTop: 20,
            fontWeight: 400,
          }}
        >
          Quality care at honest prices
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 4: CTA
const CtaScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const btnSpring = spring({ frame, fps, config: { damping: 15, stiffness: 100 } });
  const infoSpring = spring({ frame, fps, config: { damping: 200 }, delay: 18 });

  const btnScale = interpolate(btnSpring, [0, 1], [0.85, 1]);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, ${colors.darkGreen} 0%, ${colors.dark} 100%)`,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div
          style={{
            fontFamily: bodyFont,
            fontSize: 58,
            color: colors.dark,
            backgroundColor: colors.goldBright,
            padding: "32px 90px",
            borderRadius: 8,
            fontWeight: 800,
            opacity: btnSpring,
            transform: `scale(${btnScale})`,
            letterSpacing: "1px",
          }}
        >
          Book Your Visit Today
        </div>

        <Img
          src={staticFile("petcare-logo.svg")}
          style={{
            width: 350,
            marginTop: 50,
            opacity: infoSpring,
            filter: `drop-shadow(0 0 20px ${colors.seafoam}30)`,
          }}
        />

        <div
          style={{
            fontFamily: bodyFont,
            fontSize: 34,
            color: colors.gold,
            marginTop: 16,
            opacity: infoSpring,
            letterSpacing: "4px",
            textTransform: "uppercase",
          }}
        >
          Tucson, Arizona
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const GrandOpeningBold: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.dark }}>
      <Sequence from={0} durationInFrames={120}>
        <FadeScene durationInFrames={120}>
          <IntroScene />
        </FadeScene>
      </Sequence>
      <Sequence from={105} durationInFrames={130}>
        <FadeScene durationInFrames={130}>
          <AnnouncementScene />
        </FadeScene>
      </Sequence>
      <Sequence from={220} durationInFrames={150}>
        <FadeScene durationInFrames={150}>
          <DealScene />
        </FadeScene>
      </Sequence>
      <Sequence from={350} durationInFrames={100}>
        <FadeScene durationInFrames={100}>
          <CtaScene />
        </FadeScene>
      </Sequence>
    </AbsoluteFill>
  );
};
