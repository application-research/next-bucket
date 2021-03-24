import * as React from "react";

import App from "~/components/App";
import Sidebar from "~/components/Sidebar";

function Home(props) {
  console.log(props);

  React.useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api");
      const json = await response.json();
      console.log(json);
    }
    fetchData();
  }, []);

  return (
    <App sidebar={<Sidebar />}>
      <video controls loop width="480px">
        <source
          src={`${props.gateway}/QmVHhLqYe6Pt8RFs9Dr9hwhzhkAr7RgZa8aeDPCYNUvmfC/nft.mp4`}
          type="video/mp4"
        />
      </video>
    </App>
  );
}

Home.getInitialProps = async (ctx) => {
  return { gateway: process.env.IPFS_GATEWAY };
};

export default Home;
