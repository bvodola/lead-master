import React from  'react'

const Icon = (props) => {
  const { children } = props;
  return(
    <span className='material-icons' {...props}></span>
  )
}

export default Icon