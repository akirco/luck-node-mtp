import type mtp from "./types";

let _bindings: mtp | undefined;

export default function bindings(): mtp {
  return (_bindings ??= require("bindings")("luck-node-mtp"));
}
