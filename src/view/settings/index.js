// import React, { useState } from 'react';
// import { Menu } from '../../components/ui';

// const Sidebar = ({ onSelect }) => {
//   const [defaultActiveKey, setDefaultActiveKey] = useState(['item-2', 'item-3-2']);

//   const handleSelect = (selectedKeys) => {
//     setDefaultActiveKey(selectedKeys);
//     onSelect(selectedKeys);
//   };

//   return (
//     <div className="border rounded-md p-2" style={{ maxWidth: 250 }}>
//       <Menu defaultActiveKeys={defaultActiveKey} onSelect={handleSelect}>
//         <Menu.MenuItem eventKey="item-1">Item 1</Menu.MenuItem>
//         <Menu.MenuItem eventKey="item-2">Item 2</Menu.MenuItem>
//         <Menu.MenuCollapse eventKey="item-3" label="Item 3">
//           <Menu.MenuItem eventKey="item-3-1">Item 3.1</Menu.MenuItem>
//           <Menu.MenuItem eventKey="item-3-2">Item 3.2</Menu.MenuItem>
//         </Menu.MenuCollapse>
//       </Menu>
//     </div>
//   );
// };

// const ContentDisplay = ({ selectedItem }) => {
//   // Render different content based on the selected item
//   switch (selectedItem) {
//     case 'item-1':
//       return <div>Content for Item 1</div>;
//     case 'item-2':
//       return <div>Content for Item 2</div>;
//     case 'item-3-1':
//       return <div>Content for Item 3.1</div>;
//     case 'item-3-2':
//       return <div>Content for Item 3.2</div>;
//     default:
//       return <div>Select an item from the sidebar</div>;
//   }
// };

// const MainComponent = () => {
//   const [selectedItem, setSelectedItem] = useState(null);

//   const handleSelect = (selectedKeys) => {
//     setSelectedItem(selectedKeys[0]);
//   };

//   return (
//     <div className="flex">
//       <Sidebar onSelect={handleSelect} />
//       <div className="p-4">
//         <ContentDisplay selectedItem={selectedItem} />
//       </div>
//     </div>
//   );
// };

// export default MainComponent;
// import React, { useState } from 'react';
// import { Menu } from '../../components/ui';
// // import { Menu } from 'components/ui';

// const Sidebar = ({ onSelect }) => {
//   const [defaultActiveKey, setDefaultActiveKey] = useState(['item-2', 'item-3-2']);

// //   const handleSelect = (selectedKeys) => {
// //     setDefaultActiveKey(selectedKeys);
// //     onSelect(selectedKeys);
// //   };
//   const handleSelect = (selectedKeys) => {
//     console.log('Selected Keys:', selectedKeys);
//     setDefaultActiveKey(selectedKeys);
//     onSelect(selectedKeys);
//   };


//   return (
//     <div className="border rounded-md p-2" style={{ maxWidth: 250 }}>
//       <Menu defaultActiveKeys={defaultActiveKey} onSelect={handleSelect}>
//         <Menu.MenuItem eventKey="item-1">Item 1</Menu.MenuItem>
//         <Menu.MenuItem eventKey="item-2">Item 2</Menu.MenuItem>
//         <Menu.MenuCollapse eventKey="item-3" label="Item 3">
//           <Menu.MenuItem eventKey="item-3-1">Item 3.1</Menu.MenuItem>
//           <Menu.MenuItem eventKey="item-3-2">Item 3.2</Menu.MenuItem>
//         </Menu.MenuCollapse>
//       </Menu>
//     </div>
//   );
// };

// const ContentDisplay = ({ selectedItem }) => {
//   // Render different content based on the selected item
//   switch (selectedItem) {
//     case 'item-1':
//       return <div>Content for Item 1</div>;
//     case 'item-2':
//       return <div>Content for Item 2</div>;
//     case 'item-3-1':
//       return <div>Content for Item 3.1</div>;
//     case 'item-3-2':
//       return <div>Content for Item 3.2</div>;
//     default:
//       return <div>Select an item from the sidebar</div>;
//   }
// };

// const MainComponent = () => {
//   const [selectedItem, setSelectedItem] = useState(null);

//   const handleSelect = (selectedKeys) => {
//     setSelectedItem(selectedKeys[0]);
//   };



//   return (
//     <div className="flex">
//       <Sidebar onSelect={handleSelect} />
//       <div className="p-4">
//         <ContentDisplay selectedItem={selectedItem} />
//       </div>
//     </div>
//   );
// };

// export default MainComponent;


// import React, { useState } from 'react';
// import { Menu } from '../../components/ui';

// const Sidebar = ({ onSelect }) => {
//   const [defaultActiveKey, setDefaultActiveKey] = useState(['item-2', 'item-3-2']);

//   const handleSelect = (selectedKeys) => {
//     console.log('Selected Keys:', selectedKeys);
//     setDefaultActiveKey(selectedKeys);
//     onSelect(selectedKeys);
//   };

//   return (
//     <div className="border rounded-md p-2" style={{ maxWidth: 250 }}>
//       <Menu defaultActiveKeys={defaultActiveKey} onSelect={handleSelect}>
//         <Menu.MenuItem eventKey="item-1">Item 1</Menu.MenuItem>
//         <Menu.MenuItem eventKey="item-2">Item 2</Menu.MenuItem>
//         <Menu.MenuCollapse eventKey="item-3" label="Item 3">
//           <Menu.MenuItem eventKey="item-3-1">Item 3.1</Menu.MenuItem>
//           <Menu.MenuItem eventKey="item-3-2">Item 3.2</Menu.MenuItem>
//         </Menu.MenuCollapse>
//       </Menu>
//     </div>
//   );
// };

//   // Render different content based on the selected item
//   const ContentDisplay = ({ selectedItem }) => {
//     console.log('ContentDisplay Selected Item:', selectedItem);
//     // Render different content based on the selected item
//     switch (selectedItem) {
//       case 'item-1':
//         return <div>Content for Item 1</div>;
//       case 'item-2':
//         return <div>Content for Item 2</div>;
//       case 'item-3-1':
//         return <div>Content for Item 3.1</div>;
//       case 'item-3-2':
//         return <div>Content for Item 3.2</div>;
//       default:
//         return <div>Select an item from the sidebar</div>;
//     }
//   };


// const MainComponent = () => {
//   const [selectedItem, setSelectedItem] = useState(null);

//   const handleSelect = (selectedKeys) => {
//     console.log('MainComponent Selected Item:', selectedKeys[0]);
//     setSelectedItem(selectedKeys[0]);
//   };

//   return (
//     <div className="flex">
//       <Sidebar onSelect={handleSelect} />
//       <div className="p-4">
//         <ContentDisplay selectedItem={selectedItem} />
//       </div>
//     </div>
//   );
// };

// export default MainComponent;


import React, { useState  ,lazy} from 'react';
import { Menu } from '../../components/ui';

const MainComponent = () => {
    const [selectedItem, setSelectedItem] = useState(null);
   
   
    const PersonalInformation = lazy(() =>
    import('../AddPattern')
)

    const handleSelect = (item) => {
        setSelectedItem(item);
    };

    return (
        <div className="flex">
            <Menu className="border rounded-md p-2" style={{ maxWidth: 250 }}>
                {/* <Menu.MenuItem
                    className={`sidebar-item ${selectedItem === 'item-1' && 'active'}`}
                    onClick={() => handleSelect('item-1')}
                >
                    Item 1
                </Menu.MenuItem> */ }

                <Menu.MenuCollapse label="Product Settings">
                    <Menu.MenuItem   className={`sidebar-item ${selectedItem === 'Pattern' && 'active'}`}
                    onClick={() => handleSelect('Pattern')}>Pattern Id</Menu.MenuItem>
                    <Menu.MenuItem   className={`sidebar-item ${selectedItem === 'Material' && 'active'}`}
                    onClick={() => handleSelect('Material')}>Material Id</Menu.MenuItem>
                     <Menu.MenuItem   className={`sidebar-item ${selectedItem === 'Category' && 'active'}`}
                    onClick={() => handleSelect('Category')}>Category Id</Menu.MenuItem>
                </Menu.MenuCollapse>
            </Menu>
            <div className="p-4">
                {/* Render content based on the selected item */}
                {/* {selectedItem === 'item-1' && <div>Content for Item 1</div>}
                {selectedItem === 'item-3-1' && <div>Content for Item 3.1</div>}
                {selectedItem === 'item-3-2' && <div>Content for Item 3.2</div>} */}
                {selectedItem === 'Pattern' && <div>Pattern</div>}
                {selectedItem === 'Material' && <div>Material</div>}
                {selectedItem === 'Category' && <div>Category</div>}
                {selectedItem === null && <div>Select an item from the sidebar</div>}
            </div>
        </div>
    );
};

export default MainComponent;



// import React, { useState, lazy, Suspense } from 'react';
// import { Menu } from '../../components/ui';
// import  pagesRoute  from '../../configs/route.configs/pagesRoute';

// const MainComponent = () => {
//     const [selectedItem, setSelectedItem] = useState(null);
    

//     const handleSelect = (item) => {
//         setSelectedItem(item);
//     };

//     const getPageConfig = (item) => {
//         return pagesRoute.find((page) => page.key === item);
//     };

//     const renderComponent = () => {
//         const pageConfig = getPageConfig(selectedItem);

//         if (pageConfig) {
//             const Component = lazy(pageConfig.component);

//             return (
//                 <Suspense fallback={<div>Loading...</div>}>
//                     <Component />
//                 </Suspense>
//             );
//         }

//         return <div>Select an item from the sidebar</div>;
//     };

//     return (
//         <div className="flex">
//             <Menu className="border rounded-md p-2" style={{ maxWidth: 250 }}>
//                 {/* Your menu items... */}


//                 <Menu.MenuCollapse label="Product Settings">
//                     <Menu.MenuItem className={`sidebar-item ${selectedItem === 'Pattern' && 'active'}`}
//                         onClick={() => handleSelect('Pattern')}>Pattern Id</Menu.MenuItem>
//                     <Menu.MenuItem className={`sidebar-item ${selectedItem === 'Material' && 'active'}`}
//                         onClick={() => handleSelect('Material')}>Material Id</Menu.MenuItem>
//                     <Menu.MenuItem className={`sidebar-item ${selectedItem === 'Category' && 'active'}`}
//                         onClick={() => handleSelect('Category')}>Category Id</Menu.MenuItem>
//                 </Menu.MenuCollapse>

//             </Menu>
//             <div className="p-4">{renderComponent()}</div>
//         </div>
//     );
// };

// export default MainComponent;
