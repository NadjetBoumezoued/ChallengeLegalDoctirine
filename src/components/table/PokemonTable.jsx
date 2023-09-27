import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const PokemonTable = ({ pokemonData, page, pageSize, searchQuery, handlePageChange, handlePageSizeChange, calculatePower }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow style={{ backgroundColor: 'lightgray' }}>
            <TableCell>ID</TableCell>
            <TableCell>name</TableCell>
            <TableCell>type</TableCell>
            <TableCell>health</TableCell>
            <TableCell>attack</TableCell>
            <TableCell>defense</TableCell>
            <TableCell>special_attack</TableCell>
            <TableCell>special_defense</TableCell>
            <TableCell>speed</TableCell>
            <TableCell>power</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pokemonData.slice(page * pageSize, (page + 1) * pageSize).map((pokemon) => (
            <TableRow key={pokemon.id}>
              <TableCell>{pokemon.id}</TableCell>
              <TableCell>{pokemon.name}</TableCell>
              <TableCell>
                {pokemon.type.length > 1 ? pokemon.type.join(',') : pokemon.type[0]}
              </TableCell>
              <TableCell>{pokemon.hp}</TableCell>
              <TableCell>{pokemon.attack}</TableCell>
              <TableCell>{pokemon.defense}</TableCell>
              <TableCell>{pokemon.special_attack}</TableCell>
              <TableCell>{pokemon.special_defense}</TableCell>
              <TableCell>{pokemon.speed}</TableCell>
              <TableCell>{calculatePower(pokemon)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PokemonTable;
