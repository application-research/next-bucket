import styles from "~/components/Content.module.scss";

import * as React from "react";
import * as U from "~/common/utilities";

import Input from "~/components/Input";
import Button from "~/components/Button";

export default function Content(props) {
  return (
    <div className={styles.content}>
      {U.isEmpty(props.state.key) ? (
        <React.Fragment>
          <h2>Use a token</h2>
          <p>
            Generate or use an existing private key to try out the features of this application.
          </p>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <h2>Your buckets</h2>
          <p>All of your buckets that you have created will appear here.</p>
          <br />
          <table className={styles.table}>
            <tbody>
              <tr className={styles.row}>
                <th className={styles.heading}>Name</th>
                <th className={styles.heading}>Size</th>
                <th className={styles.heading}>Path</th>
              </tr>
              {props.state.buckets &&
                props.state.buckets.map((b) => {
                  console.log(b);
                  const url = `${props.gateway}${b.path}`;
                  return (
                    <tr key={b.path} className={styles.row}>
                      <td className={styles.cell}>{b.name}</td>
                      <td className={styles.cell}>{U.bytesToSize(b.bucketSize)}</td>
                      <td className={styles.cell}>
                        <a href={url} target="_blank">
                          {url}
                        </a>{" "}
                        {b.name !== "data" ? (
                          <span
                            className={styles.delete}
                            onClick={() =>
                              props.onDeleteBucket({ bucketName: b.name, bucketKey: b.key })
                            }
                          >
                            (delete)
                          </span>
                        ) : null}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>

          <div className={styles.actions}>
            <Button
              loading={props.state.loading}
              onClick={props.onListBuckets}
              style={{ marginRight: 16 }}
            >
              List
            </Button>
            <Button onClick={props.onCreateBucket} loading={props.state.loading}>
              Create
            </Button>
          </div>
        </React.Fragment>
      )}
    </div>
  );
}
