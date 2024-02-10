import React, { useEffect } from "react";
import { Card } from "../../../components/ui";
import { Link } from "react-router-dom";
import { HiExternalLink, HiMail, HiPhone } from "react-icons/hi";
import IconText from "../../../components/shared/IconText";
import useQuery from "../../../utils/hooks/useQuery";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct, setProductId } from "../store/dataSlice";
import { Loading } from "../../../components/shared";

const ShopOwnerProfile = () => {


    const dispatch = useDispatch()
    const query = useQuery()
    const productId = query.get('id')

    console.log(productId)

    // useEffect(() => {
    //     dispatch(getAllProduct({ productId }))
    //       // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [productId])

    useEffect(() => {
        dispatch(setProductId(productId));
        dispatch(getAllProduct());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },  [productId, dispatch]);


    const shopOwner = useSelector(state => state.adminOwnerDetails.data.shopOwner);
    console.log(shopOwner)
    const loading = useSelector(state => state.adminOwnerDetails.data.profileLoading);


    // const data = useSelector(state => state.adminOwnerDetails.data.owner)
    // const loading = useSelector(state => state.adminOwnerDetails.data.profileLoading)
    if (loading) {
        return <Loading loading={true} />;
    }

    return (
        <>
            <Card>
                <div>
                    <h6 className="mb-4">Products Details</h6>
                </div>
                {/* {loading ? (
                    <Loading loading={true} />
                ) : (
                    <> */}
                    {shopOwner ? (
                    <>
                        <Link
                            className="group flex items-center justify-between "
                            to="/app/crm/customer-details?id=11"
                        >

                            <div className="flex items-center gap-3">
                                <div className="ltr:ml-2 rtl:mr-2">

                                    <span>
                                        Product Id: {' '}
                                        <span className="font-semibold">
                                            {shopOwner?.product_id}
                                        </span>

                                    </span>
                                </div>
                            </div>
                        </Link>
                        <hr className="my-5" />
                        <address >
                            <div className="not-italic ">

                                <ul className=" grid grid-cols-2">

                                    <li className="mb-3">
                                        <p className="font-semibold">product name:</p>
                                        <span className="capitalize text-md ">{shopOwner?.product_name}</span>
                                    </li>
                                    <li className="mb-3">
                                        <p className="font-semibold">Item Code:</p>
                                        <span className="capitalize text-md">{shopOwner?.item_code}</span>
                                    </li>
                                    <li className="mb-3">
                                        <p className="font-semibold">Row Code:</p>
                                        <span className="capitalize text-md">{shopOwner?.row_code}</span>
                                    </li>
                                    <li className="mb-3">
                                        <p className="font-semibold">Pump Modal:</p>
                                        <span className="capitalize text-md">{shopOwner?.pump_model}</span>
                                    </li>
                                    <li className="mb-3">
                                        <p className="font-semibold">unit:</p>
                                        <span className="capitalize text-md">{shopOwner?.product_um}</span>
                                    </li>
                                    <li className="mb-3">
                                        <p className="font-semibold">hsn code:</p>
                                        <span className="capitalize text-md">{shopOwner?.hsn_code}</span>
                                    </li>
                                    <li className="mb-3">
                                        <p className="font-semibold">product description:</p>
                                        <span className="capitalize text-md">{shopOwner?.product_description}</span>
                                    </li>
                                    <li className="mb-3">
                                        <p className="font-semibold">standard time:</p>
                                        <span className="capitalize text-md">{shopOwner?.standard_time}</span>
                                    </li>
                                    <li className="mb-3">
                                        <p className="font-semibold">drawing number:</p>
                                        <span className="capitalize text-md">{shopOwner?.drawing_number}</span>
                                    </li>
                                    <li className="mb-3">
                                        <p className="font-semibold">raw weight:</p>
                                        <span className="capitalize text-md">{shopOwner?.raw_weight}</span>
                                    </li>
                                    <li className="mb-3">
                                        <p className="font-semibold">finish weight:</p>
                                        <span className="capitalize text-md">{shopOwner?.finish_weight}</span>
                                    </li>
                                    <li className="mb-3">
                                        <p className="font-semibold">pattern number:</p>
                                        <span className="capitalize text-md">{shopOwner?.pattern_number}</span>
                                    </li>
                                    <li className="mb-3">
                                        <p className="font-semibold">category name:</p>
                                        <span className="capitalize text-md">{shopOwner?.category_name}</span>
                                    </li>
                                    <li className="mb-3">
                                        <p className="font-semibold">material grade number:</p>
                                        <span className="capitalize text-md">{shopOwner?.material_grade_number}</span>
                                    </li>

                                </ul>


                            </div>
                            {/*
                        */}

                        </address>

                    </>
                )
                : <div>no data</div>}
            </Card>
        </>
    )
}

export default ShopOwnerProfile;