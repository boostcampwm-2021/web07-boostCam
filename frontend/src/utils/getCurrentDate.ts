import CurrentDate from '../types/date';

const getCurrentDate = (): CurrentDate => {
  const today: Date = new Date();
  return {
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    date: today.getDate(),
    hour: today.getHours(),
    minutes: today.getMinutes(),
  };
};

export default getCurrentDate;
