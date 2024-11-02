export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "numeric", day: "numeric" };
  return date.toLocaleDateString(undefined, options);
}

export const removeParentheses = (str: string): string => {
  return str.replace(/[()]/g, "");
}

