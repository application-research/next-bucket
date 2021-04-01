import styles from "~/components/Sidebar.module.scss";

import * as React from "react";
import * as U from "~/common/utilities";

import Input from "~/components/Input";
import Button from "~/components/Button";

export default function Sidebar(props) {
  return (
    <div className={styles.sidebar}>
      <h1>next-bucket</h1>
      <p>
        An example template application for <b>[ Textile ]</b> buckets.{" "}
        <a href="https://github.com/application-research/next-daemon-bucket" target="_blank">
          (view source)
        </a>
        .
        <br />
        <br />
        This application does not use a database and does not track data.
      </p>

      {U.isEmpty(props.state.key) ? (
        <React.Fragment>
          <h2 style={{ marginTop: 48 }}>Create or set token</h2>
          <p>
            In the input field below, either add your own{" "}
            <a href="https://textileio.github.io/js-textile/docs/hub.privatekey" target="_blank">
              private key
            </a>{" "}
            or we can generate one for you. Please keep your key safe since this application will
            lose its state on browser refresh.
          </p>
          <Input
            style={{ marginTop: 16 }}
            name="token"
            value={props.state.token}
            onChange={(e) => {
              return props.onChange({ ...props.state, [e.target.name]: e.target.value });
            }}
            placeholder="libp2p token"
          />

          <div className={styles.actions}>
            <Button
              loading={props.state.loading}
              style={{ marginRight: 16 }}
              onClick={props.onGenerateToken}
            >
              Generate
            </Button>
            <Button
              loading={props.state.loading}
              onClick={() => props.onSetToken(props.state.token)}
            >
              Use
            </Button>
          </div>
        </React.Fragment>
      ) : null}

      {U.isEmpty(props.state.key) ? null : (
        <React.Fragment>
          <h2 style={{ marginTop: 48 }}>Current user</h2>
          <p>
            You are currently accessing Textile buckets with your key{" "}
            <strong className={styles.dark}>{props.state.key}</strong>
            <br />
            <br />
            Generally, you never want to expose your private key to the public, you never want to
            expose it on the client (like it is here), and you should only expose it on the server
            with proper access control considerations. You have been warned.
          </p>
          <div className={styles.actions}>
            <Button
              onClick={() => {
                const confirm = window.confirm(
                  "Are you sure, you will lose your key unless you have it saved somewhere else."
                );

                if (!confirm) {
                  return;
                }
                props.onChange({ ...props.state, token: null, key: null, buckets: [] });
              }}
            >
              Reset and delete
            </Button>
          </div>
        </React.Fragment>
      )}
    </div>
  );
}
