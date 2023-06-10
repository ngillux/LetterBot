import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [msg, setMsg] = useState("");
  const [name, setName] = useState("");
  const [traits, setTraits] = useState("");
  const [input, setInput] = useState({
    start: "Write a recommendation letter for ",
    name: "",
    traits: ". With the following traits: ",
  });

  const getResponse = async () => {
    const options = {
      method: "POST",
      body: JSON.stringify({
        message: input.start + input.name + input.traits,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log("OpenAI response ...");

    try {
      // make request on our server
      const response = await fetch(
        "http://localhost:8000/completions",
        options
      );
      const data = await response.json();
      console.log(data.choices[0].message.content);
      // setMsg(data);
      // setMsg();
    } catch (err) {
      console.error(err);
    }
  };

  const handleName = (e) => {
    setName(e.target.value);
    setInput((prev) => ({
      ...prev,
      name: name,
    }));
  };

  const handleTraits = (e) => {
    setTraits(e.target.value);
    setInput((prev) => ({
      ...prev,
      traits: traits,
    }));
  };

  console.log(input.start + input.name + input.traits);
  // console.log(
  //   input.start +
  //     " " +
  //     input.name +
  //     ". With the following traits: " +
  //     input.traits +
  //     "."
  // );
  useEffect(() => {}, []);
  return (
    <>
      {/* <button onClick={getResponse}>Get Response</button> */}
      <section className="student-details-container">
        <h1>Student Details</h1>
        <div className="student-details">
          <div className="name">
            <h1>Name</h1>
            <input
              type="text"
              placeholder="type name ..."
              onChange={(e) => {
                handleName(e);
              }}
            />
          </div>
          <div className="traits">
            <h1>Traits</h1>
            <input
              type="text"
              placeholder="type traits ..."
              onChange={(e) => {
                handleTraits(e);
              }}
            />
          </div>
        </div>
        <button className="generate" onClick={getResponse}>
          Generate
        </button>
      </section>
      <section className="response">
        <h1>{msg}</h1>
      </section>
    </>
  );
}

export default App;
