import { uppercaseToHyphen } from "./tool";

/**
 * get a hook component
 * @export
 * @param {string} name
 * @returns
 */
export function generateCustomHook(name: string) {
  return `import { useEffect, useState } from "react";
  
const use${name} = () => {
  const [a, setA] = useState();

  useEffect(() => {
    setA();
  }, []);

  return a;
};
    
export default useA;`;
}

/**
 * get a default export file (named "index")
 * @export
 * @param {string} componentName
 * @returns
 */
export function generateIndexFile(componentName: string) {
  return `export {${componentName} as default} from './${componentName}'`;
}



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
export function generateStyleFile(componentName: string, uid?: string) {
  return `.${uppercaseToHyphen(componentName)}-wrapper${
    uid ? `-${uid}` : ""
  }{

}`;
}


/**
 * get a functional component
 * @export
 * @param {string} componentName
 * @param {string} [styleFileType="scss"]
 * @param {string} [uid]
 * @returns
 */
export function generateComponent(
  componentName: string,
  styleFileType: string = "scss",
  uid?: string
) {
  const content = `import React from "react";
import "./${componentName}.${styleFileType}";

export const ${componentName} = () => {
    return <div className="${uppercaseToHyphen(componentName)}-wrapper${uid ? `-${uid}` : ""}">
  
    </div>;
};
      `;
  return content;
}

/**
 * get a functional component with Mobx wrapper
 * @export
 * @param {string} componentName
 * @param {string} styleFileType
 * @param {string} [uid]
 * @returns
 */
export function generateMobxComponent(
  componentName: string,
  styleFileType: string,
  uid?: string
) {
  const content = `import React from "react";
import "./${componentName}.${styleFileType}";
import { useObserver, observer } from "mobx-react";

export const ${componentName} = observer(() => {
  return useObserver(() => <div className="${componentName}-wrapper${
    uid ? uid : ""
  }"></div>);
});
`;
  return content;
}
