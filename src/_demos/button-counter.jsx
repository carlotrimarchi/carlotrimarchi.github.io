// src/_demos/button-counter.jsx
import { useState } from "react";
import { createRoot } from "react-dom/client";

function ButtonCounter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
}

const container = document.getElementById("demo-button-counter");
createRoot(container).render(<ButtonCounter />);