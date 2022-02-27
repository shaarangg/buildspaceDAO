import { ThirdwebSDK } from "@3rdweb/sdk";
import ethers from "ethers";

import dotenv from "dotenv";
dotenv.config();

if (!process.env.PRIVATE_KEY || process.env.PRIVATE_KEY == "")
	console.log("🛑 Private key not found.");
if (!process.env.ALCHEMY_API_URL || process.env.ALCHEMY_API_URL == "")
	console.log("🛑 Alchemy api url not found.");
if (!process.env.WALLET_ADDRESS || process.env.WALLET_ADDRESS == "")
	console.log("🛑 Wallet Address not found.");

// Here we're initializing 3rd web sdk and are passing the private key of our wallet and provider url
// It's similar like initializing a connection to database
const sdk = new ThirdwebSDK(
	new ethers.Wallet(process.env.PRIVATE_KEY, ethers.getDefaultProvider(process.env.ALCHEMY_API_URL))
);

(async () => {
	try {
		const apps = await sdk.getApps();
		console.log("Your app address is:", apps[0].address);
	} catch (err) {
		console.log("Failed to get apps from the sdk", err);
		process.exit(1);
	}
})();
export default sdk;
