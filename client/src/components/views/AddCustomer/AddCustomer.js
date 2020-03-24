import React from 'react'
import { Form, Button, Input } from 'antd';
import Axios from 'axios';

function AddCustomer() {
    const layout = {
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 12,
      },
    };
    const validateMessages = {
      required: 'This field is required!',
      types: {
        email: 'Not a validate email!',
        number: 'Not a validate number!',
      }
    };
    const onFinish = payload => {
      Axios.post('/api/customer/addCustomer', payload)
      .then(response => {
        if(response.data.success){
          console.log('Successfully added customer');
        }
      })
    };
    
    return (
        <div style={{maxWidth: '750px', margin: '2rem auto'}}>
        <div style={{textAlign: 'center'}}>
            <h2>Enter Customer Details</h2>
        </div>
        <div>
          <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
            <Form.Item
              name={['name']}
              label="Name"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={[ 'email']}
              label="Email"
              rules={[
                {
                  type: 'email',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={['phone']}
              label="Contacts nos"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
    </div>
    )
}

export default AddCustomer
