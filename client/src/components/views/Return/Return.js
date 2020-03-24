import React, { useState } from 'react'
import { Input, Button } from 'antd';
import axios from 'axios';

const { Search } = Input;

function Return(props) {

    const [transDetails, setTransDetails] = useState()
    const [transactionId, settransactionId] = useState('')
    const [sumTotal, setSumTotal] = useState(0)

    const calculateTotal = (items)=>{
        let total = 0;
        items.map((item)=>{
            total += item.quantity * item.price;
        })

        setSumTotal(total)
    }

    const handleSearch = (value)=>{
        settransactionId(value);
        console.log(value);
        axios.get('/api/transaction/getTransaction/'+ value)
        .then(response => {
            console.log(response);
            if(response.data.success){
                setTransDetails(response.data.details)
                calculateTotal(response.data.details.transactionDetails)
                
            }
        })
    }

    const handleCancel = ()=>{
        console.log('handleCancel')
        const { transactionDetails, customerName, _id} = transDetails;
        let payload = {
            parentTransactionId: _id,
            type: 'IN',
            transactionDetails,
            customerName
        }
        axios.post('/api/transaction/refundTransaction', payload)
        .then(response => {
            console.log(response)
            if(response.data.success){
                props.history.push(`/transaction/refund/${response.data.transaction._id}`)
            }
        })
    }

    const renderItem = transDetails && transDetails.transactionDetails.map((item, index)=>{
        return (
            <tr>
                <td>{index + 1}</td>
                <td>{item.productId || item.productName}</td>
                <td>{item.quantity}</td>
                <td>{item.price}</td>
                {/* <td>{item.quantity * item.price}</td> */}
            </tr>
        )
    })
    return (
        <div style={{maxWidth: '85%', margin: '2rem auto'}}>
           <div style={{ textAlign: 'center', fontStyle: 'italic'}}>
               <h2>Refund</h2>
               <hr/>
            </div>
            <div style={{ textAlign: 'center', fontStyle: 'italic'}}>
               <h2>Enter Reciept No:</h2>
               <Search
                    placeholder="Enter Reciept nos.."
                    enterButton="Search"
                    size="large"
                    onSearch={value => handleSearch(value)}
                    />
            </div>
            
                {
                    transDetails && 
                <div style={{marginTop: '10px'}}>
                    <table>
                        <thead>
                            <tr>
                                <th>Customer:</th>
                                <th>{transDetails.customerName}</th>
                                <th>Invoice:</th>
                                <th>{transactionId}</th>
                            </tr>
                            <tr>
                                <th>Sl.no</th>
                                <th>Product Name</th>
                                <th>Qty</th>
                                <th>Price/Item</th>
                            </tr>
                        </thead>
                        <tbody>
                        {renderItem}
                        <tr>
                            <td><strong>Date</strong></td>
                            <td>{transDetails.createdAt}</td>
                            <td><strong>Sum Total:</strong></td>
                            <td>{sumTotal}</td>
                        </tr>
                        </tbody>
                    </table>
                     <div style={{textAlign: 'center', margin: '2rem auto'}}>
                        <Button type='primary' onClick={handleCancel}>Confirm Refund</Button>
                    </div>
                    </div>
                }
        </div>
    )
}

export default Return
