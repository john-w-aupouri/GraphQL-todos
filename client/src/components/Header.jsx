import React from 'react'
import graphqlLogo from '../assests/graphql.svg'
import '../App.css'

const Header = () => {
  return (
    <header className="header">
      <img id="graphql-svg" src={graphqlLogo} alt="graphql-logo" />
      <h1>Todos</h1> 
    </header>
  )
}

export default Header
