import styles from "@components/Dealbar.module.scss";

import * as React from "react";
import * as U from "@common/utilities";

import Input from "@components/Input";
import Button from "@components/Button";
import LoaderSpinner from "@components/LoaderSpinner";

const DealCard = (props: any): any => {
  const classNames = U.classNames(styles.card, props.status === 5 ? styles.success : null);

  return (
    <div className={classNames}>
      <p className={styles.detail}>
        <strong>
          {props.tag} {U.toDate(props.createdAt)}
        </strong>
      </p>
      {!U.isEmpty(props.failureMsg) ? (
        <p className={styles.error}>failureMsg: {props.failureMsg}</p>
      ) : (
        <p className={styles.detail}>
          {props.status !== 5 ? (
            <strong>this deal has a chance of succeeding! ask the miner for log reports.</strong>
          ) : (
            <strong>SUCCESS! This CID is stored on the Filecoin network.</strong>
          )}
        </p>
      )}
      <p className={styles.detail}>aborted: {String(props.aborted)}</p>
      <p className={styles.detail}>archiveStatus: {props.archiveStatus}</p>
      <p className={styles.detail}>cid: {props.cid}</p>
      <p className={styles.detail}>jobId: {props.jobId}</p>
      <p className={styles.detail}>status: {props.status}</p>
    </div>
  );
};

export default function Dealbar(props: any): any {
  const [formState, setFormState] = React.useState({
    miner: "",
    repFactor: 4,
    dealMinDuration: 525600,
    maxPrice: 0,
  });

  if (props.state.loading) {
    return (
      <div className={styles.sidebar}>
        <LoaderSpinner style={{ height: 48, width: 48 }} />
      </div>
    );
  }

  return (
    <React.Fragment>
      {!props.archives ? (
        <div className={styles.sidebar}>
          <h2>Make a Filecoin storage deal</h2>
          <p>Select a bucket to make a Filecoin storage deal.</p>
        </div>
      ) : (
        <React.Fragment>
          <div className={styles.sidebar}>
            <h2>Make a Filecoin storage deal</h2>
            <p>Make a deal using: {props.archives.bucketName} using your Filecoin address.</p>

            <p style={{ marginTop: 24 }}>
              <strong>Miner</strong>
            </p>
            <p>
              Which miner do you want to target? You can target one specific miner for this deal.
            </p>
            <Input
              name="miner"
              type="text"
              value={formState.miner}
              style={{ marginTop: 16 }}
              placeholder="ex: f0119336"
              onChange={(e) => {
                setFormState({ ...formState, [e.target.name]: e.target.value });
              }}
            />

            <p style={{ marginTop: 24 }}>
              <strong>Default Filecoin replication and availability factor</strong>
            </p>
            <p>How many times should we replicate this deal across your selected miners?</p>
            <Input
              name="repFactor"
              type="number"
              value={formState.repFactor}
              style={{ marginTop: 16 }}
              placeholder="Type in amount of miners"
              onChange={(e) => {
                setFormState({ ...formState, [e.target.name]: e.target.value });
              }}
            />

            <p style={{ marginTop: 24 }}>
              <strong>Default Filecoin deal duration</strong>
            </p>
            <p>Your deal is set for {formState.dealMinDuration / 2880} days</p>
            <Input
              name="dealMinDuration"
              type="number"
              unit="epochs"
              style={{ marginTop: 16 }}
              value={formState.dealMinDuration}
              placeholder="Type in epochs (1 epoch = ~30 seconds)"
              onChange={(e) => {
                setFormState({ ...formState, [e.target.name]: e.target.value });
              }}
            />

            <p style={{ marginTop: 24 }}>
              <strong>Max Filecoin price</strong>
            </p>
            <p>
              Set the maximum Filecoin price you're willing to pay. The current price you have set
              is equivalent to {U.inFIL(formState.maxPrice)}.
            </p>
            <Input
              unit="attoFIL"
              type="number"
              name="maxPrice"
              style={{ marginTop: 16 }}
              value={formState.maxPrice}
              placeholder="Type in amount of Filecoin (attoFIL)"
              onChange={(e) => {
                setFormState({ ...formState, [e.target.name]: e.target.value });
              }}
            />

            <div className={styles.actions}>
              <Button
                loading={props.state.loading}
                onClick={() => {
                  props.onMakeDeal({
                    bucketKey: props.archives.bucketKey,
                    bucketName: props.archives.bucketName,
                    settings: {
                      addr:
                        props.state.addresses && props.state.addresses[0]
                          ? props.state.addresses[0].address
                          : null,
                      excludedMiners: [],
                      trustedMiners: [formState.miner],
                      repFactor: formState.repFactor,
                      dealMinDuration: formState.dealMinDuration,
                      countryCodes: [],
                      maxPrice: formState.maxPrice,
                      renew: null,
                      fastRetrieval: true,
                      dealStartOffset: 8640,
                    },
                  });
                }}
              >
                Make Filecoin storage deal
              </Button>
            </div>
          </div>
        </React.Fragment>
      )}
      {!props.archives ? (
        <div className={styles.bottom}>
          <h2 style={{ marginTop: 24 }}>Bucket archive history</h2>
          <p>Select a bucket to get Filecoin storage history.</p>
        </div>
      ) : (
        <div className={styles.bottom}>
          <h2 style={{ marginTop: 24 }}>Deal history for {props.archives.bucketName}</h2>
          <p>Current deals in queue and history of deals.</p>

          {props.archives.current ? (
            <DealCard {...props.archives.current} tag="[ Current ]" />
          ) : (
            <p style={{ marginTop: 24 }}>No current deals in progress.</p>
          )}

          {props.archives.history.map((h) => {
            return <DealCard {...h} tag="[ History ]" />;
          })}
        </div>
      )}
    </React.Fragment>
  );
}
