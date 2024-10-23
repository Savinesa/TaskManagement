import PropTypes from "prop-types";

const MonthFilter = ({ selectedMonth, onMonthChange }) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className="month-filter">
      <label className="month-filter__label">Select Month:</label>
      <select
        className="month-filter__select"
        value={selectedMonth}
        onChange={(e) => onMonthChange(parseInt(e.target.value, 10))}
      >
        {months.map((month, index) => (
          <option value={index} key={month}>
            {month}
          </option>
        ))}
      </select>
    </div>
  );
};

MonthFilter.propTypes = {
  selectedMonth: PropTypes.number.isRequired,
  onMonthChange: PropTypes.func.isRequired,
};

export default MonthFilter;
