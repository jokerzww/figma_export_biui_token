import { parseModeToTokenMapToXml, parseAttrsArrayToXml } from "./tokenUtils";
import { MessageEvent } from "./messageEvent";
import { changeFilterModes } from "./tokenUtils";
// This file holds the main code for plugins. Code in this file has access to
// the *figma document* via the figma global object.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (See https://www.figma.com/plugin-docs/how-plugins-run).

// Runs this code if the plugin is run in Figma
if (figma.editorType === "figma") {
  // This plugin will open a window to prompt the user to enter a number, and
  // it will then create that many rectangles on the screen.

  // This shows the HTML page in "ui.html".
  figma.showUI(__html__, { width: 600, height: 300 });

  // Calls to "parent.postMessage" from within the HTML page will trigger this
  // callback. The callback will be passed the "pluginMessage" property of the
  // posted message.
  figma.ui.onmessage = (msg) => {
    if (msg.type === "preview_tokens") {
      const collect = figma.variables
        .getLocalVariableCollections()
        .find((obj) => {
          return obj.name == "Color Token";
        });
      if (collect != null) {
        //解析token
        let modeToTokensMap = new Map();
        let modes = collect.modes;
        for (const mode of modes) {
          modeToTokensMap.set(mode, new Map());
        }
        for (const variableId of collect.variableIds) {
          let variable = figma.variables.getVariableById(variableId);
          if (variable != null) {
            for (const modeId of Object.keys(variable.valuesByMode)) {
              let mode = modes.find((obj) => {
                return obj.modeId == modeId;
              });
              let tokenMap = modeToTokensMap.get(mode);
              const value = variable.valuesByMode[modeId];
              (tokenMap as Map<any, any>).set(variable.name, value);
            }
          }
        }
        let event: MessageEvent = {
          type: "preview_tokens_str_show",
          data: parseModeToTokenMapToXml(modeToTokensMap),
        };
        figma.ui.postMessage(event);
      } else {
        console.log("can not find Color Token");
      }
    } else if (msg.type === "preview_attrs") {
      const collect = figma.variables
        .getLocalVariableCollections()
        .find((obj) => {
          return obj.name == "Color Token";
        });
      if (collect != null) {
        //解析token
        let modeToTokensMap = new Map();
        let modes = collect.modes;
        var attrsName: Array<string> = [];
        for (const variableId of collect.variableIds) {
          let variable = figma.variables.getVariableById(variableId);
          if (variable != null) {
            attrsName.push(variable?.name);
          }
        }
        let event: MessageEvent = {
          type: "preview_attrs_str_show",
          data: parseAttrsArrayToXml(attrsName),
        };
        figma.ui.postMessage(event);
      } else {
        console.log("can not find Color Token");
      }
    } else if (msg.type === "download_attrs") {
      const collect = figma.variables
        .getLocalVariableCollections()
        .find((obj) => {
          return obj.name == "Color Token";
        });
      if (collect != null) {
        //解析token
        let modeToTokensMap = new Map();
        let modes = collect.modes;
        var attrsName: Array<string> = [];
        for (const variableId of collect.variableIds) {
          let variable = figma.variables.getVariableById(variableId);
          if (variable != null) {
            attrsName.push(variable?.name);
          }
        }
        let event: MessageEvent = {
          type: "download_attrs_content_get",
          data: parseAttrsArrayToXml(attrsName),
        };
        figma.ui.postMessage(event);
      } else {
        console.log("can not find Color Token");
      }
    }else if (msg.type === "download_tokens") {
      const collect = figma.variables
        .getLocalVariableCollections()
        .find((obj) => {
          return obj.name == "Color Token";
        });
      if (collect != null) {
        //解析token
        let modeToTokensMap = new Map();
        let modes = collect.modes;
        for (const mode of modes) {
          modeToTokensMap.set(mode, new Map());
        }
        for (const variableId of collect.variableIds) {
          let variable = figma.variables.getVariableById(variableId);
          if (variable != null) {
            for (const modeId of Object.keys(variable.valuesByMode)) {
              let mode = modes.find((obj) => {
                return obj.modeId == modeId;
              });
              let tokenMap = modeToTokensMap.get(mode);
              const value = variable.valuesByMode[modeId];
              (tokenMap as Map<any, any>).set(variable.name, value);
            }
          }
        }
        let event: MessageEvent = {
          type: "download_tokens_content_get",
          data: parseModeToTokenMapToXml(modeToTokensMap),
        };
        figma.ui.postMessage(event);
      } else {
        console.log("can not find Color Token");
      }
    }else if(msg.type === "modes_change"){
        changeFilterModes(msg.data)
    }
  };
}
