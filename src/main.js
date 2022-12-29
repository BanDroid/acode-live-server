import plugin from "../plugin.json";
const liveServer = require("live-server");

const multiPrompt = acode.require("multiPrompt");
const select = acode.require("select");

class LiveServer {
	async init() {
		this.serverInstance = null;
		this.options = {};
		editorManager.editor.commands.addCommand({
			name: "open live-server",
			description: "open live-server",
			exec: this.run.bind(this),
		});
	}

	async run() {
		const colorPrompt = await multiPrompt("test", [
			{
				id: "color1",
				type: "color",
				required: true,
			},
			{
				id: "color2",
				type: "color",
				required: true,
			},
		]);
		const toDirection = await select(
			"Linear Direction",
			[
				"to right",
				"to right bottom",
				"to right top",
				"to left",
				"to left bottom",
				"to left top",
				"to bottom",
				"to top",
			],
			{
				default: "to right",
			}
		);
		editorManager.editor.insert(
			`linear-gradient(${toDirection}, ${colorPrompt["color1"]}, ${colorPrompt["color2"]})`
		);
	}

	async destroy() {
		editorManager.editor.commands.removeCommand({
			name: "open live-server",
			description: "open live-server",
			exec: this.run.bind(this),
		});
	}
}

if (window.acode) {
	const acodePlugin = new LiveServer();
	acode.setPluginInit(
		plugin.id,
		(baseUrl, $page, { cacheFileUrl, cacheFile }) => {
			if (!baseUrl.endsWith("/")) {
				baseUrl += "/";
			}
			acodePlugin.baseUrl = baseUrl;
			acodePlugin.init($page, cacheFile, cacheFileUrl);
		}
	);
	acode.setPluginUnmount(plugin.id, () => {
		acodePlugin.destroy();
	});
}
