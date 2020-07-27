"use strict";
exports.__esModule = true;
exports.generateMobxComponent = exports.generateComponent = exports.generateStyleFile = exports.generateIndexFile = exports.generateCustomHook = void 0;
function generateCustomHook(name) {
    return "import { useEffect, useState } from \"react\";\n  \nconst use" + name + " = () => {\n  const [a, setA] = useState();\n\n  useEffect(() => {\n    setA();\n  }, []);\n\n  return a;\n};\n    \nexport default useA;";
}
exports.generateCustomHook = generateCustomHook;
function generateIndexFile(componentName) {
    return "export {" + componentName + " as default} from './" + componentName + "'";
}
exports.generateIndexFile = generateIndexFile;
function generateStyleFile(componentName, uid) {
    return "." + componentName + "-wrapper" + (uid ? "-" + uid : "") + "{}";
}
exports.generateStyleFile = generateStyleFile;
function generateComponent(componentName, styleFileType, uid) {
    if (styleFileType === void 0) { styleFileType = "scss"; }
    var content = "import React from \"react\";\nimport \"./" + componentName + "." + styleFileType + "\";\n\nexport const " + componentName + " = () => {\n    return <div className=\"" + componentName + "-wrapper" + (uid ? "-" + uid : "") + "\">\n  \n    </div>;\n};\n      ";
    return content;
}
exports.generateComponent = generateComponent;
function generateMobxComponent(componentName, styleFileType, uid) {
    var content = "import React from \"react\";\nimport \"./" + componentName + "." + styleFileType + "\";\nimport { useObserver, observer } from \"mobx-react\";\n\nexport const " + componentName + " = observer(() => {\n  return useObserver(() => <div className=\"" + componentName + "-wrapper" + (uid ? uid : "") + "\"></div>);\n});\n";
    return content;
}
exports.generateMobxComponent = generateMobxComponent;
