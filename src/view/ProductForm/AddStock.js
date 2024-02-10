import React, { useState } from "react";
import { Button, Card, Input, Notification, Toast } from "../../components/ui";
import { useDispatch } from "react-redux";

import { HiPlusCircle } from "react-icons/hi";

import { addStockInExistingProduct } from "./store/dataSlice";
import { getProductsDetailsByProductId } from "../productDetails/store/dataSlice";

const AddProductStock = ({productId}) => {
    const [quantity, setQuantity] = useState(0)
    const [btnLoading, setBtnLoading] = useState(false)
    const dispatch = useDispatch()

    const handleAddStock = async () => {
        setBtnLoading(true)
        const { status, data: responseData } = (await dispatch(addStockInExistingProduct({ quantity, productId })))?.payload || {};

        Toast.push(
            <Notification title={status < 400 ? 'Successfully added' : 'Error'} type={status < 400 ? 'success' : 'danger'}>
                {responseData?.message}
            </Notification>
        );
        if (status < 400) {
            setQuantity(0);
            setBtnLoading(false)
            dispatch(getProductsDetailsByProductId({ productId }))
        }
        else{
            setBtnLoading(false)
        }
    }

    return (<>
        <div className="mb-3">
            <Card>
                <div className="flex">
                    <div className="w-1/2">
                        <h5>Add Stock</h5>
                        <p >Please Add Stock</p>
                    </div>
                    <div className="w-1/2 lg:flex gap-2">
                        <Input
                            value={quantity}
                            name="stock"
                            placeholder="quantity"
                            onChange={(e) => setQuantity(e.target.value)}
                        />
                        <Button
                            loading={btnLoading}
                            onClick={handleAddStock}
                            variant="solid"
                            icon={<HiPlusCircle />}
                        >
                            Add Stock
                        </Button>
                    </div>
                </div>
            </Card>
        </div>

    </>)
}

export default AddProductStock;
