import { useWeb3 } from "@3rdweb/hooks";
import { ThirdwebSDK } from "@3rdweb/sdk";
import { useEffect, useState } from "react";

const sdk = new ThirdwebSDK("rinkeby");

const bundleDropModule = sdk.getBundleDropModule("0x2439559F1DB105120D4686B8A97024AF4066d72e");

const App = () => {
	const { connectWallet, address, error, provider } = useWeb3();
	console.log("👋 Address:", address);
	// Signer is required to write transactions on block chain, without it we can only read transactions
	const signer = provider ? provider.getSigner() : undefined;
	const [hasClaimedNFT, setHasClaimedNFT] = useState(false);
	const [isClaiming, setIsClaiming] = useState(false);

	const mintNFT = async () => {
		setIsClaiming(true);
		try {
			await bundleDropModule.claim("0", "1");
			setHasClaimedNFT(true);
			console.log(
				`🌊 Successfully Minted! Check it out on OpenSea: https://testnets.opensea.io/assets/${bundleDropModule.address}/0`
			);
		} catch (e) {
			console.error("failed to claim", e);
		} finally {
			setIsClaiming(false);
		}
	};

	useEffect(() => {
		sdk.setProviderOrSigner(signer);
	}, [signer]);

	useEffect(() => {
		const checkClaim = async () => {
			if (!address) return;
			const balance = await bundleDropModule.balanceOf(address, "0");
			try {
				if (balance.gt("0")) {
					setHasClaimedNFT(true);
					console.log(
						`🌟 this user has a membership NFT! https://testnets.opensea.io/assets/${bundleDropModule.address}/0`
					);
				} else {
					setHasClaimedNFT(false);
					console.log("😭 this user doesn't have a membership NFT.");
				}
			} catch (e) {
				setHasClaimedNFT(false);
				console.error("failed to nft balance", error);
			}
		};
		checkClaim();
	}, [address]);

	if (!address) {
		return (
			<div className="landing">
				<h1>Welcome Bois to our very own DAO</h1>
				<button
					onClick={() => {
						connectWallet("injected");
					}}
					className="btn-hero"
				>
					Connect your wallet
				</button>
			</div>
		);
	}
	if (hasClaimedNFT) {
		return (
			<div className="member-page">
				<h1>🍪DAO Member Page</h1>
				<p>Congratulations on being a member</p>
			</div>
		);
	}
	return (
		<div className="mint-nft">
			<h1>Mint your free 🍪DAO Membership NFT</h1>
			<button disabled={isClaiming} onClick={() => mintNFT()}>
				{isClaiming ? "Minting..." : "Mint your nft (FREE)"}
			</button>
		</div>
	);
};

export default App;
