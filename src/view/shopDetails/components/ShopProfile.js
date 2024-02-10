import React, { useEffect } from "react";
import { Avatar, Card } from "../../../components/ui";
import { Link } from "react-router-dom";
import { HiExternalLink, HiMail, HiPhone } from "react-icons/hi";
import IconText from "../../../components/shared/IconText";
import { NumericFormat } from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { getShopDetailsByShopId } from "../store/dataSlice";
import useQuery from "../../../utils/hooks/useQuery";
import defaultShop from './defaultShop.jpg'

const ShopProfile = () => {

    const dispatch = useDispatch()
    const query = useQuery()
    const shopId = query.get('id')

    useEffect(() => {
        dispatch(getShopDetailsByShopId({ shopId }))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [shopId])

    const data = useSelector(state => state.adminShopDetails.data.shopDetails)
    const shopPendingAmount = useSelector(state => state.adminShopDetails.data.shopPendingAmount)

    return (
        <>
            <Card>
                <h5 className="mb-4">Pending Balance</h5>
                <h3>
                    <NumericFormat value={shopPendingAmount} co displayType="text" prefix="₹" thousandSeparator=',' thousandsGroupStyle="lakh" />
                </h3>
                <hr className="my-5" />
                <h5 className="mb-4">Shop Details</h5>


                <div className="flex items-center gap-3">
                    {/* <Avatar shape="square" src={appConfig.apiPrefix + data?.image} size={80} /> */}
                    <Avatar shape="square" src={defaultShop} size={80} />

                    <div className="ltr:ml-2 rtl:mr-2">
                        <h4 className="font-semibold group-hover:text-gray-900 group-hover:dark:text-gray-100">
                            {data?.name}
                        </h4>
                        <span>
                            Shop ID: {' '}
                            <span className="font-semibold">
                                {data?.id}
                            </span>

                        </span>
                    </div>
                </div>
                <hr className="my-5" />
                <IconText  className="mb-4" icon={<HiPhone className="text-xl opacity-70" />}>
                    <span className="font-semibold">{data?.mobile}</span>
                </IconText>
                <IconText  
                    icon={<HiMail className="text-xl opacity-70" />}
                >
                    <span className="font-semibold">{data?.email}</span>
                </IconText>

                <hr className="my-5" />
                <h5 className="mb-2">Owned By</h5>
                <Link
                    className="group flex items-center justify-between "
                    to={`/shop/owner?id=${data?.shopOwnerId}`}
                >
                    <span className="font-semibold capitalize text-lg">{data?.shopOwner}</span>
                    <HiExternalLink className="text-xl hidden group-hover:block" />
                </Link>
                <hr className="my-5" />
                <h5 className="mb-4">Shop Address</h5>
                <address className="not-italic">
                    <div className="mb-1"><span className="font-semibold" >City/Village/Town:   </span><span className="capitalize text-md" >{data?.villageName}</span></div>
                    <div className="mb-1"><span className="font-semibold" >Block:</span> <span className="capitalize text-md" >{data?.blockName}</span></div>
                    <div className="mb-1"><span className="font-semibold" >District:</span> <span className="capitalize text-md" >{data?.districtName}</span></div>
                    <div className="mb-1"><span className="font-semibold" >State:</span> <span className="capitalize text-md" >{data?.stateName}</span></div>

                </address>
                {/* todo */}
            </Card>
        </>
    )
}

export default ShopProfile;