// import React from 'react'
// import { Button } from '../../../components/ui'
// import {HiPlusCircle } from 'react-icons/hi'
// import { Link } from 'react-router-dom'
// import EmployeeTableSearch from './EmployeeTableSearch'


// const EmployeeTableTools = () => {
//     // const categoriesData = useSelector((state) => state.productList.data.categories)
//     // const categories = [
//     //     { value: "", label: "All" },
//     //     ...categoriesData.map((item) => ({ label: item.name, value: item.name }))
//     // ];

//     return (
//         <div className="flex flex-col lg:flex-row gap-2 lg:items-center">
//             <EmployeeTableSearch />
//             {/* <Select
//                 options={categories}
//                 size='small'
//                 placeholder='Filter'
//                 onChange={(value) => dispatch(setFilterData(value.value))}
//             /> */}
//             <Link
//                 className="block lg:inline-block md:mx-2 md:mb-0 mb-4"
//                 to="/data/product-list.csv"
//                 target="_blank"
//                 download
//             >
//                 {/* <Button block size="sm" icon={<HiDownload />}>
//                     Export
//                 </Button> */}
//             </Link>
//             <Link
//                 className="block lg:inline-block md:mb-0 mb-4"
//                 to="/new-unit"
//             >
//                 <Button block variant="solid" size="sm" icon={<HiPlusCircle />}>
//                 Create Units 
//                 </Button>
//             </Link>
//         </div>
//     )
// }

// export default EmployeeTableTools

import React, { useState } from 'react';
import { Button, Dialog } from '../../../components/ui';
import { HiPlusCircle } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import EmployeeTableSearch from './EmployeeTableSearch';
import CreateUnitsDialog from './CreateUnitsDialog';
import PersonalInformation from './addunit/PersonalInformation';

const EmployeeTableTools = () => {
    const [isDialogOpen, setDialogOpen] = useState(false); // State variable for dialog visibility

    // Function to open the dialog
    const openDialog = () => {
        setDialogOpen(true);
    };

    // Function to close the dialog
    const closeDialog = () => {
        setDialogOpen(false);
    };

    return (
        <div className="flex flex-col lg:flex-row gap-2 lg:items-center">
            <EmployeeTableSearch />
            
            <Link
                className="block lg:inline-block md:mx-2 md:mb-0 mb-4"
                to="/data/product-list.csv"
                target="_blank"
                download
            >
                {/* Export button (You can customize this) */}
                {/* <Button block size="sm" icon={<HiDownload />}>
                    Export
                </Button> */}
            </Link>

            {/* Create Units button that opens the dialog */}
            <Button
                block
                variant="solid"
                size="sm"
                icon={<HiPlusCircle />}
                onClick={openDialog} // Open the dialog when the button is clicked
            >
                Create Pattern
            </Button>

            {/* Dialog component */}
            <Dialog
                isOpen={isDialogOpen}
                onClose={closeDialog} // Close the dialog when needed
                closable={true} // You can customize this prop
                width= {550}
                height={220}
                // closeTimeoutMS={/* Set the close animation duration */}
                // portalClassName="your-portal-class" // Add your portal class
                // overlayClassName="your-overlay-class" // Add your overlay class
                // contentClassName="your-content-class" // Add your content class
            >
                {/* <CreateUnitsDialog/> */}
                <PersonalInformation/>
                {/* Add form or content for creating units here */}
            </Dialog>
        </div>
    );
};

export default EmployeeTableTools;
