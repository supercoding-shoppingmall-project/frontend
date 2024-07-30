// utils/classNames.js
export default function ClassNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
