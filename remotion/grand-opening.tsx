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
  weights: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const colors = {
  seafoam: "#2dad86",
  seafoamDark: "#208c6b",
  seafoamLight: "#f0fbf6",
  gold: "#c9a46c",
  goldLight: "#f5edda",
  cream: "#faf8f3",
  bark: "#2c1810",
  white: "#ffffff",
};

const PawPrint: React.FC<{
  x: number;
  y: number;
  size: number;
  opacity: number;
  rotation: number;
}> = ({ x, y, size, opacity, rotation }) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      fontSize: size,
      opacity,
      transform: `rotate(${rotation}deg)`,
    }}
  >
    🐾
  </div>
);

const Blob: React.FC<{
  color: string;
  x: number;
  y: number;
  size: number;
  opacity: number;
}> = ({ color, x, y, size, opacity }) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      width: size,
      height: size,
      borderRadius: "60% 40% 55% 45% / 45% 55% 40% 60%",
      background: color,
      opacity,
    }}
  />
);

// Scene 1: Intro — logo + affordable / locally owned messaging
const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoSpring = spring({ frame, fps, config: { damping: 200 } });
  const dividerSpring = spring({ frame, fps, config: { damping: 200 }, delay: 12 });
  const taglineSpring = spring({ frame, fps, config: { damping: 200 }, delay: 22 });
  const pillsSpring = spring({ frame, fps, config: { damping: 200 }, delay: 35 });

  const pawOpacity = interpolate(frame, [0, 30], [0, 0.12], {
    extrapolateRight: "clamp",
  });

  const logoY = interpolate(logoSpring, [0, 1], [50, 0]);
  const taglineY = interpolate(taglineSpring, [0, 1], [25, 0]);
  const pillsY = interpolate(pillsSpring, [0, 1], [20, 0]);
  const floatOffset = Math.sin((frame / fps) * Math.PI * 0.5) * 5;

  return (
    <AbsoluteFill
      style={{ backgroundColor: colors.cream, justifyContent: "center", alignItems: "center" }}
    >
      <Blob color={colors.seafoamLight} x={-100} y={-80} size={500} opacity={0.6} />
      <Blob color={colors.goldLight} x={1400} y={500} size={400} opacity={0.5} />

      <PawPrint x={150} y={120} size={60} opacity={pawOpacity} rotation={-20} />
      <PawPrint x={1600} y={200} size={45} opacity={pawOpacity} rotation={15} />
      <PawPrint x={300} y={750} size={50} opacity={pawOpacity} rotation={-35} />
      <PawPrint x={1500} y={800} size={55} opacity={pawOpacity} rotation={25} />
      <PawPrint x={900} y={100} size={40} opacity={pawOpacity * 0.7} rotation={10} />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          transform: `translateY(${floatOffset}px)`,
        }}
      >
        <Img
          src={staticFile("petcare-logo.svg")}
          style={{
            width: 700,
            opacity: logoSpring,
            transform: `translateY(${logoY}px)`,
          }}
        />

        <div
          style={{
            width: 180,
            height: 5,
            background: `linear-gradient(90deg, ${colors.seafoam}, ${colors.gold})`,
            borderRadius: 3,
            marginTop: 32,
            marginBottom: 24,
            opacity: dividerSpring,
            transform: `scaleX(${dividerSpring})`,
          }}
        />

        <div
          style={{
            fontFamily: bodyFont,
            fontSize: 52,
            color: colors.bark,
            opacity: taglineSpring,
            transform: `translateY(${taglineY}px)`,
            fontWeight: 600,
            letterSpacing: "1px",
            textAlign: "center",
            lineHeight: 1.4,
          }}
        >
          Affordable Vet Care,{" "}
          <span style={{ color: colors.seafoam }}>Locally Owned</span>
        </div>

        <div
          style={{
            display: "flex",
            gap: 24,
            marginTop: 32,
            opacity: pillsSpring,
            transform: `translateY(${pillsY}px)`,
          }}
        >
          {["Transparent Pricing", "Tucson, AZ", "Your Neighborhood Vet"].map(
            (label) => (
              <div
                key={label}
                style={{
                  fontFamily: bodyFont,
                  fontSize: 26,
                  color: colors.seafoamDark,
                  backgroundColor: colors.seafoamLight,
                  padding: "12px 32px",
                  borderRadius: 30,
                  fontWeight: 500,
                  border: `1.5px solid ${colors.seafoam}30`,
                }}
              >
                {label}
              </div>
            ),
          )}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 2: Grand Opening Announcement (frames ~90-210)
const AnnouncementScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headingSpring = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 100 },
  });
  const subSpring = spring({
    frame,
    fps,
    config: { damping: 200 },
    delay: 12,
  });
  const sparkleOpacity = interpolate(frame, [20, 35], [0, 1], {
    extrapolateRight: "clamp",
  });

  const headingScale = interpolate(headingSpring, [0, 1], [0.7, 1]);
  const headingRotation = interpolate(headingSpring, [0, 1], [-3, 0]);

  const sparkle1Y = Math.sin((frame / fps) * Math.PI * 2) * 8;
  const sparkle2Y = Math.cos((frame / fps) * Math.PI * 2) * 8;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.seafoam} 0%, ${colors.seafoamDark} 100%)`,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Blob color="rgba(255,255,255,0.08)" x={-150} y={-100} size={600} opacity={1} />
      <Blob color="rgba(255,255,255,0.06)" x={1300} y={400} size={500} opacity={1} />

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div
          style={{
            fontFamily: displayFont,
            fontSize: 170,
            color: colors.white,
            opacity: headingSpring,
            transform: `scale(${headingScale}) rotate(${headingRotation}deg)`,
            textShadow: "0 4px 30px rgba(0,0,0,0.15)",
            position: "relative",
          }}
        >
          <span
            style={{
              position: "absolute",
              left: -60,
              top: -20,
              fontSize: 60,
              opacity: sparkleOpacity,
              transform: `translateY(${sparkle1Y}px)`,
            }}
          >
            ✨
          </span>
          Grand Opening!
          <span
            style={{
              position: "absolute",
              right: -60,
              bottom: -10,
              fontSize: 60,
              opacity: sparkleOpacity,
              transform: `translateY(${sparkle2Y}px)`,
            }}
          >
            ✨
          </span>
        </div>

        <div
          style={{
            fontFamily: bodyFont,
            fontSize: 48,
            color: colors.goldLight,
            opacity: subSpring,
            marginTop: 24,
            fontWeight: 500,
            letterSpacing: "2px",
          }}
        >
          We&apos;re excited to welcome you
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 3: The Deal (frames ~200-360)
const DealScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const priceSpring = spring({
    frame,
    fps,
    config: { damping: 10, stiffness: 80 },
  });
  const labelSpring = spring({
    frame,
    fps,
    config: { damping: 200 },
    delay: 10,
  });
  const badgeSpring = spring({
    frame,
    fps,
    config: { damping: 200 },
    delay: 20,
  });

  const priceScale = interpolate(priceSpring, [0, 1], [0.5, 1]);

  // Subtle pulse on the price after it lands
  const pulse = frame > 25 ? 1 + Math.sin((frame / fps) * Math.PI * 2) * 0.02 : 1;

  return (
    <AbsoluteFill
      style={{ backgroundColor: colors.cream, justifyContent: "center", alignItems: "center" }}
    >
      <Blob color={colors.goldLight} x={-50} y={-50} size={400} opacity={0.5} />
      <Blob color={colors.seafoamLight} x={1400} y={600} size={350} opacity={0.5} />

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        {/* Badge */}
        <div
          style={{
            fontFamily: bodyFont,
            fontSize: 28,
            color: colors.white,
            backgroundColor: colors.gold,
            padding: "14px 40px",
            borderRadius: 30,
            fontWeight: 600,
            letterSpacing: "2px",
            textTransform: "uppercase",
            opacity: badgeSpring,
            transform: `scale(${badgeSpring})`,
            marginBottom: 30,
          }}
        >
          Grand Opening Special
        </div>

        {/* Price */}
        <div
          style={{
            fontFamily: displayFont,
            fontSize: 280,
            color: colors.seafoam,
            opacity: priceSpring,
            transform: `scale(${priceScale * pulse})`,
            lineHeight: 1,
            textShadow: `0 4px 20px rgba(45,173,134,0.2)`,
          }}
        >
          $18
        </div>

        {/* Label */}
        <div
          style={{
            fontFamily: bodyFont,
            fontSize: 64,
            color: colors.bark,
            opacity: labelSpring,
            fontWeight: 600,
            marginTop: 14,
          }}
        >
          Dog Vaccines
        </div>

        {/* Decorative line */}
        <div
          style={{
            width: 80,
            height: 3,
            background: colors.gold,
            borderRadius: 2,
            marginTop: 24,
            opacity: labelSpring,
            transform: `scaleX(${labelSpring})`,
          }}
        />

        <div
          style={{
            fontFamily: bodyFont,
            fontSize: 34,
            color: colors.seafoamDark,
            opacity: labelSpring,
            marginTop: 24,
            fontWeight: 400,
          }}
        >
          Affordable care for your best friend
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 4: CTA (frames ~350-450)
const CtaScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const buttonSpring = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 100 },
  });
  const infoSpring = spring({
    frame,
    fps,
    config: { damping: 200 },
    delay: 15,
  });

  const buttonScale = interpolate(buttonSpring, [0, 1], [0.8, 1]);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.seafoam} 0%, ${colors.seafoamDark} 100%)`,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Blob color="rgba(255,255,255,0.08)" x={100} y={100} size={500} opacity={1} />
      <Blob color="rgba(255,255,255,0.05)" x={1200} y={500} size={450} opacity={1} />

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        {/* CTA Button */}
        <div
          style={{
            fontFamily: bodyFont,
            fontSize: 54,
            color: colors.seafoamDark,
            backgroundColor: colors.white,
            padding: "30px 80px",
            borderRadius: 50,
            fontWeight: 700,
            opacity: buttonSpring,
            transform: `scale(${buttonScale})`,
            boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
          }}
        >
          Book Your Visit Today
        </div>

        {/* Clinic info */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: 40,
            opacity: infoSpring,
          }}
        >
          <div
            style={{
              fontFamily: displayFont,
              fontSize: 60,
              color: colors.white,
            }}
          >
            Pet Care
          </div>
          <div
            style={{
              fontFamily: bodyFont,
              fontSize: 36,
              color: colors.goldLight,
              marginTop: 8,
              fontWeight: 400,
              letterSpacing: "1px",
            }}
          >
            Tucson, Arizona
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Wrapper that fades a scene in and out
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

// Main composition — 450 frames = 15s at 30fps
export const GrandOpening: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.cream }}>
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
