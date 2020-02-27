import React, { useRef, useState, } from "react";
import UseTypedText from "@taystack/use-typed-text";


const InputWrap = (props) => {
  const [focused, setFocus] = useState(false);

  return (
    <form className={`InputWrap ${focused ? "focused" : ""}`} onSubmit={handleTypeIt} style={{ display: "flex" }}>
      <input
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        {...props}
      />
      <button><span>Enter</span></button>
    </form>
  );
}

export default InputWrap
