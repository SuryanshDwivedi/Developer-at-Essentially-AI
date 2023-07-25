import React from 'react'
import DatePicker from 'react-datepicker';

function DatePickerComponent({selectedDate, handleDateChange}) {
  return (
    <div>
    <label>Select Date: </label>
    <DatePicker selected={selectedDate} onChange={handleDateChange} dateFormat="yyyy/MM/dd" />
  </div>
  )
}

export default DatePickerComponent