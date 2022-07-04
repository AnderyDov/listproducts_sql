import "./form.css";
import { useEffect, useState } from "react";

export default function Form({
  id,
  setId,
  name,
  setName,
  base,
  setBase,
  access,
  setAccess,
  date,
  setDate,
  edit,
  setEdit,
  cat,
  setCat,
  prod,
  setProd,
  cost,
  setCost,
  count,
  setCount,
  check,
  setCheck,
}) {
  let [errField, setErrField] = useState("");

  let button;

  if (edit) {
    button = (
      <button data-but="save" onClick={(e) => handlerAddSave(e)}>
        сохранить изменения
      </button>
    );
  } else {
    button = (
      <button data-but="add" onClick={(e) => handlerAddSave(e)}>
        добавить запись
      </button>
    );
  }

  let out = (
    <div className="form">
      <fieldset>
        <legend>{edit ? "Изменить запись" : "Добавить запись"}</legend>
        <p>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </p>
        <p>
          <input
            type="text"
            value={cat}
            onChange={(e) => setCat(e.target.value)}
          />
        </p>
        <p>
          <input
            type="text"
            value={prod}
            onChange={(e) => setProd(e.target.value)}
          />
        </p>
        <p>
          <input
            type="number"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
          />
        </p>
        <p>
          <input
            type="number"
            value={count}
            onChange={(e) => setCount(e.target.value)}
          />
        </p>
        <p>{button}</p>
        <p>
          <button onClick={handlerOut}>выход</button>
        </p>
        <p className="err">{errField}</p>
      </fieldset>
    </div>
  );

  useEffect(() => {
    fetch("/base", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: name,
      }),
    })
      .then((res) => res.json())
      .then((res) => setBase(res));
  }, []);

  function handlerOut() {
    setId("");
    setDate("");
    setAccess(false);
    setCat("");
    setProd("");
    setCost("");
    setCount("");
    setBase([]);
    setEdit(false);
  }

  function handlerAddSave(e) {
    let url = `/${e.target.dataset.but}`;
    if (
      date !== "" &&
      cat !== "" &&
      prod !== "" &&
      cost !== "" &&
      count !== ""
    ) {
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          Accept: "application/json",
        },
        body: JSON.stringify({
          id: id,
          name: name,
          date: date,
          cat: cat,
          prod: prod,
          cost: cost,
          count: count,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          setErrField("");
          setEdit(false);
          setId("");
          setDate("");
          setCat("");
          setProd("");
          setCost("");
          setCount("");
          setCheck("4");
          setBase(res);
        });
    } else {
      setErrField("все поля надо заполнить");
    }
  }

  return out;
}
