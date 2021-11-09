import React, { useState, useEffect } from 'react';
import './style.css';
import Load from './Load';
export default function App() {
  const API = 'https://api.publicapis.org/entries';
  const [details, setState] = useState([]);
  const [toggleBtn, setToggleBtn] = useState(false);
  useEffect(() => {
    fetch(API)
      .then(data => data.json())
      .then(val => setState(val.entries));
  }, []);
  const Categories = details.map(category => {
    return category.Category;
  });
  let uniqueCategories = [...new Set(Categories)];
  const [pagin, setPagin] = useState('LIST');
  const btnName = !toggleBtn ? 'Select 🔓︎' : 'Close 🔒︎';
  let color = !toggleBtn ? '#42ba96' : ' #cf142b';
  return (
    <div className="m-4 p-2">
      <h1 style={{ textAlign: 'center' }}>Ashwin's Thunder Idea⚡️</h1>
      {uniqueCategories.length == 0 ? (
        <Load className="mt-4" />
      ) : (
        <>
          <h3
            className="bg-light text-dark border border-2 p-3 m-4"
            style={{ textAlign: 'center' }}
          >
            Choose the Topic
          </h3>
          <div className="d-flex justify-content-center">
            <button
              style={{ color: color }}
              onClick={() => setToggleBtn(!toggleBtn)}
              className="btn border-info  mb-4 px-4"
            >
              {btnName}
            </button>
            <br />
          </div>

          {toggleBtn &&
            uniqueCategories.map(Category => {
              return (
                <>
                  <button
                    className="btn text-dark btn-outline-info m-1"
                    onClick={() => {
                      setPagin(Category);
                      setToggleBtn(!toggleBtn);
                    }}
                  >
                    {Category}
                  </button>
                </>
              );
            })}
          <div style={{ margin: '0% 10%' }} className="mt-5">
            <h2 className=" text-success p-3 bg-light">{pagin + ' ↓'}</h2>
            {pagin !== 'LIST' && (
              <div className=" border border-1 p-4 ">
                {details.map(data => {
                  return (
                    <>
                      {data.Category === pagin && (
                        <>
                          <h4 key={data.API}>{data.API}</h4>
                          <h5 key={data.API}>
                            {data.Description} <br />
                            LINK : <a href={data.Link}>{data.Category}</a>
                          </h5>
                          <hr />
                        </>
                      )}
                    </>
                  );
                })}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
