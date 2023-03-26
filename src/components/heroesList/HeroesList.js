import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup} from 'react-transition-group';

import {useHttp} from '../../hooks/http.hook';
import { heroesDelete, fetchHeroes } from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

const HeroesList = () => {

    const {heroes, heroesLoadingStatus} = useSelector(state => state.heroes);
    const {selectionfilter} = useSelector(state => state.filter);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(fetchHeroes(request));
    }, []);

    const onClickDelite = useCallback ( id => {
        request(`http://localhost:3001/heroes/${id}`,"DELETE")
        .then(dispatch(heroesDelete(id)))
        .catch((err) => {
            console.warn(err);
            alert('coud not fetch');
          }); 
    } , [request] );
      
    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }
     
     return arr.filter((obj) => (
         selectionfilter !== 'all' ? obj.element === selectionfilter : obj)
     )
           .map(({ id, ...props}) => {
            return (       
                   <CSSTransition  
                                 key={id}
                                 timeout={500} 
                               >
                   <HeroesListItem  
                                    {...props}
                                    onClickDelite={()=>onClickDelite(id)}/>
                   </CSSTransition>                
            )
        })
    }

    const elements = renderHeroesList(heroes);

    return (
        
        <TransitionGroup component = 'ul'>
            {elements}
        </TransitionGroup>
    )
}

export default HeroesList;