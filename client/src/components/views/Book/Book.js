import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, InputNumber } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import './Book.css';
import Axios from 'axios';
import { useDispatch } from 'react-redux';
import { setTransaction } from '../../../_actions/transactionActions'

const { Option } = Select;

function Book(props) {
    const [fields, setFields] = useState([{
        productName: "",
        quantity: '',
        price: ''
    }])
    const [productList, setProductList] = useState([])
    const [customerList, setCustomerList] = useState([])
    const [customer, setcustomer] = useState('')
    const [total, setTotal] = useState(0)

    const dispatch = useDispatch();

    useEffect(() => {
        Axios.post('/api/product/getProducts')
       .then(response => {
           if(response.data.success){
            setProductList(response.data.products);
           }else{
               alert('Failed to fetch product data');
           }
       })

       Axios.get('/api/customer/getCustomer')
        .then(response => {
            if(response.data.success){
                setCustomerList(response.data.customers)
            }else{
                alert('Failed to fetch cutomer  data');
            }
        }) 

    }, [])

    const incrementField = ()=>{
        const { productName, quantity, price } = fields[fields.length - 1];

        if(productName && quantity && price){
            if(fields.length >= 1){
                setFields([...fields, {  
                    productName: "",
                    quantity: '',
                    price: ''}
                ]);
                calculateTotal();
            }
        }else{
            alert('Please insert the field')
        }

       
    }

    const calculateTotal = ()=>{
        let sum = 0;
        fields.forEach((item)=>{
            sum += item.price * item.quantity;
        })
         setTotal(sum)
    }

    const decrementField = (index)=>{  
        let ItemSelected = [...fields];
        ItemSelected.splice(index, 1);
        setFields([...ItemSelected]);
        calculateTotal();
    }

    const handleSelect = (value, index)=>{
        fields[index]['productName'] = value;
        let found = productList.find((item)=>{
           return  item.productName === value
        })
        fields[index]['price'] = found.price;

    }

    const handleQuantity = (value, index)=>{
        fields[index]['quantity'] = value;
    }

    const handleCustomerSelect = (value)=>{
        setcustomer(value);
    }

    const productOption = productList.length > 0 && productList.map((item)=>(
        <Option  key={item.productName}>{item.productName}</Option>
    ))

    const customerOption = customerList.length > 0 && customerList.map((item)=>(
        <Option  key={item.name}>{item.name}</Option>
    ))

    const handleSubmit = ()=>{
        const { productName, quantity, price } = fields[fields.length - 1];

        if(productName && quantity && price){
            
            let payload = {
                customerName: customer,
                transactionDetails: fields,
                type: 'OUT'
            }

            dispatch(setTransaction(payload))
                .then(response => {
                    console.log(response);
                    if(response.payload.success){
                        props.history.push(`/transaction/${response.payload.transaction._id}`)
                    }
                })
                .catch(err => {
                    console.log(err);
                })
            
        }else{
            alert("Please fill all the fields")
        }
        
    }

    return (
        <div style={{maxWidth: '750px', margin: '2rem auto'}}>
            <div style={{textAlign: 'center'}}>
                <h2>Book Your Order</h2>
            </div>
            <div style={{textAlign: 'left', marginBottom: '10px'}}>
                <Select 
                    placeholder="Select Customer"
                    onSelect={(value)=> handleCustomerSelect(value)}
                    style={{width: '350px'}}
                >
                        {customerOption}
                </Select>
            </div>
            <div>
                <Form onSubmit={handleSubmit}>
                   {
                    fields.map((item, index)=>{
                        return (
                            <div 
                            style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flexStart', marginBottom: '1rem'}}
                            key={index}
                        >
                            <div style={{marginRight: '10px'}}> 
                                <Select 
                                    placeholder="Select Product"
                                    onSelect={(value)=> handleSelect(value,index)}
                                    style={{width: '350px'}}
                                >
                                        {productOption}
                                </Select>
                            </div>
                            <div style={{marginRight: '10px'}}>
                                <InputNumber
                                    placeholder={"Qty"}
                                    onChange={(value)=>handleQuantity(value, index)}
                                    min={0}
                                />
                            </div>
                            <div style={{marginRight: '10px'}}> 
                                <Input
                                    placeholder="Price per Unit"
                                    value={item.price}
                                    disabled={true}
                                />
                            </div>
                            <div 
                                onClick={()=>decrementField(index)}
                            >
                                <Button><MinusCircleOutlined/></Button>
                            </div>
                        </div>
                        )
                    })
                        
                      
                   }
                   
                    <div 
                        style={{ padding: '10px 25px', border: '1px dotted blue', margin: '2rem auto', textAlign: 'center', width: '30%', cursor: 'pointer'}}
                        onClick={()=>incrementField()}
                    >
                        <PlusOutlined/>
                        <span>Add Products</span>
                    </div>
                    <div style={{textAlign: "center"}}>
                        <Button type="primary" onClick={handleSubmit}>Confirm Order</Button>
                    </div>
                    
                    
                </Form>
            </div>
            <div style={{textAlign: 'left'}}>
                <h2><strong>Total:</strong>&nbsp; {total}</h2>
            </div>
        </div>
    )
}

export default Book




