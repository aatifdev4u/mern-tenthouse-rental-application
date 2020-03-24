import React, { useState } from 'react'
import Dropzone from 'react-dropzone';
import { PlusOutlined } from '@ant-design/icons';
import Axios from 'axios';

function UploadImage(props) {
    const [Images, setImages] = useState([]);

    
    const onDrop = (files)=>{
        let formData = new FormData();
        const config = {
            header: { 'content-type': 'multipart/form-data'}
        }
        formData.append("file", files[0])

        // Save the image we choose inside the Node Server
        Axios.post('/api/product/uploadImage', formData, config)
            .then(response => {
                if(response.data.success){
                    console.log(response.data.image);
                    setImages([...Images, response.data.image]);
                    props.getImageList([...Images, response.data.image])
                    console.log(Images);
                }else{
                    alert('Failed to save the Image in Server')
                }
            })
    }

    const onDelete = (image)=>{
        let imageIndex = Images.indexOf(image);
        let currentImage = [...Images];
        currentImage.splice(imageIndex, 1);
        setImages(currentImage);
        props.getImageList(currentImage)
    }
    return (
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
             <Dropzone
                onDrop={onDrop}
                multiple={false}
                maxSize={800000000}
           >
               {
                   ({getRootProps, getInputProps})=>(
                    <div style={{ width: '200px', height: '140px', border: '1px dotted lightgray', display: 'flex', justifyContent: 'center', alignItems: 'center'}} {...getRootProps()}>
                        <input {...getInputProps()}/>
                        <PlusOutlined  style={{fontSize: '3rem'}}/>
                    </div>
                   )
               }
           </Dropzone>
           <div
            style={{ display: 'flex', width: '200px', height: '140px',  justifyContent: 'center', alignItems: 'center', border: '1px solid lightgray', overflowX: 'scroll' }}
           >
               {
                  Images.map((image, index)=>(
                    <div onClick={()=>onDelete(image)} >
                        <img
                            src={`http://localhost:5000/${image}`}
                            alt={`product-Image-${index}`}
                            style={{minWidth: '300px', width: '300px', height: '240px'}}
                            />
                    </div>
                   ))
               }
           </div>
        </div>
    )
}

export default UploadImage
