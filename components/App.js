import styles from "~/components/App.module.scss";

import * as React from "react";

export default function App(props) {
  return (
    <React.Fragment>
      <div className={styles.top}>➟ next-daemon-buckets 0.0.1 ➟ example application</div>
      <div className={styles.app}>
        <div className={styles.left}>{props.sidebar}</div>
        <div className={styles.right}>{props.children}</div>
      </div>
    </React.Fragment>
  );
}
