import { useState, useEffect, useMemo } from "react";


// Export the hook
export default function useTypedText(targetValue = "", onDone = () => {}, TypedText = false) {
  // Track the currently typed value
  const [value, setValue] = useState("");
  // Track the value we want to type to
  const [typeTo, setTypeTo] = useState(targetValue);
  // Track the timeout id for clean-up on unmount
  const [tOut, setTOut] = useState();

  // Clean-up the timeout trackers, prevent unmounting errors
  function unload() {
    setTOut(clearTimeout(tOut));
  }

  useEffect(() => {
    // target value has been unset
    if (typeTo.length === 0) {
      // Point the value at an empty string
      setValue("");
      // Hot-wire an unload,
      unload();
      // Immediately return
      return;
    }

    // Not started typing yet...
    // if (value.length === 0) {
    // }
    // Add a letter to the printed substring
    const newString = typeTo.substring(0, value.length + 1);
    // Note the type speed for this keystroke
    const speed = (TypedText && TypedText.getStrokeSpeed()) || 50;
    // Store the timeout for unloading
    setTOut(setTimeout(() => {
      // Print the letter after the timeout
      setValue(newString);
      // Unload the async timeout
      unload();
    }, speed));

    // Clean up after ourselves
    return () => { unload(); }
  }, [typeTo, value]);

  // When we unmount...
  useEffect(() => {
    return () => { unload() };
  }, []);

  // Memoize the prompt/cursor for the return value when the timeout changes
  // Tiny optimization only noticed when spaces are skipped. But an inch is an inch amirite
  const [prompt, cursor] = useMemo(() => {
    if (TypedText && TypedText.getDecoration) return TypedText.getDecoration(typeTo.length && tOut);
    return ["", ""];
  }, [tOut, typeTo]);

  // Return the typed value and the setter for triggering the typing
  return [
    `${prompt}${value}${cursor}`,
    setTypeTo,
  ];
}
