import React, {Component} from 'react';
import {storeProducts} from "./static/data.js";
import axios from "axios";
import {Auth} from "aws-amplify";



const ProductContext = React.createContext();
//create the provider class
class ProductProvider extends React.Component {
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
      passReminder:"remember password need to be atleast 8 letters with atleast a number, lowercase, uppercase, and special symbol.",

      product:{},
      viewProduct:{},
      cartProduct:[],
      shippingCost:0,
    }
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.product !== this.state.product) {
  //     try{
  //       if(storeProducts[0].code==400){
  //           console.log("error");
  //       }
  //       else{
  //         this.setState({product:this.state.product})
  //       }
  //     }
  //     catch(e){
  //       console.log(e);
  //     }
  //   }

  //   if (prevState.cartProduct !== this.state.cartProduct) {
  //     try{
  //       if(storeProducts[0].code==400){
  //           console.log("error");
  //       }
  //       else{
  //         this.setState({cartProduct:this.state.cartProduct})
  //       }
  //     }
  //     catch(e){
  //       console.log(e);
  //     }
  //   }
  // }

  componentWillMount(){
    try{
      if(storeProducts[0].code==400){
        console.log("error");
      }
      else{
        this.setState({product:storeProducts})
      }
    }
    catch(e){
      console.log(e);
    }

    // axios.get("http://localhost:3002/get_info",
    // {
    //   params:{
    //     upc:"888411924708"
    //   },
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // })
    // .then(res=>{
    //     let info = res;
    //     this.setState({product: info});
    //     console.log(res);
    // })
    // .catch(err=>{
    //     console.log(err);
    // })
  }

  componentDidMount() {
    // this.interval = setInterval(() => {
    //   axios.get("54.198.165.68:3003/products")
    //   .then(res=>{
    //     let info = res;
    //     this.setState({product: info});
    //     console.log(res);
    //   })
    //   .catch(err=>{
    //     console.log(err);
    //   })
    // }, 10000);

  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  /********************User Info Methods**********************/
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
////////////////////trying retrieve cart///////////
        var data = {
          "operation": "RETRIEVE",
          "cart_id": "llgkjjk"
        };
    let url='https://oef5k6v3fc.execute-api.us-east-1.amazonaws.com/default/aws-nodejs-dev-cart';
    
    await fetch(url, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      mode:'cors',
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then(res=>
      res.json()
    )
    .then(res =>{
      this.setState({
        cartProduct: res
      });
      console.log(this.state.cartProduct);
    })
    .catch(error => console.error('Error:', error));
////////////////////////////////////////////////   
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






  /*******************Product Info methods**********************/
  //functions for children to interact with the context api
  setView=(Product_id)=>{
    const tempProduct = this.state.product.find(item=>item.Product_id===Product_id);
    this.setState({
      viewProduct: tempProduct,
    })
  }

  addToCart= async (Product_id)=>{
    const addCartProduct = this.state.product.find(item=>item.Product_id===Product_id);

//////////////////adding shit to cart after you sign in/////////////////////////////////
  if(this.state.logged_in){
    var data = addCartProduct;

    let url='https://oef5k6v3fc.execute-api.us-east-1.amazonaws.com/default/aws-nodejs-dev-cart';
    await fetch(url, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      mode:'cors',
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(response => console.log('Success:', JSON.stringify(response)))
    .catch(error => console.error('Error:', error));
  }

///////////////////////////////////////////////////


    const newProducts = this.state.product.filter((item) =>{ 
      return item.Product_id !== addCartProduct.Product_id;  
    });
    let currentCart = this.state.cartProduct;
    currentCart.push(addCartProduct)

    this.setState({
      cartProduct: currentCart,
      product: newProducts
    })
  }

  cancelFromCart=(Product_id)=>{
    //find the item from cart that to be removed
    const removeCartProduct = this.state.cartProduct.find(item=>item.Product_id===Product_id); 

    //make a new cart which the selected item to be remove is not there
    const newProducts = this.state.cartProduct.filter((item) =>{ 
      return item.Product_id !== removeCartProduct.Product_id;  
    });


    let currentProducts = this.state.product;
    currentProducts.push(removeCartProduct)

    this.setState({
      cartProduct: newProducts,
      product: currentProducts
    })
  }

  expireHandler=(Product_id)=>{
    const newProducts = this.state.product.filter((item) =>{ 
      return item.Product_id !== Product_id;  
    });

    this.setState({
      product: newProducts
    })
  }

  updateFromSearch=(query)=>{
    console.log("Apache Solar: " + query);
  }

  calculateShipRate=(zipcode)=>{
    console.log("cost for " +zipcode);
  }

  render() {
    return (
      <ProductContext.Provider 
        value={
          {
            logged: this.state.logged_in,
            handleLogin:this.handleLogin, 
            handleLogout: this.handleLogout,
            handleSignup: this.handleSignup,
            handleSignUpConfirm: this.handleSignUpConfirm,
            error_message:this.state.error_message,
            promptConfirm:this.state.promptConfirm,
            passReminder:this.state.passReminder,


            message:"Message from product context",
            product: this.state.product,
            viewProduct:this.state.viewProduct,
            setView: this.setView,
            addToCart: this.addToCart,
            cartProduct:this.state.cartProduct,
            expireHandler: this.expireHandler,
            cancelFromCart:this.cancelFromCart,
            updateFromSearch: this.updateFromSearch,
            calculateShipRate: this.calculateShipRate,
            shippingCost: this.shippingCost
          }
        }
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

//create the consumer class
const ProductConsumer = ProductContext.Consumer;

export {ProductConsumer, ProductProvider};

