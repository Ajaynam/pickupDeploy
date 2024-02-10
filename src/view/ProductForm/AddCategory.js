import React, { useState } from "react";
import { Button, Card, Input, Notification, Toast } from "../../components/ui";
import { useDispatch } from "react-redux";

import { HiPlusCircle } from "react-icons/hi";
import { AddProductCategories, getAllCategoryList } from "../ProductNew/store/dataSlice";

const AddProductCategory = () => {
    const [category, setCategory] = useState()
    const [btnLoading, setBtnLoading] = useState(false)
    const dispatch = useDispatch()

    const handleAddCategory = async () => {
        setBtnLoading(true)
        const data = { name: category }

        const action = await dispatch(AddProductCategories(data))

        let notificationWithAvatar;
        setBtnLoading(false)
        if (action?.payload?.status < 400) {
            notificationWithAvatar = (
                <Notification
                    title={'Successfuly added'}
                    type='success'
                >
                    {action?.payload?.data?.message}
                </Notification>
            )
            dispatch(getAllCategoryList())

        } else {
            notificationWithAvatar = (
                <Notification
                    title={'Error'}
                    type='danger'
                >
                    {action?.payload?.data?.message}
                </Notification>
            )
        }
        Toast.push(notificationWithAvatar)

    }

    return (<>
        <div className="mb-3">
            <Card>
                <div className="flex">
                    <div className="w-1/2">
                        <h5>Add Category</h5>
                        <p >Please Add Category</p>
                    </div>
                    <div className="w-1/2 lg:flex gap-2">
                        <Input
                           
                            name="categoryName"
                            placeholder="category name"
                            onChange={(e) => setCategory(e.target.value)}
                        />
                        <Button
                            loading={btnLoading}
                            onClick={handleAddCategory}
                            variant="solid"
                            icon={<HiPlusCircle />}
                        >
                            Add Category
                        </Button>
                    </div>
                </div>
            </Card>
        </div>

    </>)
}

export default AddProductCategory;
