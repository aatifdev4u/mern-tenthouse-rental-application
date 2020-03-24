import React, { useState, useEffect } from 'react';
import { Form, InputNumber, Button, Input } from 'antd';
import UploadImage from '../UtilsComponent/UploadImage';
import Axios from 'axios';
import {NotificationContainer, NotificationManager} from 'react-notifications';

function AddProduct() {
    const [images, setImages] = useState([]);
    const [productName, setProductName] = useState('')
    const [price, setPrice] = useState(0)
    const [totalQty, setTotalQty] = useState(0)

    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };

    const validateMessages = {
      required: 'This field is required!',
      types: {
        email: 'Not a validate email!',
        number: 'Not a validate number!',
      },
      number: {
        range: 'Must be between ${min} and ${max}',
      },
    };

    const reset = ()=>{
      setImages([]);
      setProductName('');
      setPrice(0);
      setTotalQty(0);
    }

    const onFinish = (e) => {
        let payload = {
          productName,
          price,
          totalQty,
          images,
          availableQty: totalQty
        }
       
        Axios.post('/api/product/uploadProduct', payload)
        .then(response => {
          console.log(response.data)
          if(response.data.success){
            console.log("Successfully")
            NotificationManager.success(response.data.msg, 'Success');
            reset();
          }
        })
      };

    const handleProduct = (e)=>{
      setProductName(e.target.value);
    }

    const getImageList = (images)=>{
      setImages(images);
    }
    
    const handlePrice = (value)=>{
      setPrice(value)
    }

    const handleQuantity = (value)=>{
      setTotalQty(value)
    }
    return (
        <div style={{maxWidth: '750px', margin: '2rem auto'}}>
            <div style={{textAlign: 'center'}}>
                <h2>Enter Product Details</h2>
            </div>
            <div>
                 <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                    <Form.Item name={['user', 'name']} label="Product Title" rules={[{ required: true }]}>
                      <Input
                        placeholder="Enter Product Title"
                        onChange={handleProduct}
                        value={productName}
                      />
                      </Form.Item>
                      <Form.Item label="Insert Image">
                        <UploadImage
                          getImageList={getImageList}
                        />
                      </Form.Item>
                      <Form.Item  label="Price per Item">
                        <InputNumber 
                          onChange={handlePrice}
                          value={price}
                        />
                      </Form.Item>
                      <Form.Item  label="Total Qty">
                        <InputNumber
                          onChange={handleQuantity}
                          value={totalQty}
                        />
                      </Form.Item>
                      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                      <Button type="primary" htmlType="submit">
                          Add Product
                      </Button>
                    </Form.Item>
                </Form>
            </div>
            <NotificationContainer/>
        </div>
    )
}

export default AddProduct
