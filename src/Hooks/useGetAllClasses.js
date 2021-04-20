import {React, useEffect, useState} from 'react';


const useGetAllClasses = (professorID) => {
    const axios = require('axios');
    //diff
    const LIVE_URL = process.env.REACT_APP_BACKEND_URL;
    const [url, setUrl]= useState(`${LIVE_URL}class/getClassesByProfessorID?professorid=${professorID}`)
    const [classes, setClasses] = useState([]);
    const [isClassesLoaded, setIsLoaded] = useState(false);
    const [isClassesError, setError] = useState(null);
  
    useEffect(() => {
      const fetchData = () => {
        axios
          .get(url)
          .then(response => {
            setIsLoaded(true);
            setClasses(response.data);
          })
          .catch(error => {
            setError(error);
          });
      };
      fetchData();
    }, [url]);
  
    return { isClassesError, isClassesLoaded, classes };
  };

  export default useGetAllClasses;