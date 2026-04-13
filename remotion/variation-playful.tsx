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

// Variation D: "Playful & Organic" — rounded shapes, bouncy animations,
// real pet photos, stacked cards, lots of personality

const c = {
  seafoam: "#2dad86",
  seafoamLight: "#e8f8f0",
  seafoamPale: "#f0fbf6",
  gold: "#c9a46c",
  goldLight: "#f5edda",
  cream: "#faf8f3",
  bark: "#2c1810",
  barkLight: "#5c3d2e",
  white: "#ffffff",
  coral: "#e8856c",
};

const photos = {
  goldenRetriever: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=80",
  cat: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&q=80",
  twoDogsRunning: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&q=80",
  pug: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&q=80",
  dogPortrait: "https://images.unsplash.com/photo-1415369629372-26f2fe60c467?w=400&q=80",
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

// Floating circular photo that drifts gently
const FloatingPhoto: React.FC<{
  src: string;
  x: number;
  y: number;
  size: number;
  delay: number;
  speed?: number;
  border?: string;
}> = ({ src, x, y, size, delay, speed = 1, border = c.white }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const appear = spring({ frame, fps, config: { damping: 200 }, delay });
  const drift = Math.sin(((frame + delay * 10) / fps) * Math.PI * speed) * 10;
  const rotate = Math.sin(((frame + delay * 7) / fps) * Math.PI * 0.5) * 4;
  const scale = interpolate(appear, [0, 1], [0.7, 1]);

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: size,
        height: size,
        borderRadius: "50%",
        overflow: "hidden",
        border: `4px solid ${border}`,
        boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
        opacity: appear * 0.85,
        transform: `translateY(${drift}px) rotate(${rotate}deg) scale(${scale})`,
      }}
    >
      <Img
        src={src}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </div>
  );
};

// Rounded blob
const Bubble: React.FC<{
  color: string;
  x: number;
  y: number;
  size: number;
}> = ({ color, x, y, size }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const wobble = Math.sin((frame / fps) * Math.PI * 0.7) * 3;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: size,
        height: size + wobble,
        borderRadius: "50%",
        background: color,
      }}
    />
  );
};

