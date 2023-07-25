import React from 'react'
import Select from 'react-select';


function DropdownComponent({options, selectedOption, handleOptionChange}) {
  return (
    <div style={{ margin: '20px 0' }}>
          <label>Select Ticker Symbol: </label>
          <Select options={options} value={selectedOption} onChange={handleOptionChange} />
        </div>
  )
}

export default DropdownComponent