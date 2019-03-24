import React, {Component} from 'react';

const UserContext = React.createContext();

//create the provider class
class UserProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      userInfo:{},
      logged_in: false,
    }
  }

  handleLogin = (em, pw)=>{
    console.log("debug: logged in");
    this.setState({
      logged_in: !this.state.logged_in,
      email: em,
      password: pw
    },() => {console.log("debug: ", this.state.email, this.state.password, this.state.logged_in)});
  }

  handleLogout =()=>{
    console.log("debug: logged out");
    this.setState({
      logged_in: !this.state.logged_in
    })
  }

  handleSignup=(info)=>{
    console.log("debug: signup");
    let tempUserInfo = {
      username: info.username,
      firsname: info.firstname,
      lastname: info.lastname
    }
    this.setState({
      logged_in: !this.state.logged_in,
      email: info.email,
      password: info.password,
      userInfo: tempUserInfo
    }, ()=>console.log("debug state info:",this.state))
  }


  render() {
    return (
      <UserContext.Provider 
        value={
          {
            logged: this.state.logged_in,
            handleLogin:this.handleLogin, 
            handleLogout: this.handleLogout,
            handleSignup: this.handleSignup
          }
        }
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

//create the consumer class
const UserConsumer = UserContext.Consumer;

export {UserConsumer, UserProvider};
