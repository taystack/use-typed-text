import useTypedTextHook from "./useTypedText";
import defaultOptions from "./config";


// export class UseTypedTextOptionError extends Error {
//   constructor(key, type) { super(`UseTypedText.options[ ${key} ] expected to be of type "${type}"`); }
// }


// TypedText definition:
function UseTypedText() {
  this.defaultOptions = { ...defaultOptions };
  this.options = { ...defaultOptions };
}

UseTypedText.prototype.toString = function() {
  return JSON.stringify(this.options, null, 2);
}

UseTypedText.prototype.setOptions = function(options = {}) {
  this.options = { ...this.defaultOptions, ...options };
}

UseTypedText.prototype.resetOptions = function() {
  this.options = { ...this.defaultOptions };
}

UseTypedText.prototype.getDecoration = function(isCurrentlyTyping) {
  if (isCurrentlyTyping) {
    return [this.options.currentPrompt, this.options.cursor];
  }
  return [this.options.donePrompt, ""];
}

UseTypedText.prototype.getStrokeSpeed = function() {
  if (!this.options.humanElement) return this.options.typeSpeed;
  return rand(this.options.typeSpeed - 50, this.options.typeSpeed + 50);
}

// Your good ol' min max random int method
function rand(min, max) {
  const minValue = parseInt(min);
  const maxValue = parseInt(max);
  return Math.floor(Math.random() * maxValue) + minValue;
}

global.TypedText = global.TypedText || (global.TypedText = new UseTypedText());

// global.TypedText as the default export
export default global.TypedText;

// Named export useTypedText - calls useTypedText internal hook
export function useTypedText(targetValue, onDone) {
  return useTypedTextHook(targetValue, onDone, global.TypedText);
}
