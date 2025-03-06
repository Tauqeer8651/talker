import React from 'react';
import ChatBox from './components/chat/Chat';
import Login from "./components/chat/Login.jsx";

function App() {
  const user = false;
  return (
    <div className="App">
       {user ? (
        <>
          <h1>Private Talker</h1>
      <ChatBox />
      <p>
     
     Hii This is a simple chatting application where you can talk anonymously without using any account or name.
     <b>if you have any problem contact us or send us your feedback on  <a href="mailto:tauqeeralam108@gmail.com?subject=Support Request&body=Hello, I need help with...">Contact Support</a> </b>   
    
      </p>
        </>
      ) : (
      
         <Login />  
      )}
      
      
     
    </div>
  );
}

export default App;
