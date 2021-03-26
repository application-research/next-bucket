import * as React from "react";
import * as R from "~/common/requests";

import App from "~/components/App";
import Sidebar from "~/components/Sidebar";
import Content from "~/components/Content";

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
            const next = { ...state, token: null, key: token, loading: true };
            setState(next);
            await R.onListBuckets(next, setState);
          }}
          onGenerateToken={async () => {
            setState({ ...state, loading: true });
            await R.onGenerateToken(state, setState);
          }}
        />
      }
    >
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
        onAddFile={async (options) => {
          // setState({ ...state, loading: true });
          await R.onAddFile(state, setState, options);
        }}
        onMakeFilecoinStorageDeal={async (options) => {
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
