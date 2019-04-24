import React, {Component} from 'react';

/*****Implementing Context APi for user info*********/
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
      error_message:"",
      hide_nav: false,
    }
  }

  handleLogin = (em, pw, cpw)=>{
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let valid_mail = (em.match(mailformat));

    if(!valid_mail){
      this.setState({
        error_message:"Please try again. Invalid Email!",
        email:"",
        password:""
      });
    }
    else if(pw.length < 6){
        this.setState({
        error_message:"Please try again. Password too short, password has to be more than 6 letter",
        email:"",
        password:""
      });
    }
    else if (pw.search(/[a-z]/) < 0) {
      this.setState({
        error_message:"Please try again. password need atleast one lowercase letter",
        email:"",
        password:""
      });
    } 
    else if(pw.search(/[A-Z]/) < 0) {
      this.setState({
        error_message:"Please try again. password need atleast one uppercase letter",
        email:"",
        password:""
      });
    } 
    else if(pw.search(/[0-9]/) < 0) {
      this.setState({
        error_message:"Please try again. password need atleast one number",
        email:"",
        password:""
      });
    }
    else{
      this.setState({
          logged_in: !this.state.logged_in,
          email: em,
          password: pw,
          error_message:""
      });
    }
  }

  handleLogout =()=>{
    console.log("debug: logged out");
    this.setState({
      logged_in: !this.state.logged_in,
      email: "",
      password:""
    })
  }

  handleSignup=(info)=>{
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let valid_mail = (info.email.match(mailformat));

    let letters = /^[A-Za-z]+$/;
    let letters_n_numbers = /^[A-Za-z0-9]+$/;
    let valid_first = !info.firstname.match(letters);
    let valid_last = !info.lastname.match(letters);
    let valid_username = !info.username.match(letters_n_numbers);



    if(!valid_mail){
      this.setState({
        error_message:"Please try again. Invalid Email!",
        email:"",
        password:""
      });
    }
    else if(info.password.length < 6){
        this.setState({
        error_message:"Please try again. Password too short, password has to be more than 6 letter",
        email:"",
        password:""
      });
    }
    else if (info.password.search(/[a-z]/) < 0) {
      this.setState({
        error_message:"Please try again. password need atleast one lowercase letter",
        email:"",
        password:""
      });
    } 
    else if(info.password.search(/[A-Z]/) < 0) {
      this.setState({
        error_message:"Please try again. password need atleast one uppercase letter",
        email:"",
        password:""
      });
    } 
    else if(info.password.search(/[0-9]/) < 0) {
      this.setState({
        error_message:"Please try again. password need atleast one number",
        email:"",
        password:""
      });
    }
    else if(info.password != info.confirm_password){
        this.setState({
        error_message:"Please try again. Password does not match",
        email:"",
        password:""
      });
    }
    else if(valid_first){
      this.setState({
        error_message:"Please try again. Invalid first name",
        email:"",
        password:""
      });
    }
    else if(valid_last){
      this.setState({
        error_message:"Please try again. invalid last name",
        email:"",
        password:""
      });
    }
    else if(valid_username){
      this.setState({
        error_message:"Please try again. invalid username",
        email:"",
        password:""
      });
    }
    else{
      let tempUserInfo = {
        username: info.username,
        firstname: info.firstname,
        lastname: info.lastname
      }
      this.setState({
        logged_in: !this.state.logged_in,
        email: info.email,
        password: info.password,
        userInfo: tempUserInfo,
        error_message:""
      })
    }

  }


  render() {
    return (
      <UserContext.Provider 
        value={
          {
            logged: this.state.logged_in,
            handleLogin:this.handleLogin, 
            handleLogout: this.handleLogout,
            handleSignup: this.handleSignup,
            error_message:this.state.error_message,
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
