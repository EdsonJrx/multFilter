import React from 'react';
import { FlatList } from 'react-native';
import { ApiQuery } from "../../api/type";
import  ListItem  from './itemList';

interface ApiQueryProps {
  data?: ApiQuery[];
}

const List = ({ data }: ApiQueryProps) => {
  return (
    <FlatList<ApiQuery>
      data={data}
      renderItem={({ item }) => <ListItem item={item} />}
      keyExtractor={item => item.IDMOV.toString()}
      initialNumToRender={10}
      windowSize={21}
    />
  );
};

export default List;
