import Select from "react-select";
import styles from "../styles/OrderScreen.module.css";

// interface opt {
//   value: number;
//   label: string;
// }
// const selectOptions: opt[] = [
//   { value: 1, label: "1" },
//   { value: 2, label: "2" },
//   { value: 3, label: "3" },
//   { value: 4, label: "4" },
//   { value: 5, label: "5" },
// ];

// export default function TableNumberSelect() {
//   const [selectVal, setSelectVal] = useState<opt | null>({ value: 1, label: "1" });

//   console.log(selectVal);
//   return (
//     <>
//       <span> Table Number:</span>
//       <Select
//         className={styles["table-select"]}
//         options={selectOptions}
//         value={selectVal}
//         onChange={(option) => setSelectVal(option)}
//         instanceId="table select"
//       />
//     </>
//   );
// }

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
      <label htmlFor="cars">Table number:</label>
      <select value={tableNumber} className={styles["table-select"]} onChange={(e) => handleSelectChange(e)}>
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
        <option value="15">15</option>
      </select>
      {/* <input type="submit" value="Submit"/> */}
    </form>
  );
}
