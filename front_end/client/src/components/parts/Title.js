import React from 'react';

const Title = (props) => {
  return (
    <div>
       <div className="col-10 mx-auto my-2 text-center text-title">
        <h1 className="text-capitalize font-weight-bold">
          <span>{props.name} </span>
          <strong className="text-blue">{props.title}</strong>
        </h1>
      </div>
    </div>
  )
}

export default Title;