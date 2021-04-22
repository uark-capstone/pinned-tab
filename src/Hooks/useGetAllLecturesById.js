import {React, useEffect, useState} from 'react';


const useGetAllLecturesById = (class_id) => {
  console.log("display class", class_id)
    const axios = require('axios');
    const LIVE_URL = process.env.REACT_APP_BACKEND_URL;
    const [classID, setClassID] = useState(class_id);
    const [url, setUrl]= useState(`${LIVE_URL}lecture/getAllLecturesbyID?class_id=${class_id}`)
    const [lecturesById, setLectures] = useState([]);
    const [isAllLecturesByIdLoaded, setIsLoaded] = useState(false);
    const [isAllLecturesByIdError, setError] = useState(null);
  
    useEffect(() => {
      const fetchData = () => {
        axios
          .get(`${LIVE_URL}lecture/getAllLecturesbyID?class_id=${class_id}`)
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
    }, [url, axios,class_id]);
  
    return { isAllLecturesByIdError, isAllLecturesByIdLoaded, lecturesById };
  };

  export default useGetAllLecturesById;