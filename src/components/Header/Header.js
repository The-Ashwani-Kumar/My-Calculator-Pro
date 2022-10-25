import React, { useRef, useEffect } from 'react'

import './Header.css';

const Header = (props) => {

    const resultRef = useRef();
    const expressionRef = useRef();

    useEffect(() => {
      resultRef.current.scrollIntoView({behavior : "smooth"});
    }, [props.history])
    
    useEffect(() => {
      expressionRef.current.scrollLeft = expressionRef.current.scrollWidth;
    }, [props.expression])
    

  return (
    <div className='header custom-scroll'>
        <div className="header-history">
          {
            props.history &&
            props.history?.map((item) => <p key={item+Math.random()*34} > {item} </p>)
          }
        </div><br/> 
        <div ref={expressionRef} className="header-expression custom-scroll">
          <p> {props.expression} </p>
        </div>
        <p ref={resultRef} className='header-result'>{props.result}</p>
    </div>
  )
}

export default Header