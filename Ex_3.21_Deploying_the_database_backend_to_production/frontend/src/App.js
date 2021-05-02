import React, { useEffect, useState } from 'react'
import Persons from './service/Persons.js'
import PersonForm from './service/PersonForm.js'
import Filter from './service/Filter.js'
import Notification from './service/Nofication.js'
import PersonServer from './service/PersonServer.js'


const App = () => {

  const [ persons, setPersons ] = useState([]); 
  const [ newSearch, setNewSearch ] = useState("");
  const [ message, setMessage ] = useState(); 
  const [ color, setColor ] = useState("");

  useEffect (()=>{
    PersonServer
    .getAll()
    .then(initialPersons => setPersons(initialPersons))
  }, [])

  const handleNewSearch = (event) => { setNewSearch(event.target.value) }

  return (
    <div>      
      
      <h2>Phonebook</h2> 
     
      <Notification message ={message} color={color} setMessage={setMessage}/>

      <Filter newSearch={newSearch} handleNewSearch={handleNewSearch} />
      
      <h3>add a new</h3>  
      <PersonForm 
        persons = {persons} 
        setPersons = {setPersons}              
        setMessage={setMessage}
        setColor = {setColor}
      />
      
      <h3>Numbers</h3>
      <Persons 
        persons = {persons} 
        setPersons = {setPersons}  
        newSearch ={newSearch}
        setMessage = {setMessage}
        setColor = {setColor}
      />

    </div>
  )
}


export default App