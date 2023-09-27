import React, { useState, useEffect } from 'react';
import Pagination from '../components/table/Pagination';
import SearchBar from '../components/searchBar/NameSearchBar';
import PokemonTableComponent from '../components/table/PokemonTable';
import PowerThresholdFilter from '../components/searchBar/PowerSearchBar';
import '../styles/styles.css';

const Pokemon = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [powerThreshold, setPowerThreshold] = useState(0);
  const [minPower, setMinPower] = useState(0);
  const [maxPower, setMaxPower] = useState(0);

  useEffect(() => {
    fetch('/pokemon.json')
      .then((response) => response.json())
      .then((data) => setPokemonData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const calculatePower = (pokemon) => {
    const { hp, attack, defense, special_attack, special_defense, speed } = pokemon;
    return hp + attack + defense + special_attack + special_defense + speed;
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(parseInt(event.target.value, 10));
    setPage(0);
  };

  const totalItems = pokemonData.length;

  const handleThresholdChange = (event) => {
    const threshold = parseInt(event.target.value, 10);
    setPowerThreshold(isNaN(threshold) ? '' : threshold.toString()); // Set as an empty string if NaN
    setPage(0);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setPage(0);
  };

  // Filter based on search query and power threshold if it's not an empty string
  const filteredPokemon = pokemonData.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (powerThreshold === '' || calculatePower(pokemon) >= parseInt(powerThreshold, 10))
  );

  // Calculate min and max power values for the currently displayed data on the current page
  useEffect(() => {
    const startIndex = page * pageSize;
    const endIndex = startIndex + pageSize;
    const visiblePokemon = filteredPokemon.slice(startIndex, endIndex);
    
    if (visiblePokemon.length > 0) {
      const min = Math.min(...visiblePokemon.map((pokemon) => calculatePower(pokemon)));
      const max = Math.max(...visiblePokemon.map((pokemon) => calculatePower(pokemon)));
      setMinPower(min);
      setMaxPower(max);
    } else {
      setMinPower(0);
      setMaxPower(0);
    }
  }, [filteredPokemon, page, pageSize]);

 

  return (
    <div>
        <div className="searchContainer"> 
          <div className="searchByName">
            <SearchBar onSearch={handleSearch} />
          </div>
          <div className="searchByPower">
            <PowerThresholdFilter onThresholdChange={handleThresholdChange} />
          </div>
          <div>
          <p>Min Power: {minPower}</p>
          <p>Max Power: {maxPower}</p>
        </div>
          
        </div>
     
       <div>
        <PokemonTableComponent
          pokemonData={filteredPokemon}
          page={page}
          pageSize={pageSize}
          searchQuery={searchQuery}
          handlePageChange={handlePageChange}
          handlePageSizeChange={handlePageSizeChange}
          calculatePower={calculatePower}
        />
        <Pagination
          page={page}
          onPageChange={handlePageChange}
          pageSize={pageSize}
          onPageSizeChange={handlePageSizeChange}
          totalItems={totalItems}
        />
      </div>
    </div>
  );
};

export default Pokemon;
