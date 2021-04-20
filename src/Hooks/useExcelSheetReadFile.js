import {React, useEffect, useState} from 'react';

///user/uploadUsers
//classRoster/uploadClassRoster
const useExcelSheetReadFile = (formData,  path) => {
   
    const [result, setResult] = useState("");
    const [error, setError] = useState("");
	const URL= "http://127.0.0.1:8080/classRoster/uploadClassRoster"
    useEffect(() => {
      const fetchData = () => {
        fetch(
			"http://127.0.0.1:8080/classRoster/uploadClassRoster",
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
    }, [formData]);
  
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