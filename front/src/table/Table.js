import "./table.css";

export default function Table({
  listSort,
  base,
  setBase,
  id,
  setId,
  name,
  setName,
  date,
  setDate,
  cat,
  setCat,
  prod,
  setProd,
  cost,
  setCost,
  count,
  setCount,
  edit,
  setEdit,
}) {
  let sumAll = 0;

  let rows = [...listSort].map((item) => {
    sumAll += item.cost * item.count;
    return (
      <tr key={item.id} id={item.id}>
        <td>{item.date}</td>
        <td>{item.cat}</td>
        <td>{item.prod}</td>
        <td>{item.cost}</td>
        <td>{item.count}</td>
        <td>{item.count * item.cost}</td>
        <td>
          <button onClick={(e) => handlerEdit(e)}>изменить</button>
        </td>
        <td>
          <button id={item.id} onClick={(e) => handlerDel(e)}>
            удалить
          </button>
        </td>
      </tr>
    );
  });

  let out = (
    <div>
      <table>
        <tbody>
          <tr>
            <th>Дата</th>
            <th>Категория</th>
            <th>Название</th>
            <th>Цена</th>
            <th>Колличество</th>
            <th>Сумма</th>
            <th>Изменение</th>
            <th>Удаление</th>
          </tr>
          {rows}
        </tbody>
      </table>
      <div>Общая стоимость: {sumAll}</div>
    </div>
  );

  function handlerEdit(e) {
    setEdit(true);
    let t = e.target.parentElement.parentElement;
    setId(t.id);
    setDate(t.children[0].innerHTML);
    setCat(t.children[1].innerHTML);
    setProd(t.children[2].innerHTML);
    setCost(t.children[3].innerHTML);
    setCount(t.children[4].innerHTML);
  }

  function handlerDel(e) {
    fetch("/del", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json",
      },
      body: JSON.stringify({
        id: e.target.parentElement.parentElement.id,
        name: name,
      }),
    })
      .then((res) => res.json())
      .then((res) => setBase(res));
  }

  return out;
}
