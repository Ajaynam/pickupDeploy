
import React from 'react'
import { Button, Table } from '../../../components/ui'
import { useDispatch, useSelector } from 'react-redux';
import { setTableData, selectTableData } from '../store/dataSlice';

const { Tr, Th, Td, THead, TBody } = Table

const PoOrderTable = () => {


    const  tableData  = [
        {
            poId: 1,
            DeliveryTerms: 'John Doe',
            POSerialNumber: 'ABC123',
            DrawingRevision: 'Rev A',
            POQuantity: 10,
            UnitPrice: '15555',
            NetAmount: '45885',
        },
        {
            poId: 2,
            DeliveryTerms: 'John Doe',
            POSerialNumber: 'ABC123',
            DrawingRevision: 'Rev A',
            POQuantity: 10,
            UnitPrice: '15555',
            NetAmount: '45885',
        },  {
            poId: 3,
            DeliveryTerms: 'John Doe',
            POSerialNumber: 'ABC123',
            DrawingRevision: 'Rev A',
            POQuantity: 10,
            UnitPrice: '15555',
            NetAmount: '45885',
        },  {
            poId: 4,
            DeliveryTerms: 'John Doe',
            POSerialNumber: 'ABC123',
            DrawingRevision: 'Rev A',
            POQuantity: 10,
            UnitPrice: '15555',
            NetAmount: '45885',
        },
    ]
    const dispatch = useDispatch();
    // const tableData = useSelector(selectTableData);

    const handleSubmit = () => {
        // Make API call with tableData
        // For now, let's just update the Redux store
        dispatch(setTableData(tableData));
    };


    return (
        <div>
            <Table compact>
                <THead>
                    <Tr>
                        <Th>Delevery Terms</Th>
                        <Th>PO Serial No</Th>
                        <Th>Drawing Revision Number</Th>
                        <Th>PO Qty</Th>
                        <Th>Unit Price</Th>
                        <Th>Net Amount</Th>
                    </Tr>
                </THead>
                <TBody>
                    {tableData && tableData.length > 0 ? (
                        tableData.map((rowData, index) => (
                            <Tr key={index}>
                                <Td>{rowData.DeliveryTerms}</Td>
                                <Td>{rowData.POSerialNumber}</Td>
                                <Td>{rowData.DrawingRevision}</Td>
                                <Td>{rowData.POQuantity}</Td>
                                <Td>{rowData.UnitPrice}</Td>
                                <Td>{rowData.NetAmount}</Td>
                            </Tr>
                        ))
                    ) : (
                        <Tr>
                            <Td colSpan={6}>No data available</Td>
                        </Tr>
                    )}
                </TBody>

            </Table>

        </div>
    )
}

export default PoOrderTable

