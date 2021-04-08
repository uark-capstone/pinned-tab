import React from "react";
import { useEffect, useState } from "react";
import useGetAllLectures from "../Hooks/useGetAllLectures";
import useExcelSheetReadFile from "../Hooks/useExcelSheetReadFile";
const UploadFile = () => {

    const [selectedFile, setSelectedFile] = useState();
	const [isSelected, setIsSelected] = useState(false);


    const [formData, setFormData]= useState(null); 

    const {result, error} = useExcelSheetReadFile(formData); 
	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsSelected(true);
	};

	const handleSubmission = () => {
		const excelSheet = new FormData();
		excelSheet.append('File', selectedFile);
        setFormData(excelSheet); 
	};
	

	return(
   <div>
       <div>
           Please select an excel sheet to add all users 
       </div>
			<input type="file" name="file" onChange={changeHandler} />
			{isSelected ? (
				<div>
					<p>Filename: {selectedFile.name}</p>
					<p>Filetype: {selectedFile.type}</p>
					<p>Size in bytes: {selectedFile.size}</p>
					<p>
						lastModifiedDate:{' '}
						{selectedFile.lastModifiedDate.toLocaleDateString()}
					</p>
				</div>
			) : (
				<p>Select a file to show details</p>
			)}
			<div>
				<button onClick={handleSubmission}>Submit</button>
			</div>
            <div>idk {result} or {error}  </div>

		</div>
	)

}

export default UploadFile; 


//https://www.pluralsight.com/guides/uploading-files-with-reactjs