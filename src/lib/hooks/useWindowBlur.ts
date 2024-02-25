import React, { useEffect, useState } from "react";

interface TabFocusState {
  isFocused: boolean;
  onFocus: () => void;
  onBlur: () => void;
  blurCount: number;
}

const useTabFocus: () => TabFocusState = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [blurCount, setBlurCount] = useState(0);

  const onFocus = () => {
    setIsFocused(true);
  };

  const onBlur = () => {
    setIsFocused(false);
    setBlurCount((prevCount) => prevCount + 1);
  };

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        onFocus();
      } else {
        onBlur();
      }
    };

    const handleFocus = () => onFocus();
    const handleBlur = () => onBlur();

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleBlur);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("blur", handleBlur);
    };
  }, []);

  return {
    isFocused,
    onFocus,
    onBlur,
    blurCount,
  };
};

export default useTabFocus;
