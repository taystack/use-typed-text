import React, { useRef, useState, } from "react";
import UseTypedText, { useTypedText } from "@taystack/use-typed-text";


const App = () => {
  const [ focused, setFocus ] = useState(true);
  const optionRef = useRef();
  const userText = useRef();

  const [prettyValue, setValue] = useTypedText("");

  function handleTypeIt(event) {
    event.preventDefault();
    event.stopPropagation();
    setValue("");
    setTimeout(() => {
      setValue(userText.current.value);
    }, 0);
  }

  function handleOptionChange() {
    try {
      const options = JSON.parse(optionRef.current.value);
      UseTypedText.setOptions(options);
    } catch(e) {
    }
  }

  function handleReset() {
    UseTypedText.resetOptions();
    optionRef.current.value = JSON.stringify(UseTypedText.options, null, 2);
  }

  return (
    <div style={{
      maxWidth: "50vw",
      width: "100vw",
      margin: "0 auto",
      display: "block",
    }}>
      <h1>@taystack/use-typed-text</h1>
      <p>React 16.8 hook. Use the returned setter method to kick-off key-stroke-like UX.</p>
      <p>Change the text below if you want</p>
      <form className={`InputWrap ${focused ? "focused" : ""}`} onSubmit={handleTypeIt} style={{ display: "flex" }}>
        <input
          autoFocus
          id="user-input"
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          defaultValue="Hit enter to start the typing"
          ref={userText}
        />
        <button><span>Enter</span></button>
      </form>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 20, marginBottom: 10, }}>
        <label style={{ marginLeft: 10, display: "block" }} htmlFor="options">Options:</label>
        <button onClick={handleReset}><span style={{ color: "#eee", borderColor: "#eee" }}>Reset</span></button>
      </div>
      <textarea ref={optionRef} id="options" defaultValue={UseTypedText.toString()} onChange={handleOptionChange} />

      <code style={{ marginTop: 40, display: "block", }}>{prettyValue}</code>
    </div>
  );
}
export default App
