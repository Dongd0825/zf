class pluginAPI {
  constructor(opts) {
    this.id = opts.id;
    this.service = opts.service;
  }
  registerCommand(command) {
    this.service.commands[command.name] = command;
  }
  register(hook) {
    this.service.hooksByPluginId[this.id] = (
      this.service.hooksByPluginId[this.id] || []
    ).concat(hook);
  }
}

module.exports = pluginAPI;