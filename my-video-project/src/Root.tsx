import "./index.css";
import { MyComposition } from "./Composition";
import { LifeIn24Hours } from "./LifeIn24Hours";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <MyComposition />
      <LifeIn24Hours />
    </>
  );
};
