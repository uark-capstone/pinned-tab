import {React, useEffect, useState} from 'react';


const useGetAllClasses = () => {
    const axios = require('axios');
    //diff
    const [url, setUrl]= useState("http://ct10.ddns.uark.edu:8080/user/getUserByEmail?email=af027@uark.edu")
    const [lectures, setLectures] = useState([]);
    const [isAllLecturesLoaded, setIsLoaded] = useState(false);
    const [isAllLecturesError, setError] = useState(null);
  
    useEffect(() => {
      const fetchData = () => {
        axios
          .get(url)
          .then(response => {
            setIsLoaded(true);
            setLectures(response.data);
          })
          .catch(error => {
            setError(error);
          });
      };
      fetchData();
    }, [url]);
  
    return { isAllLecturesError, isAllLecturesLoaded, lectures };
  };

  export default useGetAllClasses;