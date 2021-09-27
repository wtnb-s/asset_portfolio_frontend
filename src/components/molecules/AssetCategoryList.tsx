import { Box, List, ListItem, Icon } from '@chakra-ui/react';
import { memo, VFC } from 'react';

import { Category } from '../../types/api/assetUnit';

type Color = {
  colorCode: string;
  name: string;
};

type Props = {
  colorList: Color[];
  assetUnitCategoryData: Category[];
  presentValue: number;
};

export const AssetCategoryList: VFC<Props> = memo((props) => {
  const { colorList, assetUnitCategoryData, presentValue } = props;

  return (
    <Box>
      <List borderTop={'1px dashed #ddd'}>
        {assetUnitCategoryData.map((data, index) => (
          <ListItem key={data.AssetCode} borderBottom={'1px dashed #ddd'} p={'1'} display={'table'} w={'100%'}>
            <Box display={'table-cell'} verticalAlign={'middle'} w={'30px'}>
              <Icon viewBox="0 0 250 250" color={colorList[Number(data.AssetCode) - 1].colorCode}>
                <path fill="currentColor" d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0" />
              </Icon>
            </Box>
            <Box display={'table-cell'} verticalAlign={'middle'}>
              {data.AssetName}
            </Box>
            <Box display={'table-cell'} w={'50px'}>
              <Box fontSize={13}>{`¥${data.PresentValue.toLocaleString()}`}</Box>
              <Box fontSize={14} fontWeight="semibold">
                {`${((data.PresentValue / presentValue) * 100).toFixed(1)}%`}
              </Box>
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
});
