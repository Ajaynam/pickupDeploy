
// Userinformation.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AddTrackingId, getUserInformation } from '../store/dataSlice';
import { Button, Input, Toast, Notification } from '../../../components/ui';

import './personalinfo.css'; // Import the CSS file



const Inchargeinformation = (data) => {



  const handleSave = async () => {
    let notificationWithAvatar;
    try {
      await dispatch(AddTrackingId({ userId, trackingNo }));
      setTrackingNo('');
      await dispatch(getUserInformation(userId));
      notificationWithAvatar = (
        <Notification title="njnj">
          {"njn"}
        </Notification>
      );
    } catch (error) {

      notificationWithAvatar = (
        <Notification title="nbj" type="danger">
          {"n "}
        </Notification>
      );
      Toast.push(notificationWithAvatar);
      console.error('Error saving tracking number:', error);
    }
  };

  const { userId } = useParams();
  const dispatch = useDispatch();
  console.log('ID from URL:', userId)



  useEffect(() => {
    dispatch(getUserInformation(userId));
  }, [dispatch, userId]);

  // const user = useSelector((state) => state.adminuserinformation.data.user);
  const user = data
  const loading = useSelector((state) => state.adminuserinformation.loading);
  console.log(user)

  const [trackingNo, setTrackingNo] = useState("");





  if (!user) {
    return (
      <div className=" p-10 mx-auto">
        <p>User information not found.</p>
      </div>
    );
  }
  if (user) {
    return (


      <div className="border" id="printable-content">


        <div className='  grid grid-cols-4 ml-4 mt-2 '>
          <div className='col-span-1 '>
            <h4 >{user.role} Order Details</h4>
          </div>
          <div className='col-span-2'><p className=' font-bold text-[14px]'>  Tracking No.</p>
            <Input disabled={user.trackingNo ? true : false}
              value={user.trackingNo ? user.trackingNo : trackingNo}
              onChange={(e) => setTrackingNo(e.target.value)}
            />
          </div>
          <div className='mt-5 ml-4'>
            {user.trackingNo ? "" : <Button variant="solid" onClick={handleSave}>
              Save
            </Button>}
          </div>
        </div>
        <div className="container mx-auto my-5 p-5">
          <div className="md:flex no-wrap md:-mx-2">
            <div className=" w-6/12 border md:mx-2">
              <div className="bg-white  p-3 border-t-4 border-green-400">

                <p className="text-gray-900 text-xl text-center leading-8 my-1"><strong>Order Id :</strong> #{user.orderId}</p>

                <ul className="bg-gray-100 text-gray-800  py-2 px-3 mt-3  rounded shadow-sm">

                  <li className=" text-center py-1">
                    <span className={user.status === "pending" ? "ml-6 text-orange-500 font-bold" : "ml-6 text-green-500 font-bold"}>{user.status}</span>
                  </li>
                </ul>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">Amount</div>
                  <div className="px-4 py-2">₹ {user.price}</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">Package Type</div>
                  <div className="px-4 py-2">{user.packageType}</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">Actual Weight</div>
                  <div className="px-4 py-2">{user.weight} </div>
                </div>
                <div className="grid grid-cols-2">
                  {user.ChargableWeight ? <div className="px-4 py-2 font-semibold">Chargable Weight</div> : ""}
                  <div className="px-4 py-2">{user.ChargableWeight} </div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">Ship Type</div>
                  <div className="px-4 py-2">{user.shiptype}</div>
                </div>

                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">Order Date</div>
                  <div className="px-4 py-2">{user.orderDate}</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">Tracking No.</div>
                  <div className="px-4 py-2">{user.trackingNo}</div>
                </div>

                {/* <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">tracking No</div>
                  <div className="px-4 py-2">{user.trackingNo}</div>
                </div> */}
              </div>
            </div>

            <div className="w-full border mx-2">
              <div className="bg-white p-3 shadow-sm rounded-sm">

                <div className="text-gray-700 ">
                  <div className="grid md:grid-cols-2 text-sm">
                    {/* Sender Details */}
                    <div >
                      <div className='border w-full '>
                        <p className='py-3 font-bold text-center'>Pickup Details</p>
                      </div>
                      <div className="grid border-2 grid-cols-2  border-r-2 p-2">

                        <div className="px-4 py-2 font-semibold"> Name</div>
                        <div className="px-4 py-2">{user.pname}</div>

                        <div className="px-4 py-2 font-semibold">Number</div>
                        <div className="px-4 py-2">{user.pnumber}</div>

                        {user.pemail ? <><div className="px-4 py-2 font-semibold">Email</div>
                          <div className="px-4 py-2">{user.pemail}</div></> : ""}

                        <div className="px-4 py-2 font-semibold">Address</div>
                        <div className="px-4 py-2">{user.paddress}</div>

                        <div className="px-4 py-2 font-semibold">Pin</div>
                        <div className="px-4 py-2">{user.ppin}</div>

                        <div className="px-4 py-2 font-semibold">City</div>
                        <div className="px-4 py-2">{user.pcity}</div>

                        <div className="px-4 py-2 font-semibold">State</div>
                        <div className="px-4 py-2">{user.pstate}</div>
                      </div>
                    </div>

                    {/* Receiver Details */}
                    <div>
                      <div className='border w-full '>
                        <p className='py-3 font-bold  text-center'>Delivery Details</p>
                      </div>
                      <div className="grid border-2 grid-cols-2 p-2">
                        <div className="px-4 py-2 font-semibold"> Name</div>
                        <div className="px-4 py-2">{user.dname}</div>
                        <div className="px-4 py-2 font-semibold">Number</div>
                        <div className="px-4 py-2">{user.dnumber}</div>
                        {user.demail ? <><div className="px-4 py-2 font-semibold">Email</div>
                          <div className="px-4 py-2">{user.demail}</div></> : ""}
                        <div className="px-4 py-2 font-semibold">Address</div>
                        <div className="px-4 py-2">{user.daddress}</div>

                        <div className="px-4 py-2 font-semibold">Reciever Pin</div>
                        <div className="px-4 py-2">{user.dpin}</div>

                        <div className="px-4 py-2 font-semibold">City</div>
                        <div className="px-4 py-2">{user.dcity}</div>

                        <div className="px-4 py-2 font-semibold">State</div>
                        <div className="px-4 py-2">{user.dstate}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='ml-2 mb-2'> <Button variant="twoTone" onClick={() => window.print()} >Print</Button></div>
      </div>
    );
  }
  else {
    return <div>user not found....</div>
  }
};

export default Inchargeinformation;

