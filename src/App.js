import React, { useState, useEffect } from 'react';
import './style.css';

export default function App() {
  const [details, setState] = useState([]);
  useEffect(() => {
    fetch('https://api.publicapis.org/entries')
      .then(data => data.json())
      .then(val => setState(val.entries));
  }, []);
  const Categories = details.map(category => {
    return category.Category;
  });
  let uniqueCategories = [...new Set(Categories)];
  const [pagin, setPagin] = useState(uniqueCategories[0]);
  return (
    <div className="m-4 p-2">
      <h1 style={{ textAlign: 'center' }}>API</h1>
      {uniqueCategories.map(Category => {
        return (
          <>
            <button
              className="btn text-dark btn-outline-info m-1"
              onClick={() => {
                setPagin(Category);
              }}
            >
              {Category}
            </button>
          </>
        );
      })}
      {details.map(data => {
        return (
          <>
            {data.Category === pagin && (
              <>
                <h3 key={data.API}>{data.API}</h3>
                <h5 key={data.API}>
                  {data.Description} & <a href={data.Link}>{data.Category}</a>
                </h5>
              </>
            )}
          </>
        );
      })}
    </div>
  );
}
