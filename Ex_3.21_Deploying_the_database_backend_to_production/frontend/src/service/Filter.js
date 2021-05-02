import React from 'react'

const Filter = ({newSearch, handleNewSearch}) => {	
  
  return (
    <div>      
      filter shown with <input value = {newSearch} onChange = {handleNewSearch} placeholder = 'search here...'/>      
    </div>
  )
}

export default Filter