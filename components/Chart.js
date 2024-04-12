import React from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";
import { FontFamily, Color, FontSize, Moderate_Units } from "../GlobalStyles";
import { LineChart } from "react-native-chart-kit";

const Chart = ({ title, xData, yData, width, height, color }) => {

  // Function to remove the year part from the date
  const removeYear = (date) => {
    return date.substring(0, 5); // Removes the last 5 characters (year part)
  };

  const customXLabels = xData.map((label) => removeYear(label)); // Adjust the number of characters per line as needed

  return (
    <View>
      <Text style={[styles.title]}>
        {title}
      </Text>
      <ScrollView 
        horizontal={true} 
        showsHorizontalScrollIndicator={false}
        style={{ marginHorizontal: Moderate_Units.p_minus40 }}
      >
        <LineChart
          data={{
            datasets: yData,
            labels: customXLabels, // Use custom X-axis labels
          }}
          renderDotContent={({ x, y, index, indexData }) => (
            <View key={Math.random()} style={{ position: 'absolute', top: y - Moderate_Units.p_22, left: x - Moderate_Units.p_11 }}>
              <Text style={styles.dotLabel}>{indexData}</Text>
            </View>
          )}
          width={width} // from react-native
          height={height}
          withHorizontalLabels={false}
          transparent={true}
          yAxisLabel=""
          yAxisSuffix=""
          yAxisInterval={1} // optional, defaults to 1
          contentInset={{ left: 132, right: 32 }}
          chartConfig={{
            backgroundGradientFrom: Color.yellow,
            backgroundGradientTo: Color.orange,
            decimalPlaces: 0, // optional, defaults to 2dp
            //color: (opacity = 1) => `rgba(90, 90, 90, ${opacity})`,
            color: (opacity = 1) => `rgba(255, 222, 89, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(50, 50, 50, ${opacity})`,
            propsForDots: {
              strokeWidth: Moderate_Units.p_05,
              stroke: Color.lightOrange
            },
            yAxisLabelStyle: {
              fontFamily: FontFamily.subtitle,
              fontSize: FontSize.fs_12,
              fontFamily:'MontserratBold',
              fontWeight: 650,
            },
            xAxisLabelStyle: {
              fontFamily: FontFamily.subtitle,
              fontSize: FontSize.fs_12,
              fontFamily:'MontserratBold',
              fontWeight: 650,
            },
            propsForLabels: {
              fontSize: FontSize.fs_12,
              fontFamily:'MontserratBold',
              fontWeight: 700,
            },
          }}
          style={{
            marginVertical: Moderate_Units.p_10,
            borderRadius: Moderate_Units.p_15,
          }}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: FontFamily.subtitle,
    fontSize: FontSize.fs_15,
    color: Color.darkGrey,
    textAlign: "right"
  },
  dotLabel: {
    fontFamily: FontFamily.subtitle,
    fontSize: FontSize.fs_12,
    color: Color.orange,
    textAlign: "center"
  },
});

export default Chart;
