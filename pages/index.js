import * as React from "react";

import App from "~/components/App";

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

  return <App>Hello World</App>;
}

Home.getInitialProps = async (ctx) => {
  return { animal: process.env.ANIMAL };
};

export default Home;
