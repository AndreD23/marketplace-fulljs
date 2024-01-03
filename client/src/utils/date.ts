/**
 * Formats the given date string into a localized date string.
 *
 * @param {string} date - The date string to be formatted.
 * @returns {string} - The formatted date string.
 */
export const formatDate = (date: string): string => {
  const cDate = new Date(date);

  const months = [
    "janeiro",
    "fevereiro",
    "março",
    "abril",
    "maio",
    "junho",
    "julho",
    "agosto",
    "setembro",
    "outubro",
    "novembro",
    "dezembro",
  ];

  const cDay = cDate.getDate().toString().padStart(2, "0");
  const cMonth = cDate.getMonth();
  const cYear = cDate.getFullYear();

  return `${cDay} de ${months[cMonth]} de ${cYear}`;
};
