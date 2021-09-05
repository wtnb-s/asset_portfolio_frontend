import { Box } from '@chakra-ui/react';
import { memo, VFC } from 'react';

import { CustomPieChartCategory } from '../../molecules/CustomPieChartCategory';
import { UsageGuidePieChart } from '../../molecules/UsageGuidePieChart';
import { Category } from '../../../types/api/assetUnit';

const COLORS = [
  { colorCode: '#00C49F', name: '日本株' },
  { colorCode: '#3C78F8', name: '先進国株' },
  { colorCode: '#FF8042', name: '新興株' },
  { colorCode: '#4dc4ff', name: '先進国債券' },
  { colorCode: '#ff8082', name: '新興国債券' },
  { colorCode: '#c9ace6', name: 'コモディティ' },
  { colorCode: '#CC9966', name: '暗号資産' },
];

type Props = {
  width: number;
  height: number;
  assetUnitCategoryData: Category[];
};

export const AssetCategoryPieChart: VFC<Props> = memo((props) => {
  const { width, height, assetUnitCategoryData } = props;
  let assetUnitCategoryDataFilteredEmpty = assetUnitCategoryData.filter((item) => item.PresentValue !== 0);

  return (
    <>
      {assetUnitCategoryData.length ? (
        <Box w={width} h={height} bg="white" borderRadius="10px" shadow="md" p={4} display={'flex'} position={'relative'}>
          <CustomPieChartCategory
            data={assetUnitCategoryDataFilteredEmpty}
            dataKey={'PresentValue'}
            cx={90}
            cy={90}
            innerRadius={35}
            outerRadius={90}
            colorList={COLORS}
          />
          <Box position={'absolute'} top={'10%'} left={'63%'}>
            <UsageGuidePieChart colorList={COLORS} />
          </Box>
        </Box>
      ) : (
        <></>
      )}
    </>
  );
});
