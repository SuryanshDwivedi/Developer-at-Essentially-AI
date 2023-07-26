import React, { useState, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios'
import DatePickerComponent from './components/DatePickerComponent';
import DropdownComponent from './components/DropdownComponent';
import StockDisplayComponent from './components/StockDisplayComponent';
import DataNotFound from './components/DataNotFound';
import SpinnerComponent from './components/SpinnerComponent';

const URL = `https://api.polygon.io/v3/reference/tickers?active=true&limit=1000&apiKey=3asOGuyjWIJdplHUBuLiQbmOnv1a9pl0`
const server_url = `http://localhost:8000/api/fetchStockData`

const App = () => {

	const [selectedDate, setSelectedDate] = useState(null);
	const [selectedOption, setSelectedOption] = useState(null);
	const [options, setOptions] = useState([])
	const [stocksData, setStocksData] = useState({})
	const [statusCode, setStatusCode] = useState(0)
	const [isLoading, setLoading] = useState(false)

	const handleDateChange = (date) => {
		setSelectedDate(date);
	};

	useEffect(() => {
		const fetchData = async () => {
			const response = await axios.get(URL)
			const tickerArray = (response.data.results)
			const result = tickerArray.map((ele) => {
				return {
					value: ele.name,
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
		setLoading(true)
		setStatusCode(0)
		if (selectedDate && selectedOption) {
			const api_response = await axios.post(server_url, {
				stocksTicker: selectedOption.label,
				from: formatDate(selectedDate)
			})
			if (api_response.data.status === 200) {
				try {
					const stockDataObject = api_response.data.message.results[0]
					setStocksData({...stockDataObject,name : selectedOption.value})
				} catch (err) {
					setStatusCode(404)
					setStocksData({})
				}
				setStatusCode(200)

			} else {
				setStatusCode(404)
				setStocksData({})
			}
		} else {
			alert('Please select a date and an option.');
		}
		setLoading(false)
	};

	return (
		<div className="App">
			<h1 className='header'><u><i>Stocks Data Information</i></u></h1>
			<form onSubmit={handleSubmit}>

				<DatePickerComponent selectedDate={selectedDate} handleDateChange={handleDateChange} />

				<DropdownComponent options={options} selectedOption={selectedOption} handleOptionChange={handleOptionChange} />

				<button className='submitBtn' type="submit">Submit</button>

			</form>
			<div className='data'>
			{isLoading ? <SpinnerComponent /> : null}
			{statusCode === 200 ? <StockDisplayComponent stocksData={stocksData} /> : null}
			{statusCode === 404 ? <DataNotFound /> : null}
			</div>
		</div>
	);
};

export default App;