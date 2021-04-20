import {React, useEffect, useState} from 'react';


const useGetAllLecturesById = (class_id) => {
    const axios = require('axios');
    const LIVE_URL = process.env.REACT_APP_BACKEND_URL;
    const [classID, setClassID] = useState(class_id);
    const [url, setUrl]= useState(`${LIVE_URL}lecture/getAllLecturesbyID?class_id=${classID}`)
    const [lecturesById, setLectures] = useState([]);
    const [isAllLecturesByIdLoaded, setIsLoaded] = useState(false);
    const [isAllLecturesByIdError, setError] = useState(null);
  
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
  
    return { isAllLecturesByIdError, isAllLecturesByIdLoaded, lecturesById };
  };

  export default useGetAllLecturesById;