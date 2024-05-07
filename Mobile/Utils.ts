const Utils = {
  toTitleCase(str: string) {
    return str.replace(/\w\S*/g, (txt: string) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  },
  toSentenceCase(str: string) {
    return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
  },
};
export default Utils;
