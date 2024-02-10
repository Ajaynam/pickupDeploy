
import React, { useState } from 'react';
import Toggle from './Toggle';
// import Document from './Document';
import PickupParcel from './PickupParcel';
import PickupCargo from './PickupCargo';
import Documents from './Documents';

const PickupMode = () => {
  const [activeButton, setActiveButton] = useState('Document');

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <div className='  w-full  ' >
    {/* <img src='image/banner5.jpg ' className='w-full  relative'></img> */}

      <div className="   ">
        {/* <div className="flex">
          <Toggle
            label="Document"
            active={activeButton === 'Document'}
            onClick={() => handleButtonClick('Document')}
          />
          <Toggle
            label="Parcel"
            active={activeButton === 'Parcel'}
            onClick={() => handleButtonClick('Parcel')}
          />
          <Toggle
            label=" Cargo"
            active={activeButton === 'Cargo'}
            onClick={() => handleButtonClick('Cargo')}
          />
        </div> */}

        <div className="mt-2">
          {activeButton === 'Document' && <div><Documents /></div>}
          {/* {activeButton === 'Parcel' && <div> <PickupParcel /> </div>}
          {activeButton === 'Cargo' && <div> <PickupCargo /></div>} */}

        </div>

      </div>
    </div>
  );
};

export default PickupMode;