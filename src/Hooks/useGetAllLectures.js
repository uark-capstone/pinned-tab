import {React, useEffect, useState} from 'react';


const useGetAllLectures = () => {
    const axios = require('axios');
    const LIVE_URL = process.env.REACT_APP_BACKEND_URL;
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