import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
const ApiKey = 'SUN8GZHZ6UIJ6DE6';
const requestGone =
  'Thank you for using Alpha Vantage! Our standard API call frequency is 5 calls per minute and 500 calls per day. Please visit https://www.alphavantage.co/premium/ if you would like to target a higher API call frequency.';
function ErrorMessage() {
  return (
    <p>
      Sry you already used the 5 request per Minute.Pls wait a little bit and
      try again!
    </p>
  );
}
function App() {
  const [stockSymbol, setStockSymbol] = useState('AMZN');
  const [rawData, setRawData] = useState(false);
  const [searchBar, setSearchBar] = useState('A');
  const [searchBarSuggestions, setSearchBarSuggestions] = useState(false);
  let stockDate = [];
  let stockPrice = [];
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stockSymbol}&outputsize=compact&apikey=${ApiKey}`,
      );
      setRawData(await response.json());
    };
    fetchData();
  }, [stockSymbol]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchBar}&apikey=${ApiKey}`,
      );
      setSearchBarSuggestions(await response.json());
    };
    setTimeout(function () {
      if (searchBar) {
        fetchData();
      }
    }, 500);
  }, [searchBar]);

  for (let key in rawData['Time Series (Daily)']) {
    stockDate.push(key);
    stockPrice.push(rawData['Time Series (Daily)'][key]['1. open']);
  }

  return (
    <>
      <Line
        data={{
          labels: stockDate,
          datasets: [
            {
              label: `Stock`,
              backgroundColor: ['rgba(75, 192, 192, 0.6)'],
              data: stockPrice,
            },
          ],
        }}
      />
      <div>
        <input onChange={(e) => setSearchBar(e.currentTarget.value)} />
      </div>
      <ul>
        {searchBarSuggestions
          ? searchBarSuggestions.bestMatches.map((suggestion) => {
              return (
                <li key={suggestion['2. name']}>
                  <button
                    onClick={() => setStockSymbol(suggestion['1. symbol'])}
                  >
                    {suggestion['2. name']}
                  </button>
                  {}
                </li>
              );
            })
          : null}
      </ul>
      {rawData.Note === requestGone ? ErrorMessage() : null}
    </>
  );
}

export default App;
