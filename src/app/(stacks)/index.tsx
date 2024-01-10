import { useState, useEffect } from "react";
import * as S from "./styles";
import MultFilter from "../../components/multFIlter";
import { generateArray } from "../../services/ApiQueryTransformer";
import {DATA} from "../../api/seed";
import  List  from "../../components/list";
import { config } from "../../components/multFIlter/config";
import { filterData } from "../../services/DataFilter";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home() {
  const [filteredData, setFilteredData] = useState(DATA);

  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('newSelectedItems').then((value) => {
        if (value !== null) {
          const newSelectedItems = JSON.parse(value);
          setFilteredData(filterData(DATA, newSelectedItems));
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    retrieveData();
  }, []);

  const itemsFilter= generateArray(DATA, config)
  const applyFilter = () => {
    retrieveData()
  }

  return (
    <S.Container>
      <MultFilter items={itemsFilter} handleFilter={applyFilter}/>
      <List data={filteredData}/>
    </S.Container>
  );
}
