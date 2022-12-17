const path = require("path")

module.exports = (env, options) => {
	const { mode = "development" } = options
	const rules = [
		{
			test: /\.m?js$/,
			use: [
				"html-tag-js/jsx/tag-loader.js",
				{
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env"],
					},
				},
			],
		},
	]

	const main = {
		mode,
		entry: {
			main: "./src/main.js",
		},
		output: {
			path: path.resolve(__dirname, "dist"),
			filename: "[name].js",
			chunkFilename: "[name].js",
		},
		module: {
			rules,
		},
		externals: [
			{
				fsevents: "commonjs fsevents",
				emitter: "commonjs emitter",
				passport: "commonjs passport",
				"http-proxy": "commonjs http-proxy",
			},
		],
		externalsPresets: {
			node: true,
		},
	}

	return [main]
}
