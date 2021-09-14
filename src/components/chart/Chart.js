import React from 'react';
import Chart from "react-google-charts";

export default function PieChart(props) {
    return <Chart
        chartType="PieChart"
        loader={<div>Loading Chart</div>}
        data={[['Language', 'Percentage'], ...props.data.map(item => ([item.title, item.value ]))]}
        options={{
            pieSliceText: 'label',
            slices: {
                4: { offset: 0.2 },
                12: { offset: 0.3 },
                14: { offset: 0.4 },
                15: { offset: 0.5 },
            },
        }}
        rootProps={{ 'data-testid': '5' }}
    />;
};

