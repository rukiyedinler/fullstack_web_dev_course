export default function isEmail(value) {
  var re = /\S+@\S+\.\S+/;
  return re.test(value);
}

export function isNotEmpty(value) {
  return value.trim() !== "";
}

export function hasMinLength(value, minLength) {
  return value.length >= minLength;
}

export function isEquals(value1, value2) {
  return value1 === value2;
}
