import { useState } from "react";
import Login from "./Login";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleRegister() {
    const user = {
      username,
      password,
    };
    const userString = JSON.stringify(user);

    fetch("http://localhost:4001/users", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: userString,
    }).then((res) => document.cookie = `thebank=${res}`);
  }

  return (
    <div className="flex justify-center p-16">
      <div className="flex flex-col bg-pink-200 rounded-lg gap-4 p-8">
        <h2 className="flex justify-center text-2xl font-bold">
          Registrera dig
        </h2>
        <div className="flex flex-col items-center w-auto">
          <label>Användarnamn: </label>
          <input className="p-2"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Example@mail"
          />
          <label>Lösenord: </label>
          <input className="p-2"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="******"
          />
        </div>
        <div className="flex justify-center">
          <button
            className="bg-pink-500 hover:bg-pink-300 rounded-full p-2 w-24"
            onClick={handleRegister}
          >
            Registrera
          </button>
        </div>
      </div>
       <Login />
       </div>
      
  );
}

export default App;