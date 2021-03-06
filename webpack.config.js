// // TESTING
// const {
// 	GenerateSW,
// 	GenerateSWOptions,
// 	InjectManifest,
// 	InjectManifestOptions,
// } = require("workbox-webpack-plugin");
// const createExpoWebpackConfigAsync = require("@expo/webpack-config");

// module.exports = async function (env, argv) {
// 	const config = await createExpoWebpackConfigAsync(
// 		{
// 			...env,
// 			offline: true,
// 		},
// 		argv
// 	);
// 	config.plugins.push(
// 		// new GenerateSW({
// 		// 	swDest: "generated-sw.js",
// 		// 	skipWaiting: true,
// 		// 	clientsClaim: true,
// 		// })
// 		new InjectManifest({
// 			swSrc: "../../../../web/swSrc.js",
// 			swDest: "swDest.js",
// 		})
// 	);
// 	return config;
// };




// WORKBOX DEFAULT (NETWORK FIRST)

const createExpoWebpackConfigAsync = require("@expo/webpack-config");

module.exports = async function (env, argv) {
	const config = await createExpoWebpackConfigAsync(
		{
			...env,
      offline: true,
		},
		argv
	);
	return config;
};

// FUNCIONA EL REFRESH DE RUTAS PERO NO FUNCIONA offline
// const createExpoWebpackConfigAsync = require("@expo/webpack-config");

// module.exports = async function (env, argv) {
// 	let config = await createExpoWebpackConfigAsync(
// 		{
// 			...env,
// 			offline: true,
// 		},
// 		argv
// 	);


// 	// adjust Google Workbox (service worker) config to avoid caching problems
// 	if (config["plugins"]) {
// 		config["plugins"].forEach((plugin) => {
// 			// detect workbox plugin
// 			if (
// 				plugin["config"] &&
// 				plugin["config"]["swDest"] === "service-worker.js"
// 			) {
// 				// tell it never to cache index.html or service-worker.js
// 				plugin["config"]["exclude"].push(/index.html/);
// 				plugin["config"]["exclude"].push(/service-worker.js/);

// 				// (optional) tell it to start new service worker versions immediately, even if tabs
// 				// are still running the old one.
// 				plugin["config"]["skipWaiting"] = true;
// 			}
// 		});
// 	}

// 	return config;
// }
