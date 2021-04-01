import * as React from "react";
import * as R from "~/common/requests";

import App from "~/components/App";
import Sidebar from "~/components/Sidebar";
import Content from "~/components/Content";

const HiddenFileInput = (props) => (
  <input
    style={{ position: "absolute", top: 0, left: 0, height: 1, width: 1, opacity: 0 }}
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
  const [state, setState] = React.useState({});
  console.log({ state, props });

  React.useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api");
      const json = await response.json();
      console.log(json);
    }
    fetchData();
  }, []);

  return (
    <App
      sidebar={
        <Sidebar
          gateway={props.gateway}
          state={state}
          onChange={setState}
          onSetToken={async (token) => {
            let next = { ...state, token: null, key: token, loading: true };
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
    >
      <HiddenFileInput
        onChange={async (e) => {
          console.log("on add file");
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
        onMakeStorageDeal={async (options) => {
          // setState({ ...state, loading: true });
          await R.onMakeStorageDeal(state, setState, options);
        }}
      />
    </App>
  );
}

Home.getInitialProps = async (ctx) => {
  return { gateway: process.env.IPFS_GATEWAY };
};

export default Home;
