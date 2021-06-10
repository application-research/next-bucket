import styles from "@components/LoaderSpinner.module.scss";

import * as React from "react";

const LoaderSpinner = (props) => <div className={styles.loader} {...props} />;

export default LoaderSpinner;
