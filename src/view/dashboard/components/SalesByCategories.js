


import React from 'react';
import { Card, Badge } from '../../../components/ui';
import { Chart } from '../../../components/shared';
import { COLORS } from '../../../constants/chart.constant';
import isEmpty from 'lodash/isEmpty';

const SalesByCategories = ({ data = {} }) => {
  const dummyData = {
    data: [30, 70], 
    labels: ['Product A', 'Product B'], 
  };

  return (
    <Card>
      <h4>Categories</h4>
      <div className="mt-6">
        {!isEmpty(dummyData) && (
          <>
            <Chart
              donutTitle={`${dummyData.data.reduce((a, b) => a + b, 0)}`}
              donutText="Top Two Product Sold"
              series={dummyData.data}
              customOptions={{ labels: dummyData.labels }}
              type="donut"
            />
          
          </>
        )}
      </div>
    </Card>
  );
};

export default SalesByCategories;
