import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App.jsx";
import { ThirdwebWeb3Provider } from "@3rdweb/hooks";
// Render the App component to the DOM
//  Chains that I want to support, 4 is for Rinkeby can include more
const supportedChainIds = [4];
// This tells which type of wallet I want to include, I'm using metamask here which is an injected wallet
const connectors = {
	injected: {},
};
ReactDOM.render(
	<React.StrictMode>
		<ThirdwebWeb3Provider connectors={connectors} supportedChainIds={supportedChainIds}>
			<App />
		</ThirdwebWeb3Provider>
	</React.StrictMode>,
	document.getElementById("root")
);
