import moment from "moment";

export const getPrettyDayAfter = (initialDate, dayToPublish) => { 
  const numberDaysAfter = dayToPublish - 1;

  // Your original date
  const originalDate = moment(initialDate);

  const newDate = originalDate.add(numberDaysAfter, 'days');

  return getFormatedDate(newDate);
};

export const getPrettyDay = (date) => { 
  const newDate = moment(date);
  return getFormatedDate(newDate);
};

const getFormatedDate = ( moment ) => {
  const dayOfMonth = parseInt(moment.format('DD'), 10);

  const monthName = moment.format('MMMM').replace(/^\w/, (c) => c.toUpperCase());

  const year = moment.format('YYYY');

  return `${monthName} ${dayOfMonth} of ${year}`;
};

export const getDay = (initialDate, currentDate) => {
  const initialDateWithoutTime = moment(initialDate).startOf('day');
  const currentDateWithoutTime = moment(currentDate).startOf('day');

  // Calculate the difference in days, considering only the date, month, and year
  return currentDateWithoutTime.diff(initialDateWithoutTime, 'day') + 1;
};

export const getDaysInterval = (day) => {
  const daysArray = [];

  for (let i = 0; i <= day; i++) {
    daysArray.push(i);
  }

  return daysArray;
};
