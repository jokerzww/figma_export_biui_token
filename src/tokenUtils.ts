const xml2js = require("xml2js");
const builder = require("xmlbuilder");
var filterModes = new Array<String>("light","dark")
export function parseModeToTokenMapToXml(map: Map<any, any>): string {
  let resources = builder.create("resources").dec("1.0", "UTF-8");
  map.forEach((value, key) => {
    if(filterModes.length != 0 && filterModes.includes(key.name) == false){
        return
    }
    let name = "BIUIToken_" + key.name;
    var xmlStyleEle = resources.ele("style");
    xmlStyleEle.att("name", name);
    xmlStyleEle.att("parent", "BIUIRootTheme");
    xmlStyleEle.end({ pretty: true ,newline: '\n' });
    let tokenMap = value as Map<any, any>;
    tokenMap.forEach((value, key) => {
      var newItem = xmlStyleEle.ele(
        "item",
        rgbaToHex(value.r, value.g, value.b, value.a)
      );
      var colorName = "biui_color_" + key;
      colorName = colorName.replace("/", "_");
      newItem.att("name", colorName);
    });
  });
  var xml = resources.end({ pretty: true });
  console.log(xml);
  return xml.toString();
}

export function parseAttrsArrayToXml(array: Array<string>): string {
    let resources = builder.create("resources").dec("1.0", "UTF-8");
    array.forEach((value) => {
      let name = ("biui_color_" + value).replace("/", "_");;
      var xmlStyleEle = resources.ele("attr");
      xmlStyleEle.att("name", name);
      xmlStyleEle.att("format", "color");
    });
    var xml = resources.end({ pretty: true ,spacebeforeslash :' '});
    console.log(xml);
    return xml.toString();
  }

function rgbaToHex(r: number, g: number, b: number, a: number): string {
  function componentToHex(c: number): string {
    const hex = Math.round(c * 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }
  let aStr = componentToHex(a);
  if (aStr == "ff") {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  } else {
    return (
      "#" +
      componentToHex(a) +
      componentToHex(r) +
      componentToHex(g) +
      componentToHex(b)
    );
  }
}

export function changeFilterModes(modesStr:string){
    console.log(modesStr)
    filterModes.length = 0
    if(modesStr.length != 0){
        modesStr.split(',').forEach((value)=>{
            filterModes.push(value)
        })
    }
    console.log(filterModes)
}


