import React, { useEffect, useState} from 'react'
import axios from 'axios';


function Transaction() {
    const [transactionList, setTransactionList] = useState([])

    useEffect(() => {
       axios.get('/api/transaction/getTransactionList')
       .then(response => {
           if(response.data.success){
               setTransactionList(response.data.transaction)
           }
       })
    }, [])

    const renderItems = transactionList && transactionList.map((transactionEntity)=>{
        let productItem = transactionEntity && transactionEntity.transactionDetails.map((item)=>{
            return (
                <tr>
                    <td>{item.productName}</td>
                    <td>{item.quantity}&nbsp;pcs</td>
                </tr>
            )
        })

        let headerItem = <React.Fragment>
            <tr>
                <th>Customer:&nbsp;{transactionEntity.customerName}</th>
                <th>Date:&nbsp;{transactionEntity.createdAt}</th>
                <th>Transaction:&nbsp;{transactionEntity._id}</th>
                <th>Type:&nbsp;{transactionEntity.type === "IN" ? "Refund" : "Book"}</th>
            </tr>
        </React.Fragment>;

        return (
            <React.Fragment>
                {headerItem}
                {productItem}
                <br/>
            </React.Fragment>
        )


    })

    return (
        <div style={{maxWidth: '85%', margin: '2rem auto'}}>
            <div style={{ textAlign: 'center', fontStyle: 'italic'}}>
               <h2>Transaction History</h2>
            </div>
            <div style={{border: '1px solid #efefef', height: '340px', overflowY: 'scroll'}}>
                <table>
                    {renderItems}
                </table>
            </div>
           
        </div>
    )
}

export default Transaction
