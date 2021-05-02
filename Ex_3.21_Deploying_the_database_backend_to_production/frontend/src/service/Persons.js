import React, { useState } from 'react'
import PersonServer from './PersonServer.js';

const Person = ({person,persons,setPersons, setColor, setMessage}) => {

  const [ newDelete, setNewDelete] = useState(false);

  const deleteOrNot = () =>{

    // check if user confirm the delete action
    if(window.confirm(`Are you sure you want to delete ${person.name}?`)){
      setNewDelete(true);

      PersonServer
        .remove(person.id)
        .then(response => {
          setColor("red")
          setMessage(`${person.name} is deleted`)
          setPersons(persons.filter(p => p.id !== person.id))
        })
        .catch(error => {
          setColor("red")
          setMessage(`${person.name} ${error.response.data.error}`)
          setPersons(persons.filter(p => p.id !== person.id))          
        })      
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

const Persons = ({persons, setPersons, newSearch, setMessage, setColor}) => {
 
  return (
    <div>
      {persons
      .filter((person) => person.name.toLowerCase().startsWith(newSearch.toLowerCase()))
      .map((person) => <Person 
        key = {person.id} 
        person = {person} 
        persons = {persons} 
        setPersons={setPersons} 
        setColor = {setColor}
        setMessage = {setMessage}
      />) }             
    </div> 
  ) 

}

export default Persons
