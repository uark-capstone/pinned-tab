import {React, useEffect, useState} from 'react';


const useLoggedIn = ()=> {
    
    useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);
}


export default useLoggedIn; 