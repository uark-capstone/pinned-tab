import {React, useEffect, useState} from 'react';


const useGetAllLectures = () => {
    const axios = require('axios');
    const [url, setUrl]= useState("http://ct10.ddns.uark.edu:8080/lecture/getAllLectures")
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