export const days = () => {
  const weekday = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const d = new Date();
  let numDay = d.getDay() - 1;
  let daysArr = [
    {
      day: weekday[numDay + 1],
    },
    {
      day: weekday[numDay + 2],
    },
    {
      day: weekday[numDay + 3],
    },
    {
      day: weekday[numDay + 4],
    },
    {
      day: weekday[numDay + 5],
    },
  ];
  return daysArr;
};
