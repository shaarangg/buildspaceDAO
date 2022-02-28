import sdk from "./1-initialize-sdk.js";

const bundleDrop = sdk.getBundleDropModule(process.env.BUNDLEDROP_MODULE_ADDRESS);

(async () => {
	try {
		const claimConditionFactory = bundleDrop.getClaimConditionFactory();
		claimConditionFactory.newClaimPhase({
			startTime: new Date(),
			maxQuantity: 10,
			maxQuantityPerTransaction: 1,
		});
		await bundleDrop.setClaimCondition(0, claimConditionFactory);
		console.log("✅ Successfully set claim condition on bundle drop:", bundleDrop.address);
	} catch (e) {
		console.error("Failed to set claim condition", error);
	}
})();
