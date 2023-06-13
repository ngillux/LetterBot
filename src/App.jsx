import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [msg, setMsg] = useState("");
  const [name, setName] = useState("");
  const [traits, setTraits] = useState("");
  const [input, setInput] = useState({
    start: "Write a recommendation letter for ",
    name: "",
    traits: [],
  });

  const [check, setCheck] = useState([]);
  const getResponse = async () => {
    let str =
      input.start +
      input.name +
      "With the following traits: " +
      input.traits.toString() +
      ".";
    const options = {
      method: "POST",
      body: JSON.stringify({
        message: str,
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
      setMsg(data.choices[0].message.content);
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

  const handleKey = (k) => {
    if (k.code === "Enter") {
      setCheck((prev) => [...prev, traits]);

      k.target.value = "";
    }
  };
  const handleTraits = (e) => {
    setTraits(e.target.value);

    // console.log(traits);
  };
  useEffect(() => {
    setInput((prev) => ({
      ...prev,
      name: name,
      traits: [...check],
    }));
    // console.log(check);
  }, [traits, name, check]);
  return (
    <>
      {/* <button onClick={getResponse}>Get Response</button> */}
      <section className="student-details-container">
        <div className="student-details">
          <h1>Student Details</h1>
          <h1>Name</h1>
          <input
            type="text"
            placeholder="type name ..."
            onChange={(e) => {
              handleName(e);
            }}
            value={name}
          />

          <h1>Traits</h1>

          <input
            type="text"
            placeholder="type traits ..."
            onChange={(e) => {
              handleTraits(e);
            }}
            onKeyDown={handleKey}
          />
          <span className="info">
            <i class="fa-solid fa-circle-info"></i>Hit enter to add traits.
          </span>
          {check.length >= 0 ? (
            <ul>
              {check.map((trait, index) => {
                return (
                  <li key={index}>
                    <span>{trait}</span>
                  </li>
                );
              })}
            </ul>
          ) : (
            ""
          )}
          <button className="generate" onClick={getResponse}>
            Generate
          </button>
        </div>

        {msg.length > 0 ? <div className="response">{msg}</div> : ""}
      </section>
    </>
  );
}

export default App;
