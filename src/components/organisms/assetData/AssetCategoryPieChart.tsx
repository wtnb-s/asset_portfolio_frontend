import { Box } from '@chakra-ui/react';
import { memo, VFC } from 'react';

import { CustomPieChartCategory } from '../../molecules/CustomPieChartCategory';
import { UsageGuidePieChart } from '../../molecules/UsageGuidePieChart';
import { AssetCategoryList } from '../../molecules/AssetCategoryList';
import { Category } from '../../../types/api/assetUnit';

const COLORS = [
  { colorCode: '#00C49F', name: '国内株' },
  { colorCode: '#3C78F8', name: '先進国株' },
  { colorCode: '#FF8042', name: '新興株' },
  { colorCode: '#4dc4ff', name: '先進国債券' },
  { colorCode: '#ff8082', name: '新興国債券' },
  { colorCode: '#c9ace6', name: 'コモディティ' },
  { colorCode: '#CC9966', name: '暗号資産' },
  { colorCode: '#CCCCCC', name: '現金' },
];

type Props = {
  width: number;
  assetUnitCategoryData: Category[];
};

export const AssetCategoryPieChart: VFC<Props> = memo((props) => {
  const { width, assetUnitCategoryData } = props;
  let assetUnitCategoryDataFilteredEmpty = assetUnitCategoryData.filter((item) => item.PresentValue !== 0);

  const presentValue = assetUnitCategoryDataFilteredEmpty.reduce((sum: number, item: Category) => sum + item.PresentValue, 0);
  const acquisitionPrice = assetUnitCategoryDataFilteredEmpty.reduce((sum: number, item: Category) => sum + item.TotalBuyPrice, 0);
  const netProfitLoss = presentValue - acquisitionPrice;

  return (
    <>
      {assetUnitCategoryData.length ? (
        <Box w={width} h={'auto'} overflow={'hidden'} bg="white" borderRadius="10px" shadow="md" p={4}>
          <Box position={'relative'}>
            <CustomPieChartCategory
              data={assetUnitCategoryDataFilteredEmpty}
              presentValue={presentValue}
              netProfitLoss={netProfitLoss}
              dataKey={'PresentValue'}
              cx={90}
              cy={90}
              innerRadius={35}
              outerRadius={90}
              colorList={COLORS}
            />
            <Box position={'absolute'} top={'0%'} left={'64%'}>
              <UsageGuidePieChart colorList={COLORS} />
            </Box>
          </Box>
          <AssetCategoryList colorList={COLORS} assetUnitCategoryData={assetUnitCategoryDataFilteredEmpty} presentValue={presentValue} />
        </Box>
      ) : (
        <></>
      )}
    </>
  );
});
