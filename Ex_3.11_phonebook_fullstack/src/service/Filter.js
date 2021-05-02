import React from 'react'

const Filter = ({newSearch, setNewSearch}) => {	

  const handleNewSearch = (event) => { setNewSearch(event.target.value)}

  return (
    <div>      
      filter shown with <input value = {newSearch} onChange = {handleNewSearch} placeholder = 'search here...'/>      
    </div>
  )
}

export default Filter