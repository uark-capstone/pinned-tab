import {React, useEffect, useState} from 'react';


const useEmotionsByLecture = (lecture_id) => {
    const axios = require('axios');
    const [emotions, setEmotions] = useState([]);
    const [isLoadedAllEmotions, setIsLoaded] = useState(false);
    const [isErrorAllEmotions, setError] = useState(null);
  
    useEffect(() => {
      const fetchData = () => {
        let url = 'http://ct10.ddns.uark.edu:8080/emotion/getEmotionsByLecture?lecture_id=' + lecture_id
        axios
          .get(url)
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
  
    return { isErrorAllEmotions, isLoadedAllEmotions, emotions };
  };

  export default useEmotionsByLecture;