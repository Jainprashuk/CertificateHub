import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import Header from './Header';
import Hero from './Hero';

function MainApp() {
    const { loginWithRedirect, logout, user, isAuthenticated, isLoading } = useAuth0();
  return (
    <>
    <Header authState={{ loginWithRedirect, logout, user, isAuthenticated, isLoading }} />
    <Hero authState={{ loginWithRedirect, logout, user, isAuthenticated, isLoading }} />
    </>
    

  )
}

export default MainApp