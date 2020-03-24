import React from 'react'
import { Button } from 'antd';
import { useSelector } from 'react-redux'
import  axios from 'axios';
import { saveAs } from 'file-saver';

function Payment(props) {
    const transactionData = useSelector(state => state.transaction.transactionData);
    const {transaction : { customerName } } = transactionData;


    const createAndDownloadPdf = ()=>{
        const payload = {
            RecieptNo: props.match.params.transactionId,
            data: transactionData.transaction
        }

        axios.post('/api/transaction/createPdf', payload)
        .then(() => axios.get('/api/transaction/fetchPdf', { responseType: 'blob' }))
        .then((res) => {
            const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
            saveAs(pdfBlob, 'generatedDocument.pdf')
        } )
    }


    return (
        <div style={{maxWidth: '85%', margin: '2rem auto'}}>
           <div style={{ textAlign: 'center', fontStyle: 'italic'}}>
               <h2>Thank you {customerName} for Booking order</h2>
            </div>
            <div>
               <h2>Please note the Reciept nos for future reference &nbsp;&nbsp;
                   <span style={{color: 'blue', fontStyle: 'underline'}}>
                       {props.match.params.transactionId}
                    </span>
                </h2>
            <div style={{textAlign: "right"}}>
                <Button
                 type="primary"
                 onClick={createAndDownloadPdf}
                 >Download Reciept</Button>
            </div>
           </div>
        </div>
    )
}

export default Payment
