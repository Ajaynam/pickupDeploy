
import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleOrder } from '../store/dataSlice';
import { Input, Button } from '../../../components/ui';
import Documents from './Ratecalculator'
import PickupParcel from './ParcelRateCalculator';


const EditOrderForm = () => {

  const location = useLocation();
  const { pickupDetails, deliveryDetails, packageDetails, rate, airRate, expectedDeliveryTime } = location.state || {};

  const user = useSelector((state) => state.adminPoAcceptance.data.user);
  console.log(user)
  // const loading = useSelector((state) => state.adminPoAcceptance.data.loading);
  const { userId } = useParams();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState();
  const [loading, setLoading] = useState(false)







  useEffect(() => {
    dispatch(getSingleOrder(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    setFormData(user);
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // const handleSubmit = (e) => {
  //   setLoading(true)
  //   e.preventDefault();

  //   dispatch(updateOrder(formData));
  //   setLoading(false)

  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`https://pickup-server-y10z.onrender.com//order/updateOrder/${userId}`, {
        method: 'PUT', // or 'POST' depending on your API
        headers: {
          'Content-Type': 'application/json',
          // Additional headers if needed
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Handle success, maybe update local state or show a success message
        window.alert("Data updated successfully")
        console.log('Data updated successfully');
      } else {
        // Handle error, maybe show an error message
        console.error('Failed to update data');
      }
    } catch (error) {
      // Handle network errors or any other errors
      console.error('Error:', error);
    }

    setLoading(false);
  };


  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <form onSubmit={handleSubmit} >
        <div className='grid gap-4 grid-cols-2 mb-4'>

          <div className=' border '>
            <h5 className='p-4 text-gray-500'>Pickup details</h5>
            <div className='  p-4 gap-3 grid grid-cols-2'>

              <div>
                <label className="block text-sm font-medium text-gray-600"> Name</label>
                <Input
                  type="text"
                  name="pname"
                  value={formData?.pname || ''}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600"> number</label>
                <Input
                  type="text"
                  name="pnumber"
                  value={formData?.pnumber || ''}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">email</label>
                <Input
                  type="text"
                  name="pemail"
                  value={formData?.pemail || ''}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"

                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600"> address</label>
                <Input
                  type="text"
                  name="paddress"
                  value={formData?.paddress || ''}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">pin</label>
                <Input
                  type="text"
                  name="ppin"
                  value={pickupDetails?.pickupPincode > 0 ? pickupDetails?.pickupPincode : formData?.ppin || ""}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">city</label>
                <Input
                  type="text"
                  name="pcity"
                  value={pickupDetails?.pickupPincodeSuggestions  ? pickupDetails?.pickupPincodeSuggestions : formData?.pcity || ""}
                  // value={pickupDetails?. pickupPincodeSuggestions || ""}
                 
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">state</label>
                <Input
                  type="text"
                  name="pstate"
                  value={pickupDetails?.pickupSateSuggestions  ? pickupDetails?.pickupSateSuggestions : formData?.pstate || ""}
                  // value={pickupDetails?.pickupSateSuggestions || ""}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                  readOnly
                />
              </div>
            </div>
          </div>
          <div className=' border '>
            <h5 className='p-4 text-gray-500'>Delivery details</h5>
            <div className='  p-4 gap-3 grid grid-cols-2'>

              <div>
                <label className="block text-sm font-medium text-gray-600"> Name</label>
                <Input
                  type="text"
                  name="dname"
                  value={formData?.dname || ''}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Number</label>
                <Input
                  type="text"
                  name="dnumber"
                  value={formData?.dnumber || ''}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Email</label>
                <Input
                  type="text"
                  name="demail"
                  value={formData?.demail || ''}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"

                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Product Name</label>
                <Input
                  type="text"
                  name="daddress"
                  value={formData?.daddress || ''}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Pin</label>
                <Input
                  type="text"
                  name="dpin"
                  value={ deliveryDetails?.deliveryPincode > 0 ? deliveryDetails?.deliveryPincode : formData?.dpin || ""}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">City</label>
                <Input
                  type="text"
                  name="dcity"
                  value={deliveryDetails?.deliveryPincodeSuggestions  ? deliveryDetails?.deliveryPincodeSuggestions : formData?.dcity || ""}

                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">State</label>
                <Input
                  type="text"
                  name="dstate"
                  value={deliveryDetails?.deliverySateSuggestions  ? deliveryDetails?.deliverySateSuggestions : formData?.dstate || ""}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                  readOnly
                />
              </div>
            </div>
          </div>
          <div className=' border '>
            <h5 className='p-4 text-gray-500'>Package details</h5>
            <div className=' p-4 gap-3  grid grid-cols-2'>
              <div>
                <label className="block text-sm font-medium text-gray-600">package Type</label>
                <Input
                  type="text"
                  name="packageType"
                  value={formData?.packageType || ''}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">weight</label>
                <Input
                  type="text"
                  name="weight"
                  value={packageDetails?.parcelWeight > 0 ? packageDetails?.parcelWeight : formData?.weight || ""}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Chargable Weight</label>
                <Input
                  type="text"
                  name="ChargableWeight"
                  value={packageDetails?.cahargablWeight > 0 ? packageDetails?.cahargablWeight : formData?.ChargableWeight || ""}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">ship type </label>
                <Input
                  type="text"
                  name="shiptype"
                  value={formData?.shiptype || ''}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Amount</label>
                <Input
                  type="text"
                  name="price"
                  value={rate > 0 ? rate : formData?.price || ''}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">order Date</label>
                <Input
                  type="text"
                  name="orderDate"
                  value={formData?.orderDate || ''}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">status</label>
                <Input
                  type="text"
                  name="status"
                  value={formData?.status || ''}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">tracking No</label>
                <Input
                  type="text"
                  name="trackingNo"
                  value={formData?.trackingNo || ''}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  disabled
                />
              </div>
            </div>
          </div>

        </div>
        {/* Add other form fields similarly */}
        <Button type="submit" variant="solid" loading={loading} >
          Update Order
        </Button>

      </form>
      <div>
        <div>
          {user.packageType === "document" ? <Documents data={user} /> : user.packageType === "parcel" ? <PickupParcel data={user} /> : ""}
        </div>
      </div>
    </div>
  );
};

export default EditOrderForm;
