import { useState } from "react";

import "./App.css";

const getResponse = async () => {
  const options = {
    method: "POST",
    body: JSON.stringify({
      message: "how are you?",
    }),
    headers: {
      "Content-Type": "application/json",
    },
  };
  console.log("OpenAI response ...");

  try {
    // make request on our server
    const response = await fetch("http://localhost:8000/completions", options);
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
};

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <button onClick={getResponse}>Get Response</button>
    </>
  );
}

export default App;
