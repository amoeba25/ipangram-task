import { useState, useEffect } from "react";
import "./App.css";
import Button from "./components/Button";
import { getWeek, getDateFormatted } from "./utils/helper";
import { startOfDay, addDays, subDays, addHours } from "date-fns";

function App() {
  const [week, setWeek] = useState(getWeek());
  const [day, setDay] = useState(new Date());
  const [selectedTimesByDay, setSelectedTimesByDay] = useState({
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
  });
  const [selectedTimezone, setSelectedTimezone] = useState("UTC-0");

  useEffect(() => {
    adjustTimePeriods(selectedTimezone);
  }, [day, selectedTimezone]);

  const adjustTimePeriods = (timezone) => {
    const offset = timezone === "UTC-0" ? 0 : -2; // Adjust the offset based on the selected timezone
    const adjustedDay = new Date(day);
    adjustedDay.setHours(adjustedDay.getHours() + offset); // Apply the offset to the selected day

    setWeek(getWeek(adjustedDay)); // Update the week based on the adjusted day
  };

  const handleTimezoneChange = (event) => {
    setSelectedTimezone(event.target.value);
  };

  const prevDate = () => {
    const subDay = subDays(day, 7);
    setDay(subDay);
    setWeek(getWeek(subDay));
  };

  const nextDate = () => {
    const addDay = addDays(day, 7);
    setDay(addDay);
    setWeek(getWeek(addDay));
  };

  // Function to handle checkbox change
  const handleCheckboxChange = (day, time) => {
    setSelectedTimesByDay((prevSelectedTimes) => ({
      ...prevSelectedTimes,
      [day]: prevSelectedTimes[day].includes(time)
        ? prevSelectedTimes[day].filter((selectedTime) => selectedTime !== time)
        : [...prevSelectedTimes[day], time],
    }));
  };

  // Function to generate time options every 30 minutes from 8 AM to 11 PM
  // Function to generate time options every 30 minutes from 8 AM to 11 PM
  const generateTimeOptions = (day) => {
    const options = [];
    const offset = selectedTimezone === "UTC-0" ? 0 : -2; // Adjust the offset based on the selected timezone

    const selectedTimes = selectedTimesByDay[day] || []; // Check if selectedTimesByDay[day] is defined

    for (let hour = 8 + offset; hour <= 23 + offset; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const adjustedHour = (hour + 24) % 24; // Ensure hour wraps around correctly for negative offsets
        const amPm = adjustedHour >= 12 ? "PM" : "AM";
        const displayHour = adjustedHour % 12 || 12;
        const time = `${displayHour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")} ${amPm}`;

        options.push(
          <>
            <label htmlFor={time}>{time}</label>
            <input
              key={`${day}-${time}`}
              type="checkbox"
              id={time}
              checked={selectedTimes.includes(time)} // Use selectedTimes instead of selectedTimesByDay[day]
              onChange={() => handleCheckboxChange(day, time)}
            />
          </>
        );
      }
    }
    return options;
  };

  return (
    <div className="app-body">
      <h1>Week App </h1>

      <div className="nav">
        <Button name="Previous Week" onClick={prevDate} />
        {day && <h3> {getDateFormatted(day)} </h3>}
        <Button name="Next Week" onClick={nextDate} />
      </div>

      <div className="select-container">
        <label htmlFor="timezone">Select Timezone:</label>
        <select
          id="timezone"
          value={selectedTimezone}
          onChange={handleTimezoneChange}
        >
          <option value="UTC-0">UTC-0</option>
          <option value="UTC-2">UTC-2</option>
        </select>
      </div>

      <div className="weekday">
        <h4>Moday : {getDateFormatted(week.monday)}</h4>
        {generateTimeOptions("monday")}
      </div>

      <div className="weekday">
        <h4>Tuesday : {getDateFormatted(week.tuesday)}</h4>
        {generateTimeOptions("tuesday")}
      </div>

      <div className="weekday">
        <h4>Wednesday : {getDateFormatted(week.wednesday)}</h4>
        {generateTimeOptions("wednesday")}
      </div>

      <div className="weekday">
        <h4>Thursday : {getDateFormatted(week.thursday)}</h4>
        {generateTimeOptions("thursday")}
      </div>

      <div className="weekday">
        <h4>Friday : {getDateFormatted(week.friday)}</h4>
        {generateTimeOptions("friday")}
      </div>
    </div>
  );
}

export default App;
