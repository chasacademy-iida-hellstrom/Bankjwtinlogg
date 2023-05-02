import { useState } from "react";

let myToken;

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [money, setMoney] = useState("");

//   function handleLogin() {
//     const user = {
//       username,
//       password,
//     };

//     const userString = JSON.stringify(user);

//     fetch("http://localhost:4001/sessions", {
//       method: "POST",
//       mode: "cors",
//       cache: "no-cache",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: userString,
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data);
//         myToken = data.token;
//       });
//   }

function logIn() {
    const user = {
      username,
      password,
    };
    const userString = JSON.stringify(user);

    fetch("http://localhost:4001/sessions", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: userString,
    })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            myToken = data;
            document.cookie = `thebank=${data}`
          });
    
    
  }

  function handleGetAccount() {
    fetch("http://localhost:4001/me/accounts", {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + myToken,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMoney(data.money);
      });
  }

  return (
    <div className="flex justify-center p-8">
      <div className="flex flex-col bg-pink-200 rounded-lg gap-4 p-8">
        <h2 className="flex justify-center font-bold text-2xl">Login</h2>
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
        <div className="flex justify-center gap-2">
          <button
            className="bg-pink-500 hover:bg-pink-300 rounded-full p-2 w-24"
            onClick={logIn}
          >
            Login
          </button>
          
            <button 
            className="bg-pink-500 hover:bg-pink-300 rounded-full p-2 w-24"
            onClick={handleGetAccount}>Visa Saldo</button>
          
        </div>
        <div className="flex justify-center p-8">
          <h2>Saldo: {money}</h2>
        </div>
      </div>
    </div>
  );
}

export default Login;