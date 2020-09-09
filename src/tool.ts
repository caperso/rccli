export function uppercaseToHyphen(str: string): string {
  let exr = /[A-Z]/;

  let newStr = str.split("").map((letter, index) => {
    if (exr.test(letter)) {
      const replaceStr =
        index === 0 ? letter.toLowerCase() : "-" + letter.toLowerCase();
      return replaceStr;
    } else {
      return letter;
    }
  });

  return newStr.join("");
}
