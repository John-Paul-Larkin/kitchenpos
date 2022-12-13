import styles from "../styles/FloorPlan.module.css";

export default function Floorplan({ setisShowFloorPlan }: { setisShowFloorPlan: React.Dispatch<React.SetStateAction<boolean>> }) {
  return (
    <>
      <div className={styles["floor-plan"]} onClick={() => setisShowFloorPlan((cur) => !cur)}>
        {/*4 seat table */}
        <span className={styles["table-1"]}>
          <svg width="70" height="90">
            <rect width="30" height="30" style={{ fill: "black" }} rx="7" x="15" y="25" />

            <rect width="15" height="10" style={{ fill: "black" }} rx="3" x="35" y="10" />
            <rect width="15" height="10" style={{ fill: "black" }} rx="3" x="10" y="10" />
            <rect width="15" height="10" style={{ fill: "black" }} rx="3" x="35" y="60" />
            <rect width="15" height="10" style={{ fill: "black" }} rx="3" x="10" y="60" />
          </svg>
        </span>

        {/*6 seat table */}
        <span className={styles["table-2"]}>
          <svg width="90" height="90">
            <rect width="65" height="30" style={{ fill: "black" }} rx="7" x="13" y="25" />

            <rect width="15" height="10" style={{ fill: "black" }} rx="3" x="10" y="10" />
            <rect width="17" height="10" style={{ fill: "black" }} rx="3" x="37" y="10" />
            <rect width="15" height="10" style={{ fill: "black" }} rx="3" x="65" y="10" />

            <rect width="15" height="10" style={{ fill: "black" }} rx="3" x="10" y="60" />
            <rect width="17" height="10" style={{ fill: "black" }} rx="3" x="37" y="60" />
            <rect width="15" height="10" style={{ fill: "black" }} rx="3" x="65" y="60" />
          </svg>
        </span>

        {/*2 seat table */}
        <span className={styles["table-3"]}>
          <svg width="50" height="90">
            <rect width="20" height="25" style={{ fill: "black" }} rx="7" x="15" y="25" />

            <rect width="15" height="10" style={{ fill: "black" }} rx="3" x="18" y="10" />
            <rect width="15" height="10" style={{ fill: "black" }} rx="3" x="18" y="55" />
          </svg>
        </span>

        {/*4 seat table */}
        <span className={styles["table-4"]}>
          <svg width="70" height="90">
            <rect width="30" height="30" style={{ fill: "black" }} rx="7" x="15" y="25" />

            <rect width="15" height="10" style={{ fill: "black" }} rx="3" x="35" y="10" />
            <rect width="15" height="10" style={{ fill: "black" }} rx="3" x="10" y="10" />
            <rect width="15" height="10" style={{ fill: "black" }} rx="3" x="35" y="60" />
            <rect width="15" height="10" style={{ fill: "black" }} rx="3" x="10" y="60" />
          </svg>
        </span>

        {/*6 seat table */}
        <span className={styles["table-5"]}>
          <svg width="90" height="90">
            <rect width="65" height="30" style={{ fill: "black" }} rx="7" x="13" y="25" />

            <rect width="15" height="10" style={{ fill: "black" }} rx="3" x="10" y="10" />
            <rect width="17" height="10" style={{ fill: "black" }} rx="3" x="37" y="10" />
            <rect width="15" height="10" style={{ fill: "black" }} rx="3" x="65" y="10" />

            <rect width="15" height="10" style={{ fill: "black" }} rx="3" x="10" y="60" />
            <rect width="17" height="10" style={{ fill: "black" }} rx="3" x="37" y="60" />
            <rect width="15" height="10" style={{ fill: "black" }} rx="3" x="65" y="60" />
          </svg>
        </span>

        {/*2 seat table */}
        <span className={styles["table-6"]}>
          <svg width="50" height="90">
            <rect width="20" height="25" style={{ fill: "black" }} rx="7" x="15" y="25" />

            <rect width="15" height="10" style={{ fill: "black" }} rx="3" x="18" y="10" />
            <rect width="15" height="10" style={{ fill: "black" }} rx="3" x="18" y="55" />
          </svg>
        </span>

        {/*4 seat table */}
        <span className={styles["table-7"]}>
          <svg width="70" height="90">
            <rect width="30" height="30" style={{ fill: "black" }} rx="7" x="15" y="25" />

            <rect width="15" height="10" style={{ fill: "black" }} rx="3" x="35" y="10" />
            <rect width="15" height="10" style={{ fill: "black" }} rx="3" x="10" y="10" />
            <rect width="15" height="10" style={{ fill: "black" }} rx="3" x="35" y="60" />
            <rect width="15" height="10" style={{ fill: "black" }} rx="3" x="10" y="60" />
          </svg>
        </span>

        {/* bar and stools */}
        <span className={styles["bar"]}>
          <svg height="320" width="150">
            <g fill="none" stroke="black" stroke-width="20">
              <path stroke-linecap="round" d="M80 20 80 300" />
              <circle cx="50" cy="50" r="5" stroke="black" stroke-width="10" fill="black" />
              <circle cx="50" cy="90" r="5" stroke="black" stroke-width="10" fill="black" />
              <circle cx="50" cy="130" r="5" stroke="black" stroke-width="10" fill="black" />
              <circle cx="50" cy="170" r="5" stroke="black" stroke-width="10" fill="black" />
              <circle cx="50" cy="210" r="5" stroke="black" stroke-width="10" fill="black" />
              <circle cx="50" cy="250" r="5" stroke="black" stroke-width="10" fill="black" />
            </g>
          </svg>
        </span>

        {/*6 seat table */}
        <span className={styles["table-8"]}>
          <svg width="90" height="90">
            <rect width="65" height="30" style={{ fill: "black" }} rx="7" x="13" y="25" />

            <rect width="15" height="10" style={{ fill: "black" }} rx="3" x="10" y="10" />
            <rect width="17" height="10" style={{ fill: "black" }} rx="3" x="37" y="10" />
            <rect width="15" height="10" style={{ fill: "black" }} rx="3" x="65" y="10" />

            <rect width="15" height="10" style={{ fill: "black" }} rx="3" x="10" y="60" />
            <rect width="17" height="10" style={{ fill: "black" }} rx="3" x="37" y="60" />
            <rect width="15" height="10" style={{ fill: "black" }} rx="3" x="65" y="60" />
          </svg>
        </span>

        {/*4 seat table */}
        <span className={styles["table-9"]}>
          <svg width="70" height="90">
            <rect width="30" height="30" style={{ fill: "black" }} rx="7" x="15" y="25" />

            <rect width="15" height="10" style={{ fill: "black" }} rx="3" x="35" y="10" />
            <rect width="15" height="10" style={{ fill: "black" }} rx="3" x="10" y="10" />
            <rect width="15" height="10" style={{ fill: "black" }} rx="3" x="35" y="60" />
            <rect width="15" height="10" style={{ fill: "black" }} rx="3" x="10" y="60" />
          </svg>
        </span>
        {/*2 seat table */}
        <span className={styles["table-10"]}>
          <svg width="50" height="90">
            <rect width="20" height="25" style={{ fill: "black" }} rx="7" x="15" y="25" />

            <rect width="15" height="10" style={{ fill: "black" }} rx="3" x="18" y="10" />
            <rect width="15" height="10" style={{ fill: "black" }} rx="3" x="18" y="55" />
          </svg>
        </span>

           {/*6 seat table */}
           <span className={styles["table-11"]}>
          <svg width="90" height="90">
            <rect width="65" height="30" style={{ fill: "black" }} rx="7" x="13" y="25" />

            <rect width="15" height="10" style={{ fill: "black" }} rx="3" x="10" y="10" />
            <rect width="17" height="10" style={{ fill: "black" }} rx="3" x="37" y="10" />
            <rect width="15" height="10" style={{ fill: "black" }} rx="3" x="65" y="10" />

            <rect width="15" height="10" style={{ fill: "black" }} rx="3" x="10" y="60" />
            <rect width="17" height="10" style={{ fill: "black" }} rx="3" x="37" y="60" />
            <rect width="15" height="10" style={{ fill: "black" }} rx="3" x="65" y="60" />
          </svg>
        </span>

  
        {/*4 seat table */}
        <span className={styles["table-12"]}>
          <svg width="70" height="90">
            <rect width="30" height="30" style={{ fill: "black" }} rx="7" x="15" y="25" />

            <rect width="15" height="10" style={{ fill: "black" }} rx="3" x="35" y="10" />
            <rect width="15" height="10" style={{ fill: "black" }} rx="3" x="10" y="10" />
            <rect width="15" height="10" style={{ fill: "black" }} rx="3" x="35" y="60" />
            <rect width="15" height="10" style={{ fill: "black" }} rx="3" x="10" y="60" />
          </svg>
        </span>
        {/*4 seat table */}
        <span className={styles["table-13"]}>
          <svg width="70" height="90">
            <rect width="30" height="30" style={{ fill: "black" }} rx="7" x="15" y="25" />

            <rect width="15" height="10" style={{ fill: "black" }} rx="3" x="35" y="10" />
            <rect width="15" height="10" style={{ fill: "black" }} rx="3" x="10" y="10" />
            <rect width="15" height="10" style={{ fill: "black" }} rx="3" x="35" y="60" />
            <rect width="15" height="10" style={{ fill: "black" }} rx="3" x="10" y="60" />
          </svg>
        </span>
    {/*4 seat table */}
    <span className={styles["table-14"]}>
          <svg width="70" height="90">
            <rect width="30" height="30" style={{ fill: "black" }} rx="7" x="15" y="25" />

            <rect width="15" height="10" style={{ fill: "black" }} rx="3" x="35" y="10" />
            <rect width="15" height="10" style={{ fill: "black" }} rx="3" x="10" y="10" />
            <rect width="15" height="10" style={{ fill: "black" }} rx="3" x="35" y="60" />
            <rect width="15" height="10" style={{ fill: "black" }} rx="3" x="10" y="60" />
          </svg>
        </span>

      </div>
      <div className={styles["footer-info"]}>ds</div>
    </>
  );
}
