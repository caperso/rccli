"use strict";
exports.__esModule = true;
exports.generateMobxComponent = exports.generateComponent = exports.generateStyleFile = exports.generateIndexFile = exports.generateCustomHook = void 0;
var tool_1 = require("./tool");
/**
 * get a hook component
 * @export
 * @param {string} name
 * @returns
 */
function generateCustomHook(name) {
    return "import { useEffect, useState } from \"react\";\n  \nconst use" + name + " = () => {\n  const [a, setA] = useState();\n\n  useEffect(() => {\n    setA();\n  }, []);\n\n  return a;\n};\n    \nexport default useA;";
}
exports.generateCustomHook = generateCustomHook;
/**
 * get a default export file (named "index")
 * @export
 * @param {string} componentName
 * @returns
 */
function generateIndexFile(componentName) {
    return "export {" + componentName + " as default} from './" + componentName + "'";
}
exports.generateIndexFile = generateIndexFile;
/**
 * get a style file
 *
 * outside wrapper named ${componentName}-wrapper(-uuid)(if needed)
 *
 * @export
 * @param {string} componentName
 * @param {string} [uid]
 * @returns
 */
function generateStyleFile(componentName, uid) {
    return "." + tool_1.uppercaseToHyphen(componentName) + "-wrapper" + (uid ? "-" + uid : "") + "{\n\n}";
}
exports.generateStyleFile = generateStyleFile;
/**
 * get a functional component
 * @export
 * @param {string} componentName
 * @param {string} [styleFileType="scss"]
 * @param {string} [uid]
 * @returns
 */
function generateComponent(componentName, styleFileType, uid) {
    if (styleFileType === void 0) { styleFileType = "scss"; }
    var content = "import React from \"react\";\nimport \"./" + componentName + "." + styleFileType + "\";\n\nexport const " + componentName + " = () => {\n    return <div className=\"" + tool_1.uppercaseToHyphen(componentName) + "-wrapper" + (uid ? "-" + uid : "") + "\">\n  \n    </div>;\n};\n      ";
    return content;
}
exports.generateComponent = generateComponent;
/**
 * get a functional component with Mobx wrapper
 * @export
 * @param {string} componentName
 * @param {string} styleFileType
 * @param {string} [uid]
 * @returns
 */
function generateMobxComponent(componentName, styleFileType, uid) {
    var content = "import React from \"react\";\nimport \"./" + componentName + "." + styleFileType + "\";\nimport { useObserver, observer } from \"mobx-react\";\n\nexport const " + componentName + " = observer(() => {\n  return useObserver(() => <div className=\"" + componentName + "-wrapper" + (uid ? uid : "") + "\"></div>);\n});\n";
    return content;
}
exports.generateMobxComponent = generateMobxComponent;
