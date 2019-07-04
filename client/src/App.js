import React from 'react';
// import axios from 'axios';
import './Components/bootstrap.css';
import './App.css';

class App extends React.Component {
   constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }
  
  // setStateHandler(event) {
  //     var user = document.getElementById('user');
  //     var pass = document.getElementById('pass');

  //     const cred = {user, pass};

  //     // axios
  //     //   .post('http://localhost:4000/api', cred)
  //     //   .then(() => console.log('Book Created'))
  //     //   .catch(err => {console.error(err);});
  // };

  render() {
    return (
       <div style={{padding: 50}}>
       <p className="App-intro">{this.state.apiResponse}</p>
       <form method='POST' action='https://akashsuper2000.github.io/aums-evaluation/api'>
        <h1 style={{fontSize: 100}}>Sign In</h1>
          <input style={{marginTop: 50, width: 500, borderColor: "black", borderWidth: 2, borderRadius: 5, padding: 10, display: 'block'}} type="text" name='user' id="user" placeholder="Username"/>
          <input style={{marginTop: 50, width: 500, borderColor: "black", borderWidth: 2, borderRadius: 5, padding: 10, display: 'block'}} type="password" name='pass' id="pass" placeholder="Password"/>
          <input style={{marginTop: 50, borderWidth: 2, borderColor: 'black'}} className="btn-lg btn btn-light" type="submit" value="Fill it up for me!"/>
      </form>
      </div>
    );
  }
}

export default App;
