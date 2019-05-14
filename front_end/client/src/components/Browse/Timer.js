/*****************************************************************
Timer Component: given a date as a prop, will create a timer that 
start a count down until that date
*******************************************************************/
import React from 'react';
import {ProductConsumer} from "../../ProductContext.js";

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      time: new Date(),
      count:0
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      let tempDate = this.state.time;
      tempDate.setSeconds(tempDate.getSeconds() + 1);
      this.setState({time:tempDate});
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    //figure out the clock logic
    let expire = new Date(this.props.expire); 
    let now = new Date().getTime();

    let temp = new Date();


    let days = 0;
    let hours = 0;
    let mins = 0;
    let secs = 0;

    let t = expire - now;
    
    if (t >= 0) {
      days = Math.floor(t / (1000 * 60 * 60 * 24));
      hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      mins = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
      secs = Math.floor((t % (1000 * 60)) / 1000);

    }
    else{
      console.log("time expired");
    }

    //return times
    return (
      <ProductConsumer>{(value)=>{
        if(days==0 && hours==0 && mins==0 && secs==0){
          value.expireHandler(this.props.id);
        }

        return(  
            <span>{hours}:{mins}:{secs}</span>
        )
      }}
      </ProductConsumer>  
    );
  }
}

export default Timer;