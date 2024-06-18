import { useCallback, useEffect, useRef, useState } from 'react';

export function useFocusOnPlayer() {
  // HTML references to all of the <input /> elements to focus when "Enter" is clicked
  const inputRefs = useRef<HTMLInputElement[]>([]);

  // index of which <input /> element to focus on when a new player needs to be added before focused on
  const [playerIndexToFocusOn, setPlayerIndexToFocusOn] = useState(-1);

  const focusOnInput = useCallback(
    (index: number) => inputRefs.current[index].focus(),
    []
  );

  // used for when we are on the last input and the user clicks "Enter"
  // we need to first add a new <input /> element by updating state
  // and then focusing on the input on the next render
  useEffect(() => {
    if (playerIndexToFocusOn > -1) {
      focusOnInput(playerIndexToFocusOn);
      setPlayerIndexToFocusOn(-1);
    }
  }, [focusOnInput, playerIndexToFocusOn]);

  return {
    inputRefs,
    playerIndexToFocusOn,
    setPlayerIndexToFocusOn,
    focusOnInput,
  };
}
