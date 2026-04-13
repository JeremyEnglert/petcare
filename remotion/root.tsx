import { Composition, Folder } from "remotion";
import { GrandOpening } from "./grand-opening";
import { GrandOpeningBold } from "./variation-bold";
import { GrandOpeningSplit } from "./variation-split";
import { GrandOpeningPlayful } from "./variation-playful";

export const RemotionRoot = () => {
  return (
    <Folder name="Grand-Opening">
      <Composition
        id="A-Warm"
        component={GrandOpening}
        durationInFrames={450}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="B-Bold"
        component={GrandOpeningBold}
        durationInFrames={450}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="C-Split"
        component={GrandOpeningSplit}
        durationInFrames={450}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="D-Playful"
        component={GrandOpeningPlayful}
        durationInFrames={450}
        fps={30}
        width={1920}
        height={1080}
      />
    </Folder>
  );
};
