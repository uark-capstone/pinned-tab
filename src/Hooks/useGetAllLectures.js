import {React, useEffect, useState} from 'react';


const useGetAllLectures = () => {
    const axios = require('axios');

    const LIVE_URL = process.env.REACT_APP_BACKEND_URL;
    let BACKEND_URL = (LIVE_URL) ? LIVE_URL : 'http://0.0.0.0:8080/';

    const urlFinal= `${LIVE_URL}lecture/getAllLectures`
    const [url, setUrl]= useState(urlFinal)
    const [lectures, setLectures] = useState([]);
    const [isAllLecturesLoaded, setIsLoaded] = useState(false);
    const [isAllLecturesError, setError] = useState(null);
  
    useEffect(() => {
      const fetchData = () => {
        axios
          .get(url)
          .then(response => {
            setIsLoaded(true);
            console.log(response.data)
            setLectures(response.data);
          })
          .catch(error => {
            setError(error);
          });
      };
      fetchData();
    }, [url, axios]);
  
    return { isAllLecturesError, isAllLecturesLoaded, lectures };
  };

  export default useGetAllLectures;