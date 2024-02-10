// import React from 'react'
// import { Card } from '../../../components/ui'
// import { Chart } from '../../../components/shared'

// const SalesReport = ({ className, data = {} }) => {
//     return (
//         <Card className={className}>
//             <div className="flex items-center justify-between">
//                 <h4>Sales Report</h4>
//                 {/* <Button size="sm">Export Report</Button> */}
//             </div>
//             <Chart
//                 series={data.series}
//                 xAxis={data.categories}
//                 height="380px"
//                 customOptions={{ legend: { show: false } }}
//             />
//         </Card>
//     )
// }

// export default SalesReport


import React from 'react';
import { Card } from '../../../components/ui';
import { Chart } from '../../../components/shared';

const SalesReport = ({ className, data = {} }) => {
  // Dummy data for the chart
  const dummyData = {
    series: [
      {
        name: 'Sales',
        data: [150, 200, 300, 250, 180, 400, 300], // Replace with your desired values
      },
    ],
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'], // Replace with your desired values
  };

  // Merge the dummy data with the provided data, if any
  const mergedData = {
    ...dummyData,
    ...data,
  };

  return (
    <Card className={className}>
      <div className="flex items-center justify-between">
        <h4>PO Recieved</h4>
        {/* Add a button or other elements as needed */}
      </div>
      <Chart
        series={mergedData.series}
        xAxis={mergedData.categories}
        height="380px"
        customOptions={{ legend: { show: false } }}
      />
    </Card>
  );
};

export default SalesReport;
