import { legacy_createStore as createStore, combineReducers, compose, applyMiddleware } from 'redux';
import  ReduxThunk from "redux-thunk";
import heroes from '../reducers/heroes';
import filter from '../reducers/filter';

const stringMiddleware = () => (next) => (action) => {
      if (typeof action === 'string') {
            return next ({type: action});
      }
      return next(action);
}

const store = createStore( combineReducers({heroes, filter}),
                          compose( applyMiddleware(ReduxThunk, stringMiddleware),
                               window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())       
);
     

export default store;