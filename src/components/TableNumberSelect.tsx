import styles from "../styles/OrderScreen.module.css";

export default function TableNumberSelect({
  tableNumber,
  setTableNumber,
}: {
  tableNumber: string;
  setTableNumber: React.Dispatch<React.SetStateAction<string>>;
}) {
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTableNumber(() => e.target.value);
  };

  return (
    <form>
      <label className={styles['table-number']} htmlFor="cars">Table number:</label>
      <select value={tableNumber} className={styles["table-select"]} onChange={(e) => handleSelectChange(e)}>
        <option value="15">Bar</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
        <option value="11">11</option>
        <option value="12">12</option>
        <option value="13">13</option>
        <option value="14">14</option>
      </select>
    </form>
  );
}
