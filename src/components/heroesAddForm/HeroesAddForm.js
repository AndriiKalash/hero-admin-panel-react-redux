
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import { heroAdded } from "../../actions";
import {useHttp} from '../../hooks/http.hook';

const HeroesAddForm = () => {

    const {filters} = useSelector(state => state.filter);
    const dispatch = useDispatch();
    const [nameVal, setNameVal]= useState('');
    const [descriptionVal, setDescriptionVal] = useState('');
    const [elementVal, setElementVal]= useState('');
    const {request} = useHttp();
   
                                          
    const addItem = (name, description, element) => {
        const newItem =  {
            id: uuidv4(),
            name: name,
            description: description,
            element: element
        }
        const json = JSON.stringify(newItem)
        request("http://localhost:3001/heroes",'POST', json)
        .then( dispatch(heroAdded(newItem)))
        .catch((err) => {
            console.warn(err);
            alert('coud not fetch');
          })
    }

    const onSubmit = (e) =>{
         e.preventDefault();
         if (nameVal, descriptionVal, elementVal ) {
            addItem(nameVal, descriptionVal, elementVal );   
         }
         setNameVal('');
         setDescriptionVal('');
         setElementVal('');
    }
        
  


    return (
        <form onSubmit={onSubmit} className="border p-4 shadow-lg rounded">
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    onChange={(e)=> setNameVal(e.target.value)}
                    value={nameVal}
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="Как меня зовут?"/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    onChange={(e)=> setDescriptionVal(e.target.value)}
                    value={descriptionVal}
                    required
                    name="text" 
                    className="form-control" 
                    id="text" 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    onChange={(e)=> setElementVal(e.target.value)}
                    value={elementVal}
                    required
                    className="form-select" 
                    id="element" 
                    name="element">
                    <option >Я владею элементом...</option>
                    {
                        filters.filter((elem)=>{
                            return elem !== "all";
                        }).map((elem)=>{
                            // if (elem === 'all')  return;
                            return (
                                <option key={elem} value={elem}>{elem}</option>
                            )
                        })
                    }
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;