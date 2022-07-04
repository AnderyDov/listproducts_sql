import "./App.css";
import OutField from "./outField/OutField";
import FormLog from "./formLog/FormLog";
import Form from "./form/Form";
import { useState } from "react";

export default function App() {
  let now = `${new Date().getFullYear()}-${formate(
    new Date().getMonth() + 1
  )}-${formate(new Date().getDate())}`;

  let [base, setBase] = useState([]);
  let [access, setAccess] = useState(false);
  let [id, setId] = useState("");
  let [name, setName] = useState("");
  let [date, setDate] = useState("");
  let [cat, setCat] = useState("");
  let [prod, setProd] = useState("");
  let [cost, setCost] = useState("");
  let [count, setCount] = useState("");
  let [check, setCheck] = useState("4");
  let [minDate, setMinDate] = useState(now);
  let [maxDate, setMaxDate] = useState(now);
  let [sortCat, setSortCat] = useState("");
  let [sortProd, setSortProd] = useState("");
  let [catDis, setCatDis] = useState(true);
  let [prodDis, setProdDis] = useState(true);
  let [edit, setEdit] = useState(false);
  let [show, setShow] = useState(false);

  let forms;

  if (access) {
    forms = (
      <Form
        id={id}
        setId={setId}
        name={name}
        setName={setName}
        base={base}
        setBase={setBase}
        access={access}
        setAccess={setAccess}
        date={date}
        setDate={setDate}
        edit={edit}
        setEdit={setEdit}
        cat={cat}
        setCat={setCat}
        prod={prod}
        setProd={setProd}
        cost={cost}
        setCost={setCost}
        count={count}
        setCount={setCount}
        check={check}
        setCheck={setCheck}
      />
    );
  } else {
    forms = (
      <FormLog
        access={access}
        setAccess={setAccess}
        name={name}
        setName={setName}
      />
    );
  }

  let out = (
    <div className="App">
      {forms}
      <OutField
        id={id}
        setId={setId}
        name={name}
        setName={setName}
        now={now}
        base={base}
        setBase={setBase}
        check={check}
        setCheck={setCheck}
        date={date}
        setDate={setDate}
        minDate={minDate}
        setMinDate={setMinDate}
        maxDate={maxDate}
        setMaxDate={setMaxDate}
        sortCat={sortCat}
        setSortCat={setSortCat}
        sortProd={sortProd}
        setSortProd={setSortProd}
        catDis={catDis}
        setCatDis={setCatDis}
        prodDis={prodDis}
        setProdDis={setProdDis}
        show={show}
        setShow={setShow}
        edit={edit}
        setEdit={setEdit}
        cat={cat}
        setCat={setCat}
        prod={prod}
        setProd={setProd}
        cost={cost}
        setCost={setCost}
        count={count}
        setCount={setCount}
      />
    </div>
  );

  function formate(num) {
    num = String(num);
    return num.length === 1 ? "0" + num : num;
  }

  return out;
}
