import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

export default function TileMap(props) {
  const tileMap = {
    rows: props.rows,
    columns: props.columns,
    layers: [props.layers],
  };
  const layer = [];
  const mapIndex = [];
  tileMap.layers.forEach((l, index) => {
    for (let r = 0; r < tileMap.rows; r++) {
      // Loop over row
      for (let c = 0; c < tileMap.columns; c++) {
        // Loop over columns
        const gridIndex = r * tileMap.columns + c; // Get index in grid
        if (l[gridIndex] > 0) {
          mapIndex[gridIndex] = l[gridIndex];
        } else {
          mapIndex[gridIndex] = 't';
        }
        if (layer[gridIndex] !== 0) {
          layer.push({
            row: r,
            column: c,
            tileIndex: gridIndex,
            test: l[gridIndex],
          });
        }
      }
    }
  });
  function getTileStyles(column, row, size) {
    const left = column * size;
    const top = row * size;

    return {
      height: size,
      width: size,
      overflow: 'hidden',
      position: 'absolute',
      left: left + props.body[0].position.x,
      top: top + props.body[0].position.y,
    };
  }
  let img = props.img;
  React.useEffect(() => {
  
  }, []);

  return (
    <View style={styles.container}>
      {layer
        .filter((f, i) => f.test == mapIndex[i])
        .map((x) => (
          <Image
            style={getTileStyles(x.column, x.row, props.size)}
            source={img[x.test - 1]}
          />
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, position: 'absolute' },
});
