export const formatDate = (date: Date) => {
  const getLocale = () => {
    if (typeof window !== "undefined") {
      return window.clientInformation.language;
    } else {
      return "en-US";
    }
  };

  return new Intl.DateTimeFormat(getLocale()).format(new Date(date));
};
