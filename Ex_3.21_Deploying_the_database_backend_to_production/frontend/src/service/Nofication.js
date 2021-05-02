

const Notification = ({message, color, setMessage}) => {

    const notificationStyle = {
      color: color,
      background: 'lightgrey',
      borderStyle: 'solid',
      borderRadius: '5px',
      fontSize: 25,
      padding: '10px',
      marginBottom: '20px'
    }
    
    setTimeout(() => {
      setMessage();
    },5000) 
    
    if(!message){
      return (<p></p>)
    }else{
      return (
        <div style={notificationStyle}> 
          {message}
        </div>
      ) 
    }
  }

  export default Notification