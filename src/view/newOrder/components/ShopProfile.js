import React from "react";
import { HiPhone } from "react-icons/hi";
import IconText from "../../../components/shared/IconText";
import { Card } from "../../../components/ui";

const ShopProfile = ({ data = {} }) => {

    return (
        <Card>
            <div>
            <h6 className="mb-2">Shop name</h6>
                <h5 className="flex text-gray-700" >{data?.name}</h5>
            </div>
            <hr className="my-5" />
            <IconText className="mb-4" icon={<HiPhone className="text-xl opacity-70" />}>
                <span className="font-semibold">{data?.mobile}</span>
            </IconText>
            <hr className="my-5" />
            <h6 className="mb-4">Shop Address</h6>

            <address className="not-italic">
                <div className="mb-1 "><span className="font-semibold" >City/Village/Town:   </span><span className="capitalize text-md" >{data?.villageName}</span></div>
                <div className="mb-1 "><span className="font-semibold" >Block:</span> <span className="capitalize text-md" >{data?.blockName}</span></div>
                <div className="mb-1 "><span className="font-semibold" >District:</span> <span className="capitalize text-md" >{data?.districtName}</span></div>
                <div className="mb-1 "><span className="font-semibold" >State:</span> <span className="capitalize text-md" >{data?.stateName}</span></div>

            </address>
        </Card>
    )
}

export default ShopProfile;