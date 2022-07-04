import "./outField.css";
import OptionField from "../optionField/OptionField";
import Table from "../table/Table";
import Grafic from "../grafic/Grafic";

export default function OutField({
  now,
  id,
  setId,
  name,
  setName,
  base,
  setBase,
  date,
  setDate,
  check,
  setCheck,
  minDate,
  setMinDate,
  maxDate,
  setMaxDate,
  sortCat,
  setSortCat,
  sortProd,
  setSortProd,
  catDis,
  setCatDis,
  prodDis,
  setProdDis,
  show,
  setShow,
  edit,
  setEdit,
  cost,
  setCost,
  count,
  setCount,
  cat,
  setCat,
  prod,
  setProd,
}) {
  let dates = [];

  switch (check) {
    case "1":
      dates = [now];
      break;
    case "2":
      dates = [date];
      break;
    case "3":
      dates = [...base].map((i) => {
        if (i.date >= minDate && i.date <= maxDate) return i.date;
      });
      break;
    case "4":
      dates = [...base].map((i) => i.date);
      break;
  }

  let listSort = sortBase([...base]);
  listSort = listSort.filter((i) => dates.includes(i.date));
  if (sortCat !== "") {
    listSort = listSort.filter((i) => i.cat === sortCat);
  }
  if (sortProd !== "") {
    listSort = listSort.filter((i) => i.prod === sortProd);
  }

  let view;
  if (show) {
    view = <Grafic listSort={listSort} />;
  } else {
    view = (
      <Table
        listSort={listSort}
        id={id}
        setId={setId}
        name={name}
        setName={setName}
        base={base}
        setBase={setBase}
        date={date}
        setDate={setDate}
        edit={edit}
        setEdit={setEdit}
        cost={cost}
        setCost={setCost}
        count={count}
        setCount={setCount}
        cat={cat}
        setCat={setCat}
        prod={prod}
        setProd={setProd}
      />
    );
  }

  let out = (
    <div className="outfield">
      <OptionField
        base={base}
        setBase={setBase}
        edit={edit}
        setEdit={setEdit}
        date={date}
        setDate={setDate}
        check={check}
        setCheck={setCheck}
        minDate={minDate}
        setMinDate={setMinDate}
        maxDate={maxDate}
        setMaxDate={setMaxDate}
        catDis={catDis}
        setCatDis={setCatDis}
        prodDis={prodDis}
        setProdDis={setProdDis}
        show={show}
        setShow={setShow}
        sortCat={sortCat}
        setSortCat={setSortCat}
        sortProd={sortProd}
        setSortProd={setSortProd}
      />
      {view}
    </div>
  );

  function sortBase(base) {
    return base.sort((a, b) => (a.date >= b.date ? 1 : -1));
  }

  return out;
}
