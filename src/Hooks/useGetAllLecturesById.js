import {React, useEffect, useState} from 'react';


const useGetAllLecturesById = (classID) => {
    const axios = require('axios');
    const [url, setUrl]= useState(`http://127.0.0.1:8080/lecture/getAllLecturesbyID?class_id=${classID}`)
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
    }, [classID]);
  
    return { isAllLecturesByIdError, isAllLecturesByIdLoaded, lecturesById };
  };

  export default useGetAllLecturesById;