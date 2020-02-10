import React from 'react';
import './style.css';


function Home(properties){

  console.log(localStorage.getItem('id'));
  console.log(localStorage.getItem('token'))
  let id = localStorage.getItem('id')
  let token = localStorage.getItem('token')

  return (
    <p>hello {id} : {token} </p>
  )

}

export default Home
