# SnapChaChing Front-End Design

The website is officially hosted on the aws-s3 @ www.snapchaching.com

This Project is build with the react library and bootstraped with "create-react-app".  Resources that were also use to build this project are
styled-component, react-context-api, bootstrap, font-awesomeness. Many of the images are taken from www.unsplash.com. The styling of the website are mostly done through style-component which provide sass  styling to the website

## How to run the program locally
1. clone the application
2. Go into the client folder
3. while inside the client folder run `npm install` which will install the depended node modules; make sure you have npm on your machine
4. run `npm start` to start the react app locally

## Code Structure
    Inside `client folder` is where all the codes are located

    Public: where all the image and logo assets are kept. The core index.html is also located here

    Src: react source code. Allthe code below are front-end web view only
      ->App.js: where the react app and routes is set up
      ->App.css: global style for the website
      ->config.js: configuration for aws cognito security service
      ->index.js: where the reactDom renders and cognito configuration is setup
      ->data.js: locally tested data
      ->ProductContext.js: state manager where most of the web state is kept(similar to redux).
          class ProductProvider: the class that manages the state
            -handleLogin(em, pw): handles login through amplify cognito given a active email and pw
            -handleLogout(): sign the user out by disconnecting the account through cognito
            -handleSignup(): allow the user to sign up to the website
            -handleSignUpConfirm(): after the user signup, a code will be provide through email, use that code to confirm signup
            -upDateQuantityDemanded(id, changeQuantity): change the quantity demanded by the user to changeQuantity of the product with such id
            -setView(id): change the view of the detail page to the product with the given id
            -addToCart(id): add the product with given id to the cart
            -cancelFromCart(id): remove the product with such id from the cart
            -expireHandler(id): If the product life time in the shop is over, this function will remove that product
            -updateFromSearch(query): update the items displayed in the shop base on the query specified
            -handleSubmitAddress(address): handle user submitting purchase address form
            **Note: The functions and state of the class can be use anywhere in which ProductConsumer is included**
      Utility -> ScrollToTop.js: script use to solve the issue where the webpage don't start at the top of scroll height
      Components: the Folder in which all of the components are kept
        ->About->About.js: The about us page
        ->Account
          ->Account.js: Included on the Navbar to route to the login/signup page
          ->Login.js: the login page
          ->Signup.js: the Signup page
          ->SignupConfirm.js: confirm signup page in which the user enter the code emailed to the user when they signup
        ->Browse: collection of pages for item displaying on the website
          ->Browse.js: the page where the items are display
          ->ProductList.js The collections of product that is to be displayed
          ->Product.js: A single product that will be display
          ->Detail.js: the page when a product is clicked and more details is shown about the product
          ->Timer.js: To render the countdown timer of each product. When the timer reaches 0:0:0 the item will be remove from display
        ->Cart: the collection of cart related pages
          ->Cart.js: the cart page
          ->CartProduct.js: displaying each product in the cart page
          ->CheckoutForm: after the user clicked proceed to checkout, the will fill out the address form which we will use to calculate rate
          ->PaypalBtn: Payment page through payapl after the button is clicked
        ->Default->Default.js: the default page
        ->Guide->Guide.js: the guide page for becoming a reseller and using our platform
        ->Home
          ->Home.js: Home page
          ->ControlledCarousel.js: carousel that is displayed on the home page
        ->Navbar.js: navbar of the website
        ->Footer.js: Footer of the website


## Backend
This application is client-side-rendering(CSR) design in which the activity on the website is manage through react and front-end code only.
The backend provided a nice easy to use rest api which power the website core functionality and database storage.
This react app is connected to the backend created by Deion Bacchus and Francis Irizarry

## Language
Javascript, HTML, CSS

### Author
Qiuqun Wang, Nelson Wong







