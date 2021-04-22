import {React, useEffect, useState} from 'react';

///user/uploadUsers
//classRoster/uploadClassRoster
const useExcelSheetReadFile = (formData,  path) => {
   
    const [result, setResult] = useState("");
    const [error, setError] = useState("");
	const LIVE_URL = process.env.REACT_APP_BACKEND_URL;
	// const URL= `${LIVE_URL}classRoster/uploadClassRoster`
	const URL= `${LIVE_URL}${path}`
    useEffect(() => {
      const fetchData = () => {
        fetch(
			`${URL}`,
			{
				method: 'POST',
				body: formData,
			}
		)
			.then((response) => response.json())
			.then((result) => {
                setResult("Woo!! "+result)
				console.log('Success:', result);
			})
			.catch((error) => {
              setError(true)
				console.error('Error:', error);
			});
      };

      fetchData();
    }, [formData, path]);
  
    return { result, error};
  };

  export default useExcelSheetReadFile;


  /** 
   * 
   * 		const formData = new FormData();

		formData.append('File', selectedFile);

		fetch(
			'https://freeimage.host/api/1/upload?key=<YOUR_API_KEY>',
			{
				method: 'POST',
				body: formData,
			}
		)
			.then((response) => response.json())
			.then((result) => {
				console.log('Success:', result);
			})
			.catch((error) => {
				console.error('Error:', error);
			});
   */