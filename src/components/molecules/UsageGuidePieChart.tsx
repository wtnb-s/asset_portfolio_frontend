import { memo, VFC } from 'react';
import { List, ListItem, Icon } from '@chakra-ui/react';

type Color = {
  colorCode: string;
  name: string;
};

type Props = {
  colorList: Color[];
};

export const UsageGuidePieChart: VFC<Props> = memo((props) => {
  const { colorList } = props;

  return (
    <List>
      {colorList.map((item, index) => (
        <ListItem key={index}>
          <Icon viewBox="0 0 250 250" color={item.colorCode}>
            <path fill="currentColor" d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0" />
          </Icon>
          {item.name}
        </ListItem>
      ))}
    </List>
  );
});
