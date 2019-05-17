import React, {Component} from 'react';
import {storeProducts} from "./data.js";
import axios from "axios";
import {Auth} from "aws-amplify";



const ProductContext = React.createContext();

//create the provider class which manage the react state
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
      product:[],
      cartProduct:[],
      viewProduct:{},
      query:"*",
      goPayment:false,
      shipRateCost:""
    }
  }

  //every section fetch update from the backend
  componentDidMount() {
    this.interval = setInterval(() => {
     this.updateFromSearch(this.state.query);
    }, 1000);

  }

  //deconstructor for react context
  componentWillUnmount() {
    clearInterval(this.interval);
  }


  //function handleLogin(): Given a email(em) and (pw) allow the user to log on base on the credencials through cognito
  handleLogin = async (em, pw, cpw)=>{
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //the regex that the email should be
    let valid_mail = (em.match(mailformat)); //check if the provided email is in that form

    //some test cases for signin before calling the backend api
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
        await Auth.signIn(em, pw);//logging in thru cognito will throw error if unsuccessful login

        this.setState({
          logged_in: !this.state.logged_in,
          email: em,
          password: pw,
          error_message:""
        });
        //if successful login then fetch record of the items in cart of the user
        var data = {
          "operation": "RETRIEVE",
          "cart_id": em
        };
        let url='https://mhup9f5njl.execute-api.us-east-1.amazonaws.com/dev/shopping-cart-dev-cart';

        await fetch(url, {
          method: 'POST', 
          body: JSON.stringify(data), 
          mode:'cors',
          headers:{
            'Content-Type': 'application/json'
          }
        })
        .then(res=>{
          if (!res.ok) {
            throw Error(res.statusText);
          }
          return res.json()
        })
        .then((res)=> {
          if("Im empty fill me up" != res){
            let currentCart = this.state.cartProduct;
            let userCart = res;

            //decide what should be incart and what should be in the shop
            for( let i=0; i<currentCart.length; i++){
              for( let j=0; j<userCart.length; j++){
                  if(currentCart[i]._id == userCart[j]._id){
                    currentCart.splice(i, 1);
                  }
                }
            }

            //returnProduct will be return to the shop
            let returnProduct = currentCart.concat(this.state.product);

            this.setState({
              product: returnProduct,
              cartProduct: res
            });

          }
          else{
            this.setState({
              cartProduct:[]
            })
          }
        })
        .catch(error => console.error('Error:', error));
      }
      catch (e) {
        this.setState({
          error_message: e.message
        })
      }      
    }
  }

  //signout through cognito
  handleLogout =async ()=>{
    await Auth.signOut();
    console.log("debug: logged out");
    this.setState({
      logged_in: !this.state.logged_in,
      email: "",
      password:""
    })
  }

  //signup thru cognito base on the data filled from the form
  handleSignup= async (info)=>{
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let valid_mail = (info.email.match(mailformat));

    let letters = /^[A-Za-z]+$/;
    let letters_n_numbers = /^[A-Za-z0-9]+$/;
    let valid_first = !info.firstname.match(letters);
    let valid_last = !info.lastname.match(letters);
    let valid_username = !info.username.match(letters_n_numbers);



    //basic error check before calling backend
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

  //confirm the user sign up by testing out the code emailed to the user
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


  //update the quantity demanded from the user given the id of the product and the quantity to update to
  upDateQuantityDemanded=(_id, changeQuantity)=>{
    const updateProduct = this.state.cartProduct.find(item=>item._id===_id);
    updateProduct.QuantityDemand = changeQuantity;
    updateProduct.shopPrice = updateProduct.Price * changeQuantity;

    const newProducts = this.state.cartProduct.filter((item) =>{ 
      return item._id !== updateProduct._id;  
    });
    
    newProducts.push(updateProduct)

    this.setState({
      cartProduct: newProducts ,
    })
  }


  //set the view for the detail page base on which item that was click on, the id will be provided for this render
  setView=(_id)=>{
    const tempProduct = this.state.product.find(item=>item._id===_id);
    this.setState({
      viewProduct: tempProduct,
    })
  }

  //add an item to the cart
  addToCart= async (_id)=>{
    const addCartProduct = this.state.product.find(item=>item._id===_id);
    addCartProduct.QuantityDemand = 1;
    addCartProduct.shopPrice = addCartProduct.Price;


    //Adding Stuff to cart if signed in
    if(this.state.logged_in){
      var data = addCartProduct;
      
      data.operation = "ADD";
      data.cart_id = this.state.email;
      data.QuantityDemand = "1";
      data.PID = addCartProduct._id;

      console.log("GOING TO SERVER: ", data);

      let url='https://mhup9f5njl.execute-api.us-east-1.amazonaws.com/dev/shopping-cart-dev-cart';
      await fetch(url, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        mode:'cors',
        headers:{
          'Content-Type': 'application/json'
        }
      })
      .then(res=>{
        if (!res.ok) {
          throw Error(res.statusText);
        }
        return res.json()
      })
      .then(response => console.log('Success:', JSON.stringify(response)))
      .catch(error => console.error('Error:', error));
    }


    const newProducts = this.state.product.filter((item) =>{ 
      return item._id !== addCartProduct._id;  
    });


    let currentCart = this.state.cartProduct;
    currentCart.push(addCartProduct)

    this.setState({
      cartProduct: currentCart,
      product: newProducts
    })
  }

  //cancel an item from the cart
  cancelFromCart= async(_id)=>{
    //find the item from cart that to be removed
    const removeCartProduct = this.state.cartProduct.find(item=>item._id===_id);

    //remove Stuff to cart if signed in
    if(this.state.logged_in){
      var data = {
          "operation": "REMOVE",
          "cart_id": this.state.email,
          "PID":removeCartProduct._id
      }
      

      let url='https://mhup9f5njl.execute-api.us-east-1.amazonaws.com/dev/shopping-cart-dev-cart';
      await fetch(url, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        mode:'cors',
        headers:{
          'Content-Type': 'application/json'
        }
      })
      .then(res=>{
        if (!res.ok) {
          throw Error(res.statusText);
        }
        return res.json()
      })
      .then(response => console.log('Success:', JSON.stringify(response)))
      .catch(error => console.error('Error:', error));
    }



    //make a new cart which the selected item to be remove is not there
    const newProducts = this.state.cartProduct.filter((item) =>{ 
      return item._id !== removeCartProduct._id;  
    });



    let currentProducts = this.state.product;
    currentProducts.push(removeCartProduct)

    this.setState({
      cartProduct: newProducts,
      product: currentProducts
    })
  }

  //when an item expire, this will remove that item from the app
  expireHandler=(_id)=>{
    const newProducts = this.state.product.filter((item) =>{ 
      return item._id !== _id;  
    });

    const newCartProducts = this.state.cartProduct.filter((item) =>{ 
      return item._id !== _id;  
    });


    this.setState({
      product: newProducts,
      cartProduct:newCartProducts
    })
  }


  //fetch data from backend base on the query provided
  updateFromSearch= async (query)=>{
    
    let url = "http://ec2-3-86-76-11.compute-1.amazonaws.com:8983/solr/itemcore/select?q=Title:"+query;

    await fetch(url, {
        method: 'GET', 
        mode:'cors',
        headers:{
          'Content-Type': 'application/json'
        }
      })
      .then(res=>{
        if (!res.ok) {
          throw Error(res.statusText);
        }
        return res.json()
      })
      .then(res =>{
        let databaseProducts = res.response.docs.filter((item) =>{ 
          return item.soldOut !== true;  
        });


        let currentCart = this.state.cartProduct;
        let userProduct = res.response.docs;

        for( let i=0; i<userProduct.length; i++){
          for( let j=0; j<currentCart.length; j++){
              if(currentCart[i]._id == userProduct[j]._id){
                userProduct.splice(i, 1);
              }
            }
        }

        this.setState({
          product: userProduct,
          query: query
        });
      

      })
      .catch(error => console.error('Error:', error));

  }

  //submit the address to backend and receive a shipping cost back and send out labels
  handleSubmitAddress = async(address)=>{

    //var dataAddress = [{"email":"francis.irizarry52@myhunter.cuny.edu"}]
    var dataAddress = [];

    let myCart = this.state.cartProduct;

    //find out all of the sellers email
    for(let i=0; i < myCart.length; i++){
      dataAddress.push({email:myCart[i].Seller_id});
    }


    //call get-rate-id
    var url = 'https://nbcde382k3.execute-api.us-east-1.amazonaws.com/dev/get-rate-id';
    var data = 
    {
      "emails": dataAddress,
      "addressTo": 
      {

        "name": address.firstName+" "+address.lastName,
        "street1": address.address,
        "city": address.city,
        "state": address.state,
        "zip": address.zipcode,
        "country": "US",
        "email": this.state.email
      },
      Title:"Nike Hoodie"
    };
    fetch(url, {
      method: 'POST', 
      body: JSON.stringify(data),
      mode:'cors',
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(response => {
      let ArrayResponse=[];
      let totalCost=0;

      for(let i=0; i < response.length; i++){
        let res_JSON = JSON.parse(response[0].body);
        totalCost = totalCost + res_JSON.cost;
        ArrayResponse.push(res_JSON);
      }

      this.setState({shipRateCost: totalCost})


      //call get label
      var newurl = 'https://j55mjh7ksh.execute-api.us-east-1.amazonaws.com/dev/get-labels';
      var newdata = {
        "customer_email": this.state.email,
        "rates": ArrayResponse
      };
      fetch(newurl, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(newdata), // data can be `string` or {object}!
        mode:'cors',headers:{
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(response => console.log('Success:', JSON.stringify(response)))
      .catch(error => console.error('Error:', error));

    })
    .catch(error => console.error('Error:', error));
   


    this.setState({goPayment:true})

         
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
            shippingCost: this.shippingCost,
            handleSubmitAddress: this.handleSubmitAddress,
            goPayment:this.state.goPayment,
            upDateQuantityDemanded:this.upDateQuantityDemanded,
            shipRateCost:this.state.shipRateCost
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



