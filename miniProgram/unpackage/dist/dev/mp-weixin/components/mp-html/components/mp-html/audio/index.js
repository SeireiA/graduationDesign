"use strict";
const components_mpHtml_components_mpHtml_audio_context = require("./context.js");
let index = 0;
function Audio(vm) {
  this.vm = vm;
}
Audio.prototype.onUpdate = function() {
  this.audios = [];
};
Audio.prototype.onParse = function(node) {
  if (node.name === "audio") {
    if (!node.attrs.id) {
      node.attrs.id = "a" + index++;
    }
    this.audios.push(node.attrs.id);
  }
};
Audio.prototype.onLoad = function() {
  setTimeout(() => {
    for (let i = 0; i < this.audios.length; i++) {
      const ctx = components_mpHtml_components_mpHtml_audio_context.context.get(this.audios[i]);
      ctx.id = this.audios[i];
      this.vm._videos.push(ctx);
    }
  }, 500);
};
exports.Audio = Audio;
