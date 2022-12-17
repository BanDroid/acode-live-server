import plugin from "../plugin.json"
const liveServer = require("live-server")

class LiveServer {
	constructor() {
		this.options = {}
		this.commands = {
			start: {
				name: "start live-server",
				description: "start live-server",
				exec: this.startServer.bind(this),
			},
			stop: {
				name: "stop live-server",
				description: "stop live-server",
				exec: this.stopServer.bind(this),
			},
		}
	}
	async init() {
		editorManager.editor.commands.addCommand(this.commands.start)
		editorManager.editor.commands.addCommand(this.commands.stop)
	}

	async startServer() {
		const server = liveServer.start(this.options)
	}

	async stopServer() {}

	async destroy() {
		editorManager.editor.commands.removeCommands(commands)
	}
}

if (window.acode) {
	const liveServerPlugin = new LiveServer()
	acode.setPluginInit(
		plugin.id,
		(baseUrl, $page, { cacheFileUrl, cacheFile }) => {
			if (!baseUrl.endsWith("/")) {
				baseUrl += "/"
			}
			liveServerPlugin.baseUrl = baseUrl
			liveServerPlugin.init($page, cacheFile, cacheFileUrl)
		}
	)
	acode.setPluginUnmount(plugin.id, () => {
		liveServerPlugin.destroy()
	})
}
