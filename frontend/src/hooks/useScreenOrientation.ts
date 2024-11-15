import { useEffect, useState } from "react";

const getScreenOrientation = () => window.screen.orientation.type;

export function useScreenOrientation() {
  const [orientation, setOrientation] =
    useState<OrientationType>(getScreenOrientation);

  const isLandScape = orientation.includes("landscape");

  const updateOrientation = (_e: unknown) => {
    setOrientation(getScreenOrientation());
  };

  useEffect(() => {
    window.addEventListener("orientationchange", updateOrientation);
    return () => {
      window.removeEventListener("orientationchange", updateOrientation);
    };
  }, []);

  return { orientation, isLandScape };
}