// Scene 1: Playful intro with bouncing logo and stacked pills
const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoSpring = spring({ frame, fps, config: { damping: 10, stiffness: 100 } });
  const tag1 = spring({ frame, fps, config: { damping: 12 }, delay: 15 });
  const tag2 = spring({ frame, fps, config: { damping: 12 }, delay: 22 });
  const tag3 = spring({ frame, fps, config: { damping: 12 }, delay: 29 });

  const logoScale = interpolate(logoSpring, [0, 1], [0.6, 1]);
  const logoRotate = interpolate(logoSpring, [0, 1], [-5, 0]);

  const tag1Y = interpolate(tag1, [0, 1], [40, 0]);
  const tag2Y = interpolate(tag2, [0, 1], [40, 0]);
  const tag3Y = interpolate(tag3, [0, 1], [40, 0]);

  return (
    <AbsoluteFill
      style={{ backgroundColor: c.cream, justifyContent: "center", alignItems: "center" }}
    >
      <Bubble color={c.seafoamLight} x={-80} y={-60} size={450} />
      <Bubble color={c.goldLight} x={1350} y={550} size={380} />
      <Bubble color={c.seafoamPale} x={1500} y={-100} size={300} />
      <Bubble color={c.goldLight} x={100} y={700} size={250} />

      <FloatingPhoto src={photos.goldenRetriever} x={80} y={100} size={180} delay={5} />
      <FloatingPhoto src={photos.cat} x={1620} y={140} size={150} delay={10} border={c.gold} />
      <FloatingPhoto src={photos.twoDogsRunning} x={180} y={740} size={160} delay={15} speed={0.8} />
      <FloatingPhoto src={photos.pug} x={1520} y={720} size={170} delay={8} speed={1.2} border={c.seafoam} />
      <FloatingPhoto src={photos.dogPortrait} x={1680} y={460} size={130} delay={20} />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Img
          src={staticFile("petcare-logo.svg")}
          style={{
            width: 700,
            opacity: logoSpring,
            transform: `scale(${logoScale}) rotate(${logoRotate}deg)`,
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 14,
            marginTop: 36,
          }}
        >
          {/* Stacked bouncy pills */}
          <div
            style={{
              fontFamily: bodyFont,
              fontSize: 48,
              color: c.bark,
              fontWeight: 700,
              opacity: tag1,
              transform: `translateY(${tag1Y}px)`,
            }}
          >
            Affordable Vet Care
          </div>

          <div
            style={{
              fontFamily: bodyFont,
              fontSize: 40,
              color: c.seafoam,
              backgroundColor: c.seafoamLight,
              padding: "12px 40px",
              borderRadius: 50,
              fontWeight: 600,
              opacity: tag2,
              transform: `translateY(${tag2Y}px)`,
            }}
          >
            Locally Owned in Tucson
          </div>

          <div
            style={{
              fontFamily: bodyFont,
              fontSize: 32,
              color: c.gold,
              opacity: tag3,
              transform: `translateY(${tag3Y}px)`,
              fontWeight: 500,
            }}
          >
            Transparent, Honest Pricing
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 2: Fun announcement with card-style panel
const AnnouncementScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardSpring = spring({ frame, fps, config: { damping: 12, stiffness: 80 } });
  const textSpring = spring({ frame, fps, config: { damping: 200 }, delay: 10 });
  const confettiSpring = spring({ frame, fps, config: { damping: 200 }, delay: 20 });

  const cardScale = interpolate(cardSpring, [0, 1], [0.7, 1]);
  const cardRotate = interpolate(cardSpring, [0, 1], [3, 0]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: c.seafoam,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Bubble color="rgba(255,255,255,0.1)" x={-50} y={-50} size={500} />
      <Bubble color="rgba(255,255,255,0.07)" x={1400} y={500} size={400} />

      {/* Floating pet photos */}
      <FloatingPhoto src={photos.goldenRetriever} x={120} y={120} size={160} delay={5} border={c.white} />
      <FloatingPhoto src={photos.pug} x={1600} y={160} size={140} delay={12} border={c.white} />
      <FloatingPhoto src={photos.twoDogsRunning} x={200} y={760} size={150} delay={18} border={c.white} speed={0.8} />
      <FloatingPhoto src={photos.cat} x={1500} y={740} size={130} delay={10} border={c.white} />

      {/* Card */}
      <div
        style={{
          backgroundColor: c.white,
          borderRadius: 40,
          padding: "60px 100px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          opacity: cardSpring,
          transform: `scale(${cardScale}) rotate(${cardRotate}deg)`,
          boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
        }}
      >
        <div
          style={{
            fontFamily: displayFont,
            fontSize: 160,
            color: c.seafoam,
            opacity: textSpring,
            lineHeight: 1,
          }}
        >
          Grand Opening!
        </div>

        <div
          style={{
            fontFamily: bodyFont,
            fontSize: 44,
            color: c.barkLight,
            opacity: confettiSpring,
            marginTop: 20,
            fontWeight: 600,
          }}
        >
          We can&apos;t wait to meet your pets!
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 3: Deal as a big playful badge
const DealScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const circleSpring = spring({ frame, fps, config: { damping: 10, stiffness: 80 } });
  const textSpring = spring({ frame, fps, config: { damping: 200 }, delay: 12 });
  const detailSpring = spring({ frame, fps, config: { damping: 200 }, delay: 24 });

  const circleScale = interpolate(circleSpring, [0, 1], [0.4, 1]);
  const circleRotate = interpolate(circleSpring, [0, 1], [-10, 0]);
  const pulse = frame > 30 ? 1 + Math.sin((frame / fps) * Math.PI * 2) * 0.02 : 1;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: c.goldLight,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Bubble color={c.cream} x={-100} y={-100} size={500} />
      <Bubble color={`${c.gold}20`} x={1400} y={600} size={400} />

      <div style={{ display: "flex", alignItems: "center", gap: 80 }}>
        {/* Big circle badge */}
        <div
          style={{
            width: 520,
            height: 520,
            borderRadius: "50%",
            backgroundColor: c.seafoam,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            opacity: circleSpring,
            transform: `scale(${circleScale * pulse}) rotate(${circleRotate}deg)`,
            boxShadow: `0 20px 60px ${c.seafoam}40`,
          }}
        >
          <div
            style={{
              fontFamily: bodyFont,
              fontSize: 26,
              color: c.white,
              fontWeight: 600,
              letterSpacing: "3px",
              textTransform: "uppercase",
              opacity: 0.8,
            }}
          >
            Only
          </div>
          <div
            style={{
              fontFamily: displayFont,
              fontSize: 200,
              color: c.white,
              lineHeight: 0.9,
            }}
          >
            $18
          </div>
        </div>

        {/* Right side details */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            opacity: textSpring,
          }}
        >
          <div
            style={{
              fontFamily: displayFont,
              fontSize: 110,
              color: c.bark,
              lineHeight: 1.1,
            }}
          >
            Dog
            <br />
            Vaccines
          </div>

          <div
            style={{
              fontFamily: bodyFont,
              fontSize: 34,
              color: c.barkLight,
              marginTop: 20,
              opacity: detailSpring,
              fontWeight: 500,
            }}
          >
            Grand opening special
          </div>

          <div
            style={{
              fontFamily: bodyFont,
              fontSize: 30,
              color: c.seafoam,
              marginTop: 8,
              opacity: detailSpring,
              fontWeight: 600,
            }}
          >
            No hidden fees. Ever.
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 4: Warm CTA
const CtaScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoSpring = spring({ frame, fps, config: { damping: 200 } });
  const btnSpring = spring({ frame, fps, config: { damping: 10, stiffness: 100 }, delay: 10 });
  const subSpring = spring({ frame, fps, config: { damping: 200 }, delay: 22 });

  const btnScale = interpolate(btnSpring, [0, 1], [0.7, 1]);
  const btnRotate = interpolate(btnSpring, [0, 1], [3, 0]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: c.cream,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Bubble color={c.seafoamLight} x={-60} y={-40} size={400} />
      <Bubble color={c.goldLight} x={1400} y={600} size={350} />

      <FloatingPhoto src={photos.goldenRetriever} x={100} y={180} size={170} delay={0} border={c.seafoam} />
      <FloatingPhoto src={photos.cat} x={1600} y={250} size={150} delay={5} border={c.gold} />
      <FloatingPhoto src={photos.pug} x={200} y={750} size={140} delay={10} />

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Img
          src={staticFile("petcare-logo.svg")}
          style={{
            width: 450,
            opacity: logoSpring,
            marginBottom: 40,
          }}
        />

        <div
          style={{
            fontFamily: bodyFont,
            fontSize: 58,
            color: c.white,
            backgroundColor: c.seafoam,
            padding: "30px 80px",
            borderRadius: 60,
            fontWeight: 700,
            opacity: btnSpring,
            transform: `scale(${btnScale}) rotate(${btnRotate}deg)`,
            boxShadow: `0 12px 40px ${c.seafoam}30`,
          }}
        >
          Book Your Visit
        </div>

        <div
          style={{
            fontFamily: bodyFont,
            fontSize: 34,
            color: c.barkLight,
            marginTop: 28,
            opacity: subSpring,
            fontWeight: 500,
          }}
        >
          Tucson&apos;s most affordable vet
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const GrandOpeningPlayful: React.FC = () => {
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
