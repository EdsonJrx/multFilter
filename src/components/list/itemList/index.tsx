import { View, Text, StyleSheet } from "react-native";
import { ApiQuery } from "../../../api/type";

interface ApiQueryProps {
  item?: ApiQuery;
}

const ListItem = ({ item }: ApiQueryProps) => (
  <View style={styles.item}>
    <Text style={styles.title}>{item?.CODCCUSTO}</Text>
    <Text>{item?.USUARIOCRIACAO}</Text>
  </View>
);
const styles = StyleSheet.create({
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
export default ListItem;
