import React, { useState, useEffect } from 'react';
import './App.css'; // Make sure this is correct based on where your CSS is
import { fetchBreeds } from './api';
import caucasianShepherdDogImage from './images/caucasian-shepherd-dog.jpg'; // Import the specific image for Caucasian Shepherd Dog
import barbetImage from './images/barbet.jpg';
import belgianLaekenoisImage from './images/belgian-laekenois.jpg';
import belgianMalinoisImage from './images/belgian-malinois.jpg';
import belgianSheepdogImage from './images/belgian-sheepdog.jpg';
import belgianTervurenImage from './images/belgian-tervuren.jpg';
import bergerPicardImage from './images/berger-picard.jpg';
import borderCollieImage from './images/border-collie.jpg';
import bouvierDesFlandresImage from './images/bouvier-des-flandres.jpg';
import curlyCoatedRetrieverImage from './images/curly-coated-retreiver.jpg';
import grandBassetGriffonVendeenImage from './images/grand-basset-griffon-vendeen.jpg';
import hanoverianScenthoundImage from './images/hanoverian-scenthound.jpg';
import hokkaidoImage from './images/hokkaido.jpg';
import japaneseTerrierImage from './images/japanese-terrier.jpg';
import skyeTerrierImage from './images/skye-terrier.jpg';
import tibetanSpanielImage from './images/tibetan-spaniel.jpg';


function App() {
  const [breed, setBreed] = useState(null);
  const [loading, setLoading] = useState(false);
  const [banList, setBanList] = useState([]);

  const breedImages = {
    'Barbet': barbetImage,
    'Belgian Laekenois': belgianLaekenoisImage,
    'Belgian Malinois': belgianMalinoisImage,
    'Belgian Sheepdog': belgianSheepdogImage,
    'Belgian Tervuren': belgianTervurenImage,
    'Berger Picard': bergerPicardImage,
    'Border Collie': borderCollieImage,
    'Bouvier des Flandres': bouvierDesFlandresImage,
    'Caucasian Shepherd Dog': caucasianShepherdDogImage,
    'Curly-Coated Retriever': curlyCoatedRetrieverImage,
    'Grand Basset Griffon Vendéen': grandBassetGriffonVendeenImage,
    'Hanoverian Scenthound': hanoverianScenthoundImage,
    'Hokkaido': hokkaidoImage,
    'Japanese Terrier': japaneseTerrierImage,
    'Skye Terrier': skyeTerrierImage,
    'Tibetan Spaniel': tibetanSpanielImage,
};

  const handleFetchBreeds = async () => {
    setLoading(true);
    try {
      const data = await fetchBreeds();
      let randomBreed = data.data[Math.floor(Math.random() * data.data.length)];
      // Check if the random breed has any attributes from the ban list
      while (randomBreed && Object.entries(randomBreed.attributes).some(([name, value]) => banList.includes(`${name}: ${value}`))) {
        randomBreed = data.data[Math.floor(Math.random() * data.data.length)];
      }
      setBreed(randomBreed);
    } catch (error) {
      console.error(error);
      setBreed(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetchBreeds();
  }, []);

  const handleAttributeClick = (attribute) => {
    // Add the attribute to the ban list
    setBanList([...banList, attribute]);
    // Fetch a new breed without attributes from the ban list
    handleFetchBreeds();
  };

  return (
    <div className="App">
      {breed && (
        <div className="card">
          <h2>{breed.attributes.name}</h2>
          {/* Conditionally render the specific image if available */}
          {breed.attributes.name in breedImages && (
            <img src={breedImages[breed.attributes.name]} alt={breed.attributes.name} />
          )}
          <p>{breed.attributes.description}</p>
        </div>
      )}
      <button onClick={handleFetchBreeds} disabled={loading}>
        {loading ? 'Loading...' : 'Show Random Breed'}
      </button>
      <div className="button-container">
        {breed &&
          Object.entries(breed.attributes)
            .filter(([name]) => !banList.includes(`${name}: ${breed.attributes[name]}`))
            .map(([name, value]) => (
              <button
                key={name}
                onClick={() => handleAttributeClick(`${name}: ${typeof value === 'object' ? JSON.stringify(value) : value}`)}
              >
                {`${name}: ${typeof value === 'object' ? JSON.stringify(value) : value}`}
              </button>
            ))}
      </div>
      <div className="ban-list">
        <h3>Ban List:</h3>
        <ul>
          {banList.map((attribute, index) => (
            <li key={index}>{attribute}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
