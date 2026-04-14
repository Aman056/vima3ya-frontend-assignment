import { useEffect } from "react";

export default function FormObserver({ values, onFormComplete }) {
  useEffect(() => {
    const isValid = Object.values(values).every((v) => v);
    if (isValid) {
      onFormComplete();
    }
  }, [values]);

  return null;
}