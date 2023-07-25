import React, { useState, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios'
import DatePickerComponent from './components/DatePickerComponent';
import DropdownComponent from './components/DropdownComponent';

const URL = `https://api.polygon.io/v3/reference/tickers?active=true&apiKey=3asOGuyjWIJdplHUBuLiQbmOnv1a9pl0`
const server_url = `http://localhost:5000/api/fetchStockData`

const App = () => {

	const [selectedDate, setSelectedDate] = useState(null);
	const [selectedOption, setSelectedOption] = useState(null);
	const [options, setOptions] = useState([])

	const handleDateChange = (date) => {
		setSelectedDate(date);
	};

	useEffect(() => {
		const fetchData = async () => {
			const response = await axios.get(URL)
			const tickerArray = (response.data.results)
			const result = tickerArray.map((ele) => {
				return {
					value: ele.ticker,
					label: ele.ticker
				}
			})
			setOptions(result)
		}
		fetchData()
	}, [])

	const handleOptionChange = (option) => {
		setSelectedOption(option);
	};

	function formatDate(dateString) {
		const date = new Date(dateString);
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const day = String(date.getDate()).padStart(2, '0');

		return `${year}-${month}-${day}`;
	}

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (selectedDate && selectedOption) {
			const api_response = await axios.post(server_url, {
				stocksTicker: selectedOption.value,
				from: formatDate(selectedDate)
			})
		} else {
			alert('Please select a date and an option.');
		}
	};

	return (
		<div className="App">
			<form onSubmit={handleSubmit}>

				<DatePickerComponent selectedDate={selectedDate} handleDateChange={handleDateChange} />

				<DropdownComponent options={options} selectedOption={selectedOption} handleOptionChange={handleOptionChange} />

				<button type="submit">Submit</button>

			</form>
		</div>
	);
};

export default App;