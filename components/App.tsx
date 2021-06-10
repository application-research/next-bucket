import styles from "@components/App.module.scss";
import pkg from "@root/package.json";

import * as React from "react";

export default function App(props) {
  return (
    <React.Fragment>
      <div className={styles.top}>
        <p>➝ next-buckets {pkg.version}</p>
        {props.topRight}
      </div>
      <div className={styles.app}>
        <div className={styles.left}>{props.sidebar}</div>
        <div className={styles.middle}>{props.children}</div>
        {props.right ? <div className={styles.right}>{props.right}</div> : null}
      </div>
    </React.Fragment>
  );
}
