import React, { useState } from 'react'
import PersonServer from './PersonServer.js'

const PersonForm = ({persons, setPersons, setColor, setMessage}) => {  
  
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');

  const handleNameChange = (event) => { setNewName(event.target.value); }
  const handleNumberChange = (event) => { setNewNumber(event.target.value); }

  const addName = (event) =>{
    event.preventDefault();

    const existingPerson = persons.find((person)=>person.name === newName)
    
    if (existingPerson){

        // double check if the user wants to update the contact info
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with the new one?`)){
            
        PersonServer
        .update(existingPerson.id, {
          name: newName,
          number: newNumber
        })
        .then(returnedPerson => {
          // phonenumber updated, notification will be shown
          setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson))
          setColor("green")
          setMessage(`Phone number has been updated for ${newName}`)          
          setNewName("")
          setNewNumber("")
        })        
        .catch(error => {
          setPersons(persons.filter(p => p.id !== existingPerson.id))       
          setColor("red")          
          setMessage(`${newName} ${error.response.data.error}`)  
              
        })
        
      }

    }else{
    
      const newPerson = {
        name: newName,
        number: newNumber
      }

      PersonServer
      .create(newPerson)
      .then(returnedPerson =>{                     
        setPersons(persons.concat(returnedPerson)); 
        setColor("green");
        setMessage(`Added ${newName}`);
        setNewName('');
        setNewNumber('');        
      })
      .catch(error => {
        setColor("red");
        setMessage(error.response.data.error);
      })      
    }

  }

  return (
    <div>  
      <form onSubmit = {addName}>
        <div>
          name: <input value = {newName} onChange = {handleNameChange} />
          <br/>
          number: <input value = {newNumber} onChange = {handleNumberChange} />
        </div>        
        <button type="submit">add</button>        
      </form>
    </div>
  )
}

export default PersonForm
