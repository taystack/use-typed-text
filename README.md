# @taystack/use-typed-text

> React 16.8 hook to make it look like someone is typing

![UseTypedText](https://github.com/taystack/use-typed-text/blob/master/logo.png?raw=true)[![NPM](https://img.shields.io/npm/v/@taystack/use-typed-text.svg)](https://www.npmjs.com/package/@taystack/use-typed-text) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @taystack/use-typed-text
```

## Usage

```jsx
import React from "react"

import { useTypedText } from "@taystack/use-typed-text"

const Example = () => {
  const [text, setText] = useTypedText();

  useEffect(() => {
    setText("hello world");
  }, []);

  return (<div>{text}</div>);
}
```

## License

MIT © [taystack](https://github.com/taystack)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
