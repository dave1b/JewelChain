/**
 * Formats a timestamp into a human-readable locale string.
 * @param timestamp timestamp to be converted.
 * @returns human-readable locale string.
 */
export const formatDatetime = (timestamp: number) => {
  var newDate = new Date();
  newDate.setTime(timestamp * 1000);
  return newDate.toLocaleString();
};
