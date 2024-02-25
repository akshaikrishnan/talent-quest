import React, { useEffect, useState } from "react";

interface TabFocusState {
  isFocused: boolean;
  onFocus: () => void;
  onBlur: () => void;
}

const useTabFocus: () => TabFocusState = () => {
  const [isFocused, setIsFocused] = useState(false);

  const onFocus = () => {
    setIsFocused(true);
  };

  const onBlur = () => {
    setIsFocused(false);
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
  };
};

export default useTabFocus;
