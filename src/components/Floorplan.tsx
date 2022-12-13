import styles from "../styles/FloorPlan.module.css";

export default function Floorplan({ setisShowFloorPlan }: { setisShowFloorPlan: React.Dispatch<React.SetStateAction<boolean>> }) {
  return (
    <>
      <div className={styles["floor-plan"]} onClick={() => setisShowFloorPlan((cur) => !cur)}>
        {/*4 seat table */}
        <div className={styles["table-container"]}>
          <span className={styles["table-1"]}>
            <span className={`${styles["table-num"]} ${styles["one"]}`}>1</span>
            <svg width="70" height="90">
              <rect width="30" height="30" style={{ fill: "black" }} rx="7" x="15" y="25" />

              <rect width="15" height="10" style={{ fill: "black" }} rx="3" x="35" y="10" />
              <rect width="15" height="10" style={{ fill: "black" }} rx="3" x="10" y="10" />
              <rect width="15" height="10" style={{ fill: "black" }} rx="3" x="35" y="60" />
              <rect width="15" height="10" style={{ fill: "black" }} rx="3" x="10" y="60" />
            </svg>
          </span>
        </div>

        {/*6 seat table */}
        <div className={styles["table-container"]}>
          <span className={styles["table-2"]}>
            <span className={`${styles["table-num"]} ${styles["two"]}`}>2</span>
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
        </div>

        {/*2 seat table */}
        <div className={styles["table-container"]}>
          <span className={styles["table-3"]}>
            <span className={`${styles["table-num"]} ${styles["three"]}`}>3</span>
            <svg width="50" height="90">
              <rect width="20" height="25" style={{ fill: "black" }} rx="7" x="15" y="25" />

              <rect width="15" height="10" style={{ fill: "black" }} rx="3" x="18" y="10" />
              <rect width="15" height="10" style={{ fill: "black" }} rx="3" x="18" y="55" />
            </svg>
          </span>
        </div>

        {/*4 seat table */}
        <div className={styles["table-container"]}>
          <span className={styles["table-4"]}>
            <span className={`${styles["table-num"]} ${styles["four"]}`}>4</span>
            <svg width="70" height="90">
              <rect width="30" height="30" style={{ fill: "black" }} rx="7" x="15" y="25" />

              <rect width="15" height="10" style={{ fill: "black" }} rx="3" x="35" y="10" />
              <rect width="15" height="10" style={{ fill: "black" }} rx="3" x="10" y="10" />
              <rect width="15" height="10" style={{ fill: "black" }} rx="3" x="35" y="60" />
              <rect width="15" height="10" style={{ fill: "black" }} rx="3" x="10" y="60" />
            </svg>
          </span>
        </div>

        {/*6 seat table */}
        <div className={styles["table-container"]}>
          <span className={`${styles["table-num"]} ${styles["five"]}`}>5</span>
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
        </div>

        {/*2 seat table */}
        <div className={styles["table-container"]}>
          <span className={styles["table-6"]}>
            <span className={`${styles["table-num"]} ${styles["six"]}`}>6</span>
            <svg width="50" height="90">
              <rect width="20" height="25" style={{ fill: "black" }} rx="7" x="15" y="25" />

              <rect width="15" height="10" style={{ fill: "black" }} rx="3" x="18" y="10" />
              <rect width="15" height="10" style={{ fill: "black" }} rx="3" x="18" y="55" />
            </svg>
          </span>
        </div>

        {/*4 seat table */}
        <div className={styles["table-container"]}>
          <span className={styles["table-7"]}>
            <span className={`${styles["table-num"]} ${styles["seven"]}`}>7</span>
            <svg width="70" height="90">
              <rect width="30" height="30" style={{ fill: "black" }} rx="7" x="15" y="25" />

              <rect width="15" height="10" style={{ fill: "black" }} rx="3" x="35" y="10" />
              <rect width="15" height="10" style={{ fill: "black" }} rx="3" x="10" y="10" />
              <rect width="15" height="10" style={{ fill: "black" }} rx="3" x="35" y="60" />
              <rect width="15" height="10" style={{ fill: "black" }} rx="3" x="10" y="60" />
            </svg>
          </span>
        </div>

        {/* bar and stools */}

        <span className={styles["bar"]}>
          <svg height="320" width="200">
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
        <div className={styles["table-container"]}>
          <span className={styles["table-8"]}>
            <span className={`${styles["table-num"]} ${styles["eight"]}`}>8</span>
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
        </div>

        {/*4 seat table */}
        <div className={styles["table-container"]}>
          <span className={styles["table-9"]}>
            <span className={`${styles["table-num"]} ${styles["nine"]}`}>9</span>
            <svg width="70" height="90">
              <rect width="30" height="30" style={{ fill: "black" }} rx="7" x="15" y="25" />

              <rect width="15" height="10" style={{ fill: "black" }} rx="3" x="35" y="10" />
              <rect width="15" height="10" style={{ fill: "black" }} rx="3" x="10" y="10" />
              <rect width="15" height="10" style={{ fill: "black" }} rx="3" x="35" y="60" />
              <rect width="15" height="10" style={{ fill: "black" }} rx="3" x="10" y="60" />
            </svg>
          </span>
        </div>

        {/*2 seat table */}
        <div className={styles["table-container"]}>
          <span className={styles["table-10"]}>
            <span className={`${styles["table-num"]} ${styles["ten"]}`}>10</span>
            <svg width="50" height="90">
              <rect width="20" height="25" style={{ fill: "black" }} rx="7" x="15" y="25" />

              <rect width="15" height="10" style={{ fill: "black" }} rx="3" x="18" y="10" />
              <rect width="15" height="10" style={{ fill: "black" }} rx="3" x="18" y="55" />
            </svg>
          </span>
        </div>

        {/*6 seat table */}
        <div className={styles["table-container"]}>
          <span className={styles["table-11"]}>
            <span className={`${styles["table-num"]} ${styles["eleven"]}`}>11</span>
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
        </div>

        {/*4 seat table */}
        <div className={styles["table-container"]}>
          <span className={styles["table-12"]}>
            <span className={`${styles["table-num"]} ${styles["twelve"]}`}>12</span>
            <svg width="70" height="90">
              <rect width="30" height="30" style={{ fill: "black" }} rx="7" x="15" y="25" />

              <rect width="15" height="10" style={{ fill: "black" }} rx="3" x="35" y="10" />
              <rect width="15" height="10" style={{ fill: "black" }} rx="3" x="10" y="10" />
              <rect width="15" height="10" style={{ fill: "black" }} rx="3" x="35" y="60" />
              <rect width="15" height="10" style={{ fill: "black" }} rx="3" x="10" y="60" />
            </svg>
          </span>
        </div>

        {/*4 seat table */}
        <div className={styles["table-container"]}>
          <span className={styles["table-13"]}>
            <span className={`${styles["table-num"]} ${styles["thirteen"]}`}>13</span>
            <svg width="70" height="90">
              <rect width="30" height="30" style={{ fill: "black" }} rx="7" x="15" y="25" />

              <rect width="15" height="10" style={{ fill: "black" }} rx="3" x="35" y="10" />
              <rect width="15" height="10" style={{ fill: "black" }} rx="3" x="10" y="10" />
              <rect width="15" height="10" style={{ fill: "black" }} rx="3" x="35" y="60" />
              <rect width="15" height="10" style={{ fill: "black" }} rx="3" x="10" y="60" />
            </svg>
          </span>
        </div>

        {/*4 seat table */}
        <div className={styles["table-container"]}>
          <span className={styles["table-14"]}>
            <span className={`${styles["table-num"]} ${styles["fourteen"]}`}>14</span>
            <svg width="70" height="90">
              <rect width="30" height="30" style={{ fill: "black" }} rx="7" x="15" y="25" />

              <rect width="15" height="10" style={{ fill: "black" }} rx="3" x="35" y="10" />
              <rect width="15" height="10" style={{ fill: "black" }} rx="3" x="10" y="10" />
              <rect width="15" height="10" style={{ fill: "black" }} rx="3" x="35" y="60" />
              <rect width="15" height="10" style={{ fill: "black" }} rx="3" x="10" y="60" />
            </svg>
          </span>
        </div>
      </div>
      <div className={styles["footer-info"]}>ds</div>
    </>
  );
}
