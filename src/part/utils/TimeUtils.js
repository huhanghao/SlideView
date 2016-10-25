const TimeUtils = {
  getTime: (dayInterval, isStart) => {
    const date = new Date();

    date.setDate(date.getDate() + dayInterval);

    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString();
    const day = (date.getDate()).toString();
    if (isStart) {
      return year.concat('-').concat(month).concat('-').concat(day).concat(' 00:00:00');
    } else {
      return year.concat('-').concat(month).concat('-').concat(day).concat(' 23:59:59');
    }
  },
};

module.exports = TimeUtils;
