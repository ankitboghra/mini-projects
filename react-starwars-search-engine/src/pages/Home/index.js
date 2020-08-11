import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './index.css';
import loaderGif from '../../assets/loader.gif';
import searchIconPng from '../../assets/searchIcon.svg';
import constants from '../../utils/constants';
import logo from './star-wars-logo.png';
import {
  throttle,
  extractPersonId,
  getDataFromUrls,
} from '../../utils/utilFunctions';

const getPeople = async (searchQuery, setPeople, setLoader) => {
  if (searchQuery.length === 0) return setPeople([]);

  const receiveData = (data) => {
    const peopleList = data.results;

    if (peopleList.length > constants.maxPeopleDisplayCount) {
      peopleList.splice(constants.maxPeopleDisplayCount, peopleList.length);
    }
    setPeople(peopleList);
  };

  getDataFromUrls(
    `${constants.baseApiUrl}people/?search=${searchQuery}`,
    receiveData
  ).then(setLoader(false));
};

const throttledGetPeople = throttle(
  getPeople,
  constants.searchThrottleDuration
);

const preThrottledGetPeople = (searchInput, setSearchResult, setLoader) => {
  // Events to handle before, irrespective of throttling
  if (searchInput.length !== 0) setLoader(true);

  // throttle
  throttledGetPeople(searchInput, setSearchResult, setLoader);
};

function HomePage() {
  const [searchInput, setSearchInput] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    preThrottledGetPeople(searchInput, setSearchResult, setLoader);
  }, [searchInput]);

  return (
    <div>
      <div className="logo">
        <img src={logo} alt="Star Wars Logo" />
      </div>

      <div className="search-container">
        <input
          className="search-input"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search by name"
        />
        {loader && searchInput.length !== 0 ? (
          <img src={loaderGif} className="search-loader" />
        ) : (
          <img src={searchIconPng} className="search-icon" />
        )}
        {searchInput.length ? (
          <div className="search-clear" onClick={() => setSearchInput('')}>
            X<span className="search-clear-seperator">|</span>
          </div>
        ) : null}
      </div>
      {searchResult.length > 0 && (
        <div className="search-results">
          {searchResult.map((person) => (
            <Link
              to={{
                pathname: `/person/${extractPersonId(person.url)}`,
              }}
              key={person.url}
            >
              <div className="person">
                <div className="person-left">
                  <p className="person-name">{person.name}</p>
                  <p className="person-birth-year">{person.birth_year}</p>
                </div>
                <div className="person-right">
                  <p className="person-gender">{person.gender}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;
