import * as React from "react";
import * as R from "@common/requests";

import App from "@components/App";
import Sidebar from "@components/Sidebar";
import Content from "@components/Content";
import Dealbar from "@components/Dealbar";
import Metamask from "@components/Metamask";

const HiddenFileInput = (props) => (
  <input
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      height: 1,
      width: 1,
      opacity: 0,
    }}
    multiple
    type="file"
    id="file"
    onChange={props.onChange}
  />
);

function onSetLoading(state, setState) {
  return setState({ ...state, loading: true });
}

function Home(props) {
  const [state, setState] = React.useState({
    selectedArchives: null,
    selectedBucketKey: null,
    addresses: null,
    buckets: null,
    token: null,
    loading: false,
    key: null,
  });

  React.useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api");
      const json = await response.json();
    }

    fetchData();
  }, []);

  const rightElement = (
    <Dealbar
      state={state}
      archives={state.selectedArchives}
      onMakeDeal={async (deal) => {
        setState({ ...state, loading: true });
        const response = await R.onMakeStorageDeal(state, setState, deal);
        if (response.error) {
          alert(response.error);
          return;
        }

        alert("SUCCESS, use hub buck archive list --thread to track progress.");
      }}
    />
  );

  return (
    <App
      topRight={<Metamask />}
      sidebar={
        <Sidebar
          gateway={props.gateway}
          state={state}
          onChange={setState}
          onSetToken={async (token) => {
            let next = {
              ...state,
              addresses: [],
              buckets: [],
              token: null,
              key: token,
              loading: true,
              selectedArchives: null,
            };
            setState(next);

            const response = await R.onGetFilecoinAddresses(next, setState);
            if (response.addresses) {
              next = { ...next, addresses: response.addresses };
            }

            await R.onListBuckets(next, setState);
          }}
          onGenerateToken={async () => {
            setState({ ...state, loading: true });
            await R.onGenerateToken(state, setState);
          }}
        />
      }
      right={rightElement}
    >
      <HiddenFileInput
        onChange={async (e) => {
          e.persist();

          const next = { ...state, loading: true };
          setState(next);

          let file = e.target.files[0];
          let data = new FormData();
          data.append("data", file);

          return await R.onAddFile(next, setState, data);
        }}
      />
      <Content
        gateway={props.gateway}
        state={state}
        onChange={setState}
        onSelectBucket={({ bucketKey }) => {
          setState({ ...state, selectedBucketKey: bucketKey });
        }}
        onListBuckets={async () => {
          setState({ ...state, loading: true });
          await R.onListBuckets(state, setState);
        }}
        onCreateBucket={async () => {
          setState({ ...state, loading: true });
          await R.onCreateBucket(state, setState);
        }}
        onDeleteBucket={async (options) => {
          setState({ ...state, loading: true });
          await R.onDeleteBucket(state, setState, options);
        }}
        onGetArchivesForBucket={async (options) => {
          setState({ ...state, loading: true });
          await R.onGetArchivesForBucket(state, setState, options);
        }}
      />
    </App>
  );
}

Home.getInitialProps = async (ctx) => {
  return { gateway: process.env.IPFS_GATEWAY };
};

export default Home;
