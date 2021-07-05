import React, { useState } from "react";

const App = () => {
  const [number, setNumber] = useState(0);
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: "100px" }}>{number}</div>
      <button onClick={() => setNumber(number + 1)}>더하기</button>
      <button onClick={() => setNumber(number - 1)}>빼기</button>
    </div>
  );
};

export default App;

