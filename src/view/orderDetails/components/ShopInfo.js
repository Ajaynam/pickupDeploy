import React from 'react'
import { Card, Avatar } from '../../../components/ui'
// import { IconText } from '../../../components/shared'
import { HiMail, HiPhone, HiExternalLink } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import IconText from '../../../components/shared/IconText'
import appConfig from '../../../configs/app.config'

const CustomerInfo = ({ data }) => {
    return (
        <Card>
            <h5 className="mb-4">Shop Info</h5>
            <Link
                className="group flex items-center justify-between"
                to={`/shop/details?id=${data?.id}`}
            >
                <div className="flex items-center">
                    {/* <Avatar shape="circle" src={appConfig.apiPrefix + data?.image} /> */}
                    <div className="ml-2">
                        <div className="font-semibold group-hover:text-gray-900 group-hover:dark:text-gray-100">
                            {data?.name}
                        </div>
                        <span>
                            <span className="font-semibold">
                                {data?.previousOrder}{' '}
                            </span>
                            previous orders
                        </span>
                    </div>
                </div>
                <HiExternalLink className="text-xl hidden group-hover:block" />
            </Link>
            <hr className="my-5" />

            <IconText
                className="mb-3"
                icon={<HiPhone className="text-xl opacity-70" />}>
                <span className="font-semibold">{data?.mobile}</span>
            </IconText>
            <IconText
                icon={<HiMail className="text-xl opacity-70" />}
            >
                <span className="font-semibold">{data?.email}</span>
            </IconText>
            <hr className="my-5" />
            <h5 className="mb-4">Shop Address</h5>
            <ul className="not-italic">
                <li
                    className={`flex items-center justify-between capitalize mb-3`}
                >
                    <span>Village :</span>
                    <span className="font-semibold">
                        {data?.village}
                    </span>
                </li>
                {/* <li
                    className={`flex items-center justify-between capitalize mb-3`}
                >
                    <span>Pincode :</span>
                    <span className="font-semibold">
                        {data?.pincode}
                    </span>
                </li> */}
                <li
                    className={`flex items-center justify-between capitalize mb-3`}
                >
                    <span>Block :</span>
                    <span className="font-semibold">
                        {data?.block}
                    </span>
                </li>
                <li
                    className={`flex items-center justify-between capitalize mb-3`}
                >
                    <span>District</span>
                    <span className="font-semibold">
                        {data?.district}
                    </span>
                </li>
                <li
                    className={`flex items-center justify-between capitalize`}
                >
                    <span>State :</span>
                    <span className="font-semibold">
                        {data?.state}
                    </span>
                </li>
            </ul>
        </Card>
    )
}

export default CustomerInfo
