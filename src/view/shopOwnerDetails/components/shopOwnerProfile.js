import React, { useEffect } from "react";
import { Card } from "../../../components/ui";
import { Link } from "react-router-dom";
import { HiExternalLink, HiMail, HiPhone } from "react-icons/hi";
import IconText from "../../../components/shared/IconText";
import useQuery from "../../../utils/hooks/useQuery";
import { useDispatch, useSelector } from "react-redux";
import { getOwnerDetailsByOwnerId } from "../store/dataSlice";
import { Loading } from "../../../components/shared";

const ShopOwnerProfile = () => {

    const dispatch = useDispatch()
    const query = useQuery()
    const ownerId = query.get('id')

    useEffect(() => {
        dispatch(getOwnerDetailsByOwnerId({ ownerId }))
          // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ownerId])

    const data = useSelector(state => state.adminOwnerDetails.data.owner)
    const loading = useSelector(state => state.adminOwnerDetails.data.profileLoading)

    return (
        <>
            <Card>
                <div>
                    <h6 className="mb-4">Shop Owner Details</h6>
                </div>
                {loading ? <Loading loading={true} /> : <>
                    <Link
                        className="group flex items-center justify-between "
                        to="/app/crm/customer-details?id=11"
                    >

                        <div className="flex items-center gap-3">
                            {/* <Avatar shape="square" src={appConfig.apiPrefix + data?.image} size={80} /> */}
                            <div className="ltr:ml-2 rtl:mr-2">
                                <div className="flex mb-1">
                                    <h4 className="font-semibold group-hover:text-gray-900 group-hover:dark:text-gray-100">
                                        {data?.name}
                                    </h4>
                                    {/* <Tag className='ml-3 text-emerald-500 bg-emerald-200 px-4 py-0'>dfasdf</Tag> */}
                                </div>
                                <span>
                                    Owner ID: {' '}
                                    <span className="font-semibold">
                                        {data?.id}
                                    </span>

                                </span>
                            </div>
                        </div>
                        <HiExternalLink className="text-xl hidden group-hover:block" />
                    </Link>
                    <hr className="my-5" />
                    <IconText className="mb-4" icon={<HiPhone className="text-xl opacity-70" />}>
                        <span className="font-semibold">{data?.mobile}</span>
                    </IconText>
                    <IconText

                        icon={<HiMail className="text-xl opacity-70" />}
                    >
                        <span className="font-semibold">{data?.email}</span>
                    </IconText>
                    <hr className="my-5" />
                    <h6 className="mb-4">Owner Address</h6>
                    <address className="not-italic">
                        <div className="mb-1"><span className="font-semibold" >City/Village/Town:   </span><span className="capitalize text-md" >{data?.village}</span></div>
                        <div className="mb-1"><span className="font-semibold" >Block:</span> <span className="capitalize text-md" >{data?.block}</span></div>
                        <div className="mb-1"><span className="font-semibold" >District:</span> <span className="capitalize text-md" >{data?.district}</span></div>
                        <div className="mb-1"><span className="font-semibold" >State:</span> <span className="capitalize text-md" >{data?.state}</span></div>

                    </address>
                </>
                }
            </Card>
        </>
    )
}

export default ShopOwnerProfile;