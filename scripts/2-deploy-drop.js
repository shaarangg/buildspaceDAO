import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const app = sdk.getAppModule(process.env.APP_ADDRESS);
// Initializing our ERC115 contract and giving it some meta data.
(async () => {
	try {
		const bundleDropModule = await app.deployBundleDropModule({
			name: "BalconyBoizDAO Membership",
			description: "A DAO for the boiss",
			image: readFileSync("scripts/assets/pp.jpeg"),
			primarySaleRecipientAddress: ethers.constants.AddressZero,
		});
		console.log("✅ Successfully deployed bundleDrop module, address:", bundleDropModule.address);
		console.log("✅ Bundle Drop Metadata", await bundleDropModule.getMetadata());
	} catch (e) {
		console.log("Failed to deploy BundleDrop module", e);
	}
})();
