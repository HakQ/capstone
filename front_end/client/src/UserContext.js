import React, {Component} from 'react';
import {Auth} from "aws-amplify";

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
      promptConfirm:false,
      passReminder:"remember password need to be atleast 8 letters with atleast a number, lowercase, uppercase, and special symbol."
    }
  }

  handleLogin = async (em, pw, cpw)=>{
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //the regex that the email should be
    let valid_mail = (em.match(mailformat)); //check if the provided email is in that form

    //some test cases
    if(!valid_mail && false){
      this.setState({
        error_message:"Please try again. Invalid Email!",
        email:"",
        password:""
      });
    }
    else if(pw.length < 8){
        this.setState({
        error_message:"Please try again. Password too short, password has to be more than 8 letter",
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
      try {
        await Auth.signIn(em, pw);//will throw error if unsuccessful login
        this.setState({
          logged_in: !this.state.logged_in,
          email: em,
          password: pw,
          error_message:""
        });
      } 
      catch (e) {
        this.setState({
          error_message: e.message
        })
      }      
    }
  }

  handleLogout =async ()=>{
    await Auth.signOut();
    console.log("debug: logged out");
    this.setState({
      logged_in: !this.state.logged_in,
      email: "",
      password:""
    })
  }

  handleSignup= async (info)=>{
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
    else if(info.password.length < 8){
        this.setState({
        error_message:"Please try again. Password too short, password has to be more than 8 letter",
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

      //Amplify cognito signup
      try {
          await Auth.signUp({
          username: info.email,
          password: info.password,
          attributes:{
            "email": info.email,
          }
        });

        this.setState({
          //logged_in: !this.state.logged_in,
          email: info.email,
          password: info.password,
          userInfo: tempUserInfo,
          error_message:"",
          promptConfirm:true
        })
      } 
      catch (e) {
        this.setState({
          error_message: e.message
        })
      }
    }
  }

  handleSignUpConfirm = async (confirmCode) =>{
      try{
        await Auth.confirmSignUp(this.state.email, confirmCode);
        await Auth.signIn(this.state.email, this.state.password);
        this.setState({
          logged_in: !this.state.logged_in,
          promptConfirm: !this.state.logged_in
        });

      }
      catch (e) {
        this.setState({
          error_message: e.message
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
            handleSignUpConfirm: this.handleSignUpConfirm,
            error_message:this.state.error_message,
            promptConfirm:this.state.promptConfirm,
            passReminder:this.state.passReminder
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
