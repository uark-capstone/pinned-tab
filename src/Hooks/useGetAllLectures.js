import {React, useEffect, useState} from 'react';


const useGetAllLectures = () => {
    const axios = require('axios');

    const LIVE_URL = process.env.REACT_APP_BACKEND_URL;
    let BACKEND_URL = (LIVE_URL) ? LIVE_URL : 'http://0.0.0.0:8080/';

    const [lectures, setLectures] = useState([]);
    const [isAllLecturesLoaded, setIsLoaded] = useState(false);
    const [isAllLecturesError, setError] = useState(null);
  
    useEffect(() => {
      const fetchData = () => {
        axios
          .get(BACKEND_URL + 'lecture/getAllLectures')
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

  export default useGetAllLectures;