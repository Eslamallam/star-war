import React from "react";
import { injectStyle } from "react-toastify/dist/inject-style";
import { ApolloProvider } from "@apollo/client";
import { client } from "./apolloClient";
import { StarWarCharacters } from "./components/StarWarCharacters";

import "antd/dist/antd.css";

if (typeof window !== "undefined") {
  injectStyle();
}

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <StarWarCharacters />
    </ApolloProvider>
  );
};

export default App;
