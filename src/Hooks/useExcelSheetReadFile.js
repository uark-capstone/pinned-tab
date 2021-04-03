import {React, useEffect, useState} from 'react';


const useExcelSheetReadFile = (formData,) => {


    const [selectedFile, setSelectedFile] = useState();
	const [isSelected, setIsSelected] = useState(false);

    const [result, setResult] = useState("");
    const [error, setError] = useState("");
  
    useEffect(() => {
      const fetchData = () => {
        fetch(
			'https://freeimage.host/api/1/upload?key=<YOUR_API_KEY>',
			{
				method: 'POST',
				body: formData,
			}
		)
			.then((response) => response.json())
			.then((result) => {
                setResult(result)
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