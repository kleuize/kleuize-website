export const Capitalize = (text: string) => {
    return (
      // str.charAt(0).toUpperCase() + str.slice(1, str.length)
      text.replace(
        /(^\w|\s\w)(\S*)/g,
        (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
      )
    );
  };