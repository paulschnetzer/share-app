import React, { useState, useEffect } from 'react';
const ApiKey = 'SUN8GZHZ6UIJ6DE6';
function App() {
  // const [loading, setLoading] = useState(false);
  const [stockName, setStockName] = useState('AMZN');
  const [rawData, setRawData] = useState(false);
  let x = [];
  let y = [];
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stockName}&outputsize=compact&apikey=${ApiKey}`,
      );
      setRawData(await response.json());
    };
    fetchData();
  }, [stockName]);

  for (let key in rawData['Time Series (Daily)']) {
    x.push(key);
    y.push(rawData['Time Series (Daily)'][key]['1. open']);
  }

  if (!stockName) return <div>No data...</div>;
  return (
    <>
      <div>
        <button onClick={() => setStockName('AMZN')}>Amazon</button>
        <button onClick={() => setStockName('IBM')}>IBM</button>
        <button onClick={() => setStockName('MSFT')}>MicroSoft</button>
      </div>
      {x.map((date) => {
        return <p>{date}</p>;
      })}
      {y.map((value) => {
        return <p>{value}</p>;
      })}
    </>
  );
}

export default App;
