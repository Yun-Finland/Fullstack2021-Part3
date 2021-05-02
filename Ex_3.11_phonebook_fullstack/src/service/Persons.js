import React, { useState } from 'react'
import PersonServer from './PersonServer.js';

const Person = ({person}) => {

  const [ newDelete, setNewDelete] = useState(false);

  const deleteOrNot = () =>{

    // check if user confirm the delete action
    if(window.confirm(`Are you sure you want to delete ${person.name}?`)){
      setNewDelete(true);
      PersonServer.remove(person.id);
    }
  }
  
  if (!newDelete){
    return (
      <div>
        <ul>
          {person.name} {person.number} 
          <button onClick={deleteOrNot}>delete</button>
        </ul>
      </div>
    )
  } else {
    return(
      <div></div>
    )
  }

 
}

const Persons = ({persons, newSearch}) => {
  
  return (
    <div>
      {persons
      .filter((person) => person.name.toLowerCase().startsWith(newSearch.toLowerCase()))
      .map((person) => <Person key = {person.id} person = {person} />) }             
    </div> 
  ) 
}

export default Persons
