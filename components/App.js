import styles from "~/components/App.module.scss";

import * as React from "react";

export default function App(props) {
  return (
    <div className={styles.app}>
      <div className={styles.left}>{props.sidebar}</div>
      <div className={styles.right}>{props.children}</div>
    </div>
  );
}
