import React, { useState, useEffect } from 'react';
import constants from '../../utils/constants';
import { useParams, Link } from 'react-router-dom';

import './index.css';
import { getDataFromUrls } from '../../utils/utilFunctions';

function Person() {
  const personId = useParams().id;
  const [person, setPerson] = useState({});
  const [homeworld, setHomeworld] = useState('');
  const [species, setSpecies] = useState([]);
  const [films, setFilms] = useState([]);
  const [starships, setStarships] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  // get persons data
  useEffect(() => {
    const personUrl = constants.baseApiUrl + `people/${personId}`;
    getDataFromUrls(personUrl, setPerson);
  }, [personId]);

  // get related urls data, after person data is loaded
  useEffect(() => {
    getDataFromUrls(person.homeworld, setHomeworld);
    getDataFromUrls(person.species, setSpecies);
    getDataFromUrls(person.films, setFilms, 'title');
    getDataFromUrls(person.starships, setStarships);
    getDataFromUrls(person.vehicles, setVehicles);
  }, [person]);

  const {
    birth_year,
    gender,
    hair_color,
    height,
    mass,
    name,
    skin_color,
  } = person;

  return (
    <div className="container">
      <h1>{name}</h1>

      <div className="details-container">
        <div className="detail-container">
          <h2>About</h2>
          <div className="detail-section">
            <span className="detail">
              <span className="detail-name">Gender</span>
              <span className="detail-value">{gender}</span>
            </span>
            <span className="detail">
              <span className="detail-name">Home world</span>
              <span className="detail-value">{homeworld.name}</span>
            </span>
            <span className="detail">
              <span className="detail-name">Birth year</span>
              <span className="detail-value">{birth_year}</span>
            </span>
            <span className="detail">
              <span className="detail-name">Hair colour</span>
              <span className="detail-value">{hair_color}</span>
            </span>
            <span className="detail">
              <span className="detail-name">Height</span>
              <span className="detail-value">{height}</span>
            </span>
            <span className="detail">
              <span className="detail-name">Mass</span>
              <span className="detail-value">{mass}</span>
            </span>
            <span className="detail">
              <span className="detail-name">Skin colour</span>
              <span className="detail-value">{skin_color}</span>
            </span>
          </div>
        </div>

        {species.length === 0 ? null : (
          <div className="detail-container">
            <h2>Species</h2>
            <div className="detail-section">
              {species.map((specie) => (
                <span className="detail" key={specie}>
                  <span className="detail-value">{specie}</span>
                </span>
              ))}
            </div>
          </div>
        )}

        {films.length === 0 ? null : (
          <div className="detail-container">
            <h2>Films</h2>
            <div className="detail-section">
              {films.map((film) => (
                <span className="detail" key={film}>
                  <span className="detail-value">{film}</span>
                </span>
              ))}
            </div>
          </div>
        )}

        {starships.length === 0 ? null : (
          <div className="detail-container">
            <h2>Starships</h2>
            <div className="detail-section">
              {starships.map((starship) => (
                <span className="detail" key={starship}>
                  <span className="detail-value">{starship}</span>
                </span>
              ))}
            </div>
          </div>
        )}

        {vehicles.length === 0 ? null : (
          <div className="detail-container">
            <h2>Vehicles</h2>
            <div className="detail-section">
              {vehicles.map((vehicle) => (
                <span className="detail" key={vehicle}>
                  <span className="detail-value">{vehicle}</span>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
      <Link className="back-button" to="/">
        Back to Homepage
      </Link>
    </div>
  );
}

export default Person;
