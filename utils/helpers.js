module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    return date?.toLocaleDateString() ?? 'unknown date';
  },
  format_amount: (amount) => {
    // format large numbers with commas
    return parseInt(amount).toLocaleString();
  },
  check_monday: (todoDay) => {
    if (todoDay === 'Monday') {
      return true;
    } else {
      return false;
    }
  },
  display_day: (day) => {
    day = dayjs().format('MMM DD, YYYY')
  }
};
