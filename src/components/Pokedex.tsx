import React from 'react';
import Container from './PokedexStyles';
import LeftPanel from './LeftPanel';
import Divider from './Divider';
import RightPanel from './RightPanel';
import { usePokemon, useProgressiveImage } from '../hooks';
import { Loading } from './shared';
import { Global, css } from '@emotion/core';
import pikachu from '../assets/pikachu.png';
import { ShortcutContextProvider, useShortcutContext } from '../components/ShortcutContext';

const Pokedex = () => {
    const { pokemon, pokemonIndex, loading, changePokemonIndex } = usePokemon();
    const loadedImage = useProgressiveImage(`/backgrounds/${getBackground()}.jpg`);

    if (loading) {
        return <Loading noBackground />;
    }

    function getBackground() {
        // pokemonIndex is guaranteed to be above 0
        if (pokemonIndex < 152 && pokemon?.pokemonData.name) {
            return pokemon?.pokemonData.name;
        }

        return 'pikachu';
    }

    return (
        <ShortcutContextProvider>
            <Container>
                <Global
                    styles={css`
                    body {
                        background-image: url(${loadedImage || pikachu});
                    }
                `}
                />
                <div className="inner-container">
                    <LeftPanel pokemon={pokemon} pokemonIndex={pokemonIndex} />
                    <Divider />
                    <RightPanel pokemon={pokemon} pokemonIndex={pokemonIndex} changePokemonIndex={changePokemonIndex} />
                </div>
            </Container>
        </ShortcutContextProvider>
    );
};

export default Pokedex;
