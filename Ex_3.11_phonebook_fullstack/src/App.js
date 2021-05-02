import React, { useEffect, useState } from 'react'
import Persons from './service/Persons.js'
import PersonForm, { Notification } from './service/PersonForm.js'
import Filter from './service/Filter.js'
import PersonServer from './service/PersonServer.js'


const App = () => {

  const [ persons, setPersons ] = useState([]); 
  const [ newSearch, setNewSearch ] = useState("");

  useEffect (()=>{
    PersonServer
    .getAll()
    .then(initialPersons => setPersons(initialPersons))
  }, [])
  
  return (
    <div>      
      
      <h2>Phonebook</h2> 
     
      <Notification />
      <Filter newSearch={newSearch} setNewSearch={setNewSearch} />
      
      <h3>add a new</h3>  
      <PersonForm persons = {persons} setPersons = {setPersons} />
      
      <h3>Numbers</h3>
      <Persons persons = {persons} newSearch ={newSearch}/>

    </div>
  )
}


export default App