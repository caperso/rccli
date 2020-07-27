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

export function generateIndexFile(componentName: string) {
  return `export {${componentName} as default} from './${componentName}'`;
}

export function generateStyleFile(componentName: string, uid?: string) {
  return `.${componentName}-wrapper${uid ? `-${uid}` : ""}{}`;
}

export function generateComponent(
  componentName: string,
  styleFileType: string = "scss",
  uid?: string
) {
  const content = `import React from "react";
import "./${componentName}.${styleFileType}";

export const ${componentName} = () => {
    return <div className="${componentName}-wrapper-${uid ? uid : ""}">
  
    </div>;
};
      `;
  return content;
}

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
