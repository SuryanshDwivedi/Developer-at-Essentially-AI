# Frontend Task Essentially AI

## Steps to complete the task
1. Create a clone of this repo
2. Complete the tasks given below
3. Create your own public repo on github and push your code there
4. Share the repo link as a reply to the mail

## Overview
The task is to build a webpage to display the trade statistics (Open, High, Low, Close, Volume) of a particular stock for a particular day. You should use Polygon free tier API for this task (https://polygon.io/)

## Individual tasks
1. The given codebase has two parts, client and server.
2. Go to server folder, you'll see in app.js that a POST route is exposed at /api/fetchStockData. Implement this API to fetch the trade statistics of a particular stock for a particular day using the Polygon API.
3. Return only the required fields in the response in a json format. Handle various edge cases here along with relevant response codes.
4. Go to client folder and run the react app. You'll see just a hello world screen for now.
5. Create a form for the user to input the symbol of the stock and select a date and add a submit button.
6. On submitting the form, send a request to the api route which is exposed and once the data is back, display the required details in the frontend (Open, High, Low, Close, Volume).

## Evaluation criteria
1. The logical correctness of all individual tasks mentioned above
2. Tackling of edge cases
3. Efficiency of the code
4. Naming conventions (No need to follow any standard pattern, just describe the pattern and make sure the code is consistent with it)
5. Project structure (Again, no need to follow a standard pattern. Just make sure the structuring is logical and describe it)
6. Documentation (This can just be a readme file with bullet points, as long as it explains what you've implemented, you're good to go).
7. Bonus points for interesting UI (This obviously won't be considered if the core functionality isn't present).

## Optional tasks
1. Imagine this is a real world scenario which thousands of users use to get the historic data of a stock for a particular day, how would this product change in order to improve the UX.
2. What new features would you add in this product to increase it's utility for the end user.




########################  SOLUTION  #############################

VIDEO LINK : (Added sample video link to show the working of application)
           https://drive.google.com/file/d/1WECOCV1WdRkmDRvV7wanVZATdnBce8la/view?usp=sharing

BACKEND : 

1. Implemented POST API to fetch stock data for a particular day in json format covering required status codes.
2. It is good practice to keep api keys to env variable.
3. I made multiplier, timespan, limit to use default values as from frontend the request body will only contain date and type of stock symbol.
4. Tested the working of api via Postman.


FRONTEND :

1. Implemented a simple form with 2 components DatePicker and DropDown Component which is responsible to select a particular date and ticker symbol of stocks from dropdown list respectively.
2. Used react-datepicker and react-select libraries to implement the functionality.
3. Using useEffect hook fetched data of all ticker symbol using polygon api which will be shown to the dropdown list as soon as website renders.
4. We can also make search on dropdown to pick the type of symbol.
5. On submit made a small validation check for empty fields.
6. Maintained state of application using useState hook. Using this hook I keep tracked of loading state which will remain active while we fetch date from backend api. 
7. Checking for the status code whether api hit is successfull or not and rendering the required component on the basis of result i.e for success case we render StockDisplayComponent otherwise DataNotFound
8. Integrated backend api using axios making post request with the required fields and handling the required response.
9. Successfully solved a small blocker where I needed to format the date structure which is compatible with the request body of api i.e in the form of yyyy-MM-dd.


OPTIONAL : 

1. If thousand of users are using this application for getting the historic data of stock then in that case we must implement caching machanism to store the most frequent data as it will reduce multiple hits to the backend api otherwise it will result in increase of load on server which will be expensive as we do horizontal scaling for the availability of the application to the end users. By using redis we will be able to provide users with data with low latency hence improving user experience.

2. To increase the utility I would have added functionality of picking range of dates instead of a particular date to show the data. For the utility purpose I would have added a Compare feature which will compare the data of one stock from another for better understanding of rise and fall of stock.