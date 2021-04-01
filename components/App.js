import styles from "~/components/App.module.scss";
import pkg from "~/package.json";

import * as React from "react";

export default function App(props) {
  return (
    <React.Fragment>
      <div className={styles.top}>➝ next-buckets {pkg.version}</div>
      <div className={styles.app}>
        <div className={styles.left}>{props.sidebar}</div>
        <div className={styles.right}>{props.children}</div>
      </div>
    </React.Fragment>
  );
}
