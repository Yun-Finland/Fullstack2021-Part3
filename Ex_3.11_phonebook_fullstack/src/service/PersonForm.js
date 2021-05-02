import React, { useState } from 'react'
import PersonServer from './PersonServer.js'

const note = {
  /*use code for different situations:
    "0": normal
    "1": add a new contact info
    "2": update the existing contact info
    "3": trying to update the contact info which has been removed already from the server
  */
  situationCode: 0,
  newPerson: null
}

const Notification = () => {

  const [message, setMessage] = useState("");

  const [newStyle, setNewStyle] = useState();

  const notificationStyle = {
      color: 'green',
      background: 'lightgrey',
      borderStyle: 'solid',
      borderRadius: '5px',
      fontSize: 25,
      padding: '10px',
      marginBottom: '20px'

  }

  if(note.situationCode === 1){
    
    setNewStyle({...notificationStyle, color:'green'});
    setMessage(`Added ${note.newPerson.name}`);
  } 
  
  if(note.situationCode === 2){

    setNewStyle({...notificationStyle, color:'green'});
    setMessage(`Phone number has been updated for ${note.newPerson.name}`)
  }
  
  if(note.situationCode === 3){
    
    setNewStyle({...notificationStyle, color:'red'});
    setMessage(`${note.newPerson.name} has already been removed from the server`)
  }

  setTimeout(() => {
    setMessage("")
    setNewStyle()
  },5000) 
  
  note.situationCode = 0

  return (
    <div style={newStyle}> 
      {message}
    </div>
  )

}

const PersonForm = ({persons, setPersons}) => {  
  
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');

  const handleNameChange = (event) => { setNewName(event.target.value); }
  const handleNumberChange = (event) => { setNewNumber(event.target.value); }

  const addName = (event) =>{
    event.preventDefault();
    
    if(persons.length && (persons
      .map((person)=>person.name)
      .includes(newName))) {

        // double check if the user wants to update the contact info
        if(window.confirm(`${newName} is already added to phonebook, replace the old number with the new one?`)){
          const existingPerson = persons.find(person => person.name === newName)
          
          const changedPerson = {...existingPerson, number: newNumber}
  
          PersonServer
          .update(existingPerson.id, changedPerson)
          .then(returnedPerson => {
            // phonenumber updated, notification will be shown
            note.situationCode = 2
            note.newPerson = {...changedPerson}
            setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson))
          })
          .catch(error => {
            note.situationCode = 3
            note.newPerson = {...changedPerson}
            setPersons(persons.filter(person => person.id !== existingPerson.id))
          }) 

        }

    }else{
      
      note.newPerson = {
        name: newName,
        number: newNumber
      }

      PersonServer
      .create(note.newPerson)
      .then(returnedPerson =>{             
        setPersons(returnedPerson);   
        setNewName('');
        setNewNumber('');        
      })

      note.situationCode = 1;
      
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
export {Notification}
