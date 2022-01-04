import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, StyleSheet, FlatList, Dimensions} from 'react-native';
import Card from './Card';

export default function List({title, content, navigation}) {
  return (
    <View style={styles.carousel}>
      <View style={styles.listWrapper}>
        <View>
          <Text style={styles.text}>{title}</Text>
        </View>
        <View>
          <FlatList
            data={content}
            // renderItem={popularMoviesShow}
            horizontal={true}
            renderItem={({item}) => (
              <Card navigation={navigation} item={item} />
            )}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  carousel: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listWrapper: {
    marginTop: 25,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
    paddingBottom: 15,
    color: '#fff',
  },
});

List.propTypes = {
  title: PropTypes.string,
  content: PropTypes.array,
};
