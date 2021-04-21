import {React, useEffect, useState} from 'react';


const useEmotionsByLecture = (lecture_id) => {
    const axios = require('axios');

    const LIVE_URL = process.env.REACT_APP_BACKEND_URL;
    let BACKEND_URL = (LIVE_URL) ? LIVE_URL : 'http://0.0.0.0:8080/';

    const [emotions, setEmotions] = useState([]);
    const [isLoadedAllEmotions, setIsLoaded] = useState(false);
    const [isErrorAllEmotions, setError] = useState(null);
  
    useEffect(() => {
      const fetchData = () => {
        const LIVE_URL = process.env.REACT_APP_BACKEND_URL;
       // let BACKEND_URL = (LIVE_URL) ? LIVE_URL : 'http://0.0.0.0:8080/';

        let url = `${LIVE_URL}emotion/getEmotionsByLecture?lecture_id=`+lecture_id
        console.log("emotions", url)
        axios
          .get(LIVE_URL + 'emotion/getEmotionsByLecture?lecture_id=' + lecture_id)
          .then(response => {
            setIsLoaded(true);
            setEmotions(response.data);
          })
          .catch(error => {
            setError(error);
          });
      };
      fetchData();
    }, [lecture_id]);
  
    return emotions;
  };

  export default useEmotionsByLecture;