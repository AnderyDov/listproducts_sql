import { useState } from "react";
import "./formLog.css";

export default function FormLog({ name, setName, access, setAccess }) {
  let [auth, setAuth] = useState(false);
  let [pass, setPass] = useState("");
  let [errLogin, setErrLogin] = useState("");
  let [errReg, setErrReg] = useState("");

  let out;

  if (auth) {
    out = (
      <div className="form">
        <fieldset>
          <legend>Вход по паролю</legend>
          <p>
            <input
              type="text"
              placeholder="введите имя"
              value={name}
              onInput={(e) => setName(e.target.value.trim())}
            />
          </p>
          <p>
            <input
              type="password"
              placeholder="введите пароль"
              value={pass}
              onInput={(e) => setPass(e.target.value.trim())}
            />
          </p>
          <span className="err">{errLogin}</span>

          <p>
            <button onClick={handlerLog}>войти</button>
          </p>
          <p>
            <button onClick={handlerAuth}>к регистрации</button>
          </p>
        </fieldset>
      </div>
    );
  } else {
    out = (
      <div className="form">
        <fieldset>
          <legend>Регистрация</legend>
          <p>
            <input
              type="text"
              placeholder="введите имя"
              value={name}
              onInput={(e) => setName(e.target.value.trim())}
            />
          </p>
          <p>
            <input
              type="password"
              placeholder="введите пароль"
              value={pass}
              onInput={(e) => setPass(e.target.value.trim())}
            />
          </p>
          <p>
            <span className="err">{errReg}</span>
          </p>
          {/* <p>
        <input type="password" placeholder="повторите пароль" onCfng />
      </p> */}
          <p>
            <button onClick={handlerReg}>зарегестрироваться</button>
          </p>
          <p>
            <button onClick={handlerAuth}>вход по паролю</button>
          </p>
        </fieldset>
      </div>
    );
  }

  function handlerReg() {
    fetch("/registration", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: name,
        pass: pass,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res === "этот логин занят") {
          setErrReg("этот логин занят");
        } else if (res === "пароль минимум три символа") {
          setErrReg("пароль минимум три символа");
        } else if (res === "логин минимум три символа") {
          setErrReg("логин минимум три символа");
        } else if (res === "все поля надо заполнить") {
          setErrReg("все поля надо заполнить");
        } else if (res === "OK") {
          setAccess(true);
        } else {
          setErrLogin("что то пошло не так");
        }
      });
  }

  function handlerLog() {
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: name,
        pass: pass,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res === "неверный пароль") {
          setErrLogin("неверный пароль");
        } else if (res === "все поля надо заполнить") {
          setErrLogin("все поля надо заполнить");
        } else if (res === "нет такого юзера") {
          setErrLogin("нет такого юзера");
        } else if (res === "OK") {
          setAccess(true);
        } else {
          setErrLogin("что то пошло не так");
        }
      });
  }

  function handlerAuth() {
    setAuth(!auth);
    setErrLogin("");
    setErrReg("");
  }

  return out;
}
