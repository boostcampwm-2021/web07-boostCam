import CurrentDate from '../types/date';

const getCurrentDate = (today: Date): CurrentDate => {
  return {
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    date: today.getDate(),
    hour: today.getHours(),
    minutes: today.getMinutes(),
  };
};

export default getCurrentDate;
