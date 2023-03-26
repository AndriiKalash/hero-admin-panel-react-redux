export const fetchHeroes = (request) => (dispatch) => {
    dispatch(heroesFetching())
    request("http://localhost:3001/heroes")
            .then(data => dispatch(heroesFetched(data)))
            .catch(() => dispatch(heroesFetchingError()))
}

export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}

export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}

export const heroAdded = (newHero) => {
    return{
         type: 'HERO_CREATED',
         payload: newHero
    }
   

}

export const heroesDelete = (heroes) => {
    return {
        type: 'HERO_DELETE',
        payload: heroes
    }
}

export const fetchFilters = (request) => (dispatch) => {
    request("http://localhost:3001/filters")
        .then(data => dispatch(filtersFetched(data)))
        .catch((err) => {
            console.warn(err);
            alert('coud not fetch');
          })
}

export const filtersFetched = (filters) => {
    return {
        type: 'FILTERS_FETCHED',
        payload: filters
    }
}



export const filterSelect = (filter) => {
    return {
        type: 'SELECTED_FILTER',
        payload: filter
    }
}

