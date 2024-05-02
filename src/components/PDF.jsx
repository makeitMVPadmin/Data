import React from "react";
import {
  Image,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";
const styles = StyleSheet.create({
  page: {
    display: "flex",
    flexDirection: "column",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  image: {
    height: 400
  }
});
const PDF = ({ title, chart }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>{title}</Text>
        </View>
        <View style={styles.section}>
          {chart && <Image style={styles.image} src={chart}></Image>}
        </View>
      </Page>
    </Document>
  );
};
export default PDF;
