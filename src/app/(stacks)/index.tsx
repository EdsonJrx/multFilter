import * as S from "./styles";
import MultFilter from "../../components/multFIlter";
import { generateArray } from "../../services/ApiQueryTransformer";
import {DATA, selectedItems} from "../../api/seed";
import  List  from "../../components/list";
import { config } from "../../components/multFIlter/config";
import { filterData } from "../../services/FilterList";

export default function Home() {

  const itemsFilter= generateArray(DATA, config)
  const filteredData = filterData(DATA, selectedItems);
  console.log(filteredData)

  return (
    <S.Container>
      <MultFilter items={itemsFilter} />
      <List data={filteredData}/>
    </S.Container>
  );
}
