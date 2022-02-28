import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const bundleDrop = sdk.getBundleDropModule(process.env.BUNDLEDROP_MODULE_ADDRESS);
// Here we're accessing our ERC115 contract and then actually setting the actual NFT metadata
(async () => {
	try {
		await bundleDrop.createBatch([
			{
				name: "The Bois",
				descriptions:
					"If you have the thing, that is precious to the bois, then and then only you can become a member",
				image: readFileSync("scripts/assets/pp.jpeg"),
			},
		]);
		console.log("✅ Successfully created a new NFT in the drop");
	} catch (e) {
		console.error("failed to create the new NFT", error);
	}
})();
