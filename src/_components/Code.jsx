import React from "react";

export default function Code({ children, language = "js" }) {
  return (
    <pre className={`language-${language}`}>
      <code className={`language-${language}`}>{children}</code>
    </pre>
  );
}
