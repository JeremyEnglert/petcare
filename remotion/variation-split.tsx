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
  weights: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

// Variation C: "Split Layout / Editorial" — asymmetric compositions,
// magazine-style layouts, bold color blocking, left/right splits

const c = {
  seafoam: "#2dad86",
  seafoamDark: "#1a7058",
  gold: "#c9a46c",
  goldLight: "#f5edda",
  cream: "#faf8f3",
  bark: "#2c1810",
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

// Scene 1: Logo on left, messaging on right — editorial split
const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const leftSpring = spring({ frame, fps, config: { damping: 200 } });
  const rightSpring = spring({ frame, fps, config: { damping: 200 }, delay: 10 });
  const line1Spring = spring({ frame, fps, config: { damping: 200 }, delay: 20 });
  const line2Spring = spring({ frame, fps, config: { damping: 200 }, delay: 30 });
  const line3Spring = spring({ frame, fps, config: { damping: 200 }, delay: 40 });

  const leftX = interpolate(leftSpring, [0, 1], [-80, 0]);
  const rightX = interpolate(rightSpring, [0, 1], [80, 0]);

  return (
    <AbsoluteFill style={{ display: "flex", flexDirection: "row" }}>
      {/* Left panel — seafoam with logo */}
      <div
        style={{
          width: "45%",
          height: "100%",
          backgroundColor: c.seafoam,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          opacity: leftSpring,
          transform: `translateX(${leftX}px)`,
          position: "relative",
        }}
      >
        {/* Diagonal edge */}
        <div
          style={{
            position: "absolute",
            right: -60,
            top: 0,
            bottom: 0,
            width: 120,
            background: c.seafoam,
            transform: "skewX(-4deg)",
          }}
        />
        <Img
          src={staticFile("petcare-logo.svg")}
          style={{
            width: 580,
            filter: "brightness(0) invert(1)",
            opacity: 0.95,
          }}
        />
      </div>

      {/* Right panel — cream with text */}
      <div
        style={{
          width: "55%",
          height: "100%",
          backgroundColor: c.cream,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingLeft: 100,
          opacity: rightSpring,
          transform: `translateX(${rightX}px)`,
        }}
      >
        <div
          style={{
            fontFamily: bodyFont,
            fontSize: 28,
            color: c.gold,
            fontWeight: 600,
            letterSpacing: "5px",
            textTransform: "uppercase",
            opacity: line1Spring,
            marginBottom: 16,
          }}
        >
          Locally Owned
        </div>

        <div
          style={{
            fontFamily: displayFont,
            fontSize: 90,
            color: c.bark,
            lineHeight: 1.1,
            opacity: line2Spring,
          }}
        >
          Affordable
          <br />
          Vet Care
        </div>

        <div
          style={{
            width: 100,
            height: 5,
            backgroundColor: c.gold,
            borderRadius: 3,
            marginTop: 28,
            marginBottom: 28,
            opacity: line3Spring,
            transform: `scaleX(${line3Spring})`,
            transformOrigin: "left",
          }}
        />

        <div
          style={{
            fontFamily: bodyFont,
            fontSize: 34,
            color: c.seafoamDark,
            opacity: line3Spring,
            fontWeight: 500,
          }}
        >
          Transparent pricing in Tucson, AZ
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 2: Full-width announcement with gold stripe
const AnnouncementScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const stripeSpring = spring({ frame, fps, config: { damping: 200 } });
  const textSpring = spring({ frame, fps, config: { damping: 15, stiffness: 80 }, delay: 8 });
  const subSpring = spring({ frame, fps, config: { damping: 200 }, delay: 20 });

  const stripeWidth = interpolate(stripeSpring, [0, 1], [0, 1920]);
  const textScale = interpolate(textSpring, [0, 1], [0.8, 1]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: c.cream,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Top gold stripe */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: stripeWidth,
          height: 12,
          backgroundColor: c.gold,
        }}
      />
      {/* Bottom gold stripe */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: stripeWidth,
          height: 12,
          backgroundColor: c.gold,
        }}
      />

      {/* Seafoam accent block */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: "25%",
          bottom: "25%",
          width: 8,
          backgroundColor: c.seafoam,
          opacity: stripeSpring,
        }}
      />
      <div
        style={{
          position: "absolute",
          right: 0,
          top: "25%",
          bottom: "25%",
          width: 8,
          backgroundColor: c.seafoam,
          opacity: stripeSpring,
        }}
      />

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div
          style={{
            fontFamily: displayFont,
            fontSize: 180,
            color: c.seafoam,
            opacity: textSpring,
            transform: `scale(${textScale})`,
            lineHeight: 1,
          }}
        >
          Grand Opening
        </div>

        <div
          style={{
            fontFamily: bodyFont,
            fontSize: 48,
            color: c.gold,
            opacity: subSpring,
            marginTop: 24,
            fontWeight: 600,
            letterSpacing: "6px",
            textTransform: "uppercase",
          }}
        >
          We&apos;re Open!
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 3: Split deal — price left, details right
const DealScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const priceSpring = spring({ frame, fps, config: { damping: 12, stiffness: 80 } });
  const rightSpring = spring({ frame, fps, config: { damping: 200 }, delay: 12 });
  const detailSpring = spring({ frame, fps, config: { damping: 200 }, delay: 25 });

  const priceScale = interpolate(priceSpring, [0, 1], [0.6, 1]);

  return (
    <AbsoluteFill style={{ display: "flex", flexDirection: "row" }}>
      {/* Left — price on gold */}
      <div
        style={{
          width: "50%",
          height: "100%",
          backgroundColor: c.gold,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          opacity: priceSpring,
        }}
      >
        <div
          style={{
            fontFamily: bodyFont,
            fontSize: 28,
            color: c.white,
            fontWeight: 700,
            letterSpacing: "4px",
            textTransform: "uppercase",
            marginBottom: 16,
            opacity: detailSpring,
          }}
        >
          Special Offer
        </div>
        <div
          style={{
            fontFamily: displayFont,
            fontSize: 340,
            color: c.white,
            lineHeight: 0.85,
            transform: `scale(${priceScale})`,
            textShadow: "0 6px 30px rgba(0,0,0,0.15)",
          }}
        >
          $18
        </div>
      </div>

      {/* Right — details on cream */}
      <div
        style={{
          width: "50%",
          height: "100%",
          backgroundColor: c.cream,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingLeft: 80,
          opacity: rightSpring,
        }}
      >
        <div
          style={{
            fontFamily: displayFont,
            fontSize: 100,
            color: c.bark,
            lineHeight: 1.1,
            opacity: rightSpring,
          }}
        >
          Dog
          <br />
          Vaccines
        </div>

        <div
          style={{
            width: 80,
            height: 5,
            backgroundColor: c.seafoam,
            borderRadius: 3,
            marginTop: 32,
            marginBottom: 32,
            opacity: detailSpring,
            transform: `scaleX(${detailSpring})`,
            transformOrigin: "left",
          }}
        />

        <div
          style={{
            fontFamily: bodyFont,
            fontSize: 36,
            color: c.seafoamDark,
            opacity: detailSpring,
            fontWeight: 500,
            lineHeight: 1.5,
          }}
        >
          Affordable, quality care
          <br />
          for your best friend
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 4: CTA centered on seafoam
const CtaScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const btnSpring = spring({ frame, fps, config: { damping: 15, stiffness: 100 } });
  const infoSpring = spring({ frame, fps, config: { damping: 200 }, delay: 18 });

  const btnScale = interpolate(btnSpring, [0, 1], [0.85, 1]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: c.seafoam,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Corner accents */}
      <div
        style={{
          position: "absolute",
          top: 50,
          left: 50,
          width: 80,
          height: 80,
          borderTop: `4px solid ${c.gold}`,
          borderLeft: `4px solid ${c.gold}`,
          opacity: infoSpring,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 50,
          right: 50,
          width: 80,
          height: 80,
          borderBottom: `4px solid ${c.gold}`,
          borderRight: `4px solid ${c.gold}`,
          opacity: infoSpring,
        }}
      />

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Img
          src={staticFile("petcare-logo.svg")}
          style={{
            width: 400,
            filter: "brightness(0) invert(1)",
            opacity: infoSpring,
            marginBottom: 40,
          }}
        />

        <div
          style={{
            fontFamily: bodyFont,
            fontSize: 58,
            color: c.bark,
            backgroundColor: c.white,
            padding: "32px 90px",
            borderRadius: 60,
            fontWeight: 700,
            opacity: btnSpring,
            transform: `scale(${btnScale})`,
            boxShadow: "0 10px 40px rgba(0,0,0,0.12)",
          }}
        >
          Book Your Visit Today
        </div>

        <div
          style={{
            fontFamily: bodyFont,
            fontSize: 36,
            color: c.white,
            marginTop: 30,
            opacity: infoSpring,
            fontWeight: 500,
            letterSpacing: "3px",
          }}
        >
          Tucson, Arizona
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const GrandOpeningSplit: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: c.cream }}>
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
