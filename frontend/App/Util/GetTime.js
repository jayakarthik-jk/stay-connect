function getTime() {
  let hour = new Date(Date.now()).getHours();
  let minutes = new Date(Date.now()).getMinutes();
  let session = "AM";
  if (hour >= 11) session = "PM";
  hour = hour % 12;
  if (hour === 0) hour = 12;
  return `${hour}:${minutes} ${session}`;
}

export default getTime;
