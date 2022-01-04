import React from 'react';
import PropTypes from 'prop-types';
import {Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

export default function Card({item, navigation}) {
  const placeholderImage = require('../assets/images/placeholder.png');

  return (
    <TouchableOpacity
      style={styles.cardWrapper}
      onPress={() => navigation.navigate('Detail', {movieId: item.id})}>
      <Image
        style={styles.image}
        resizeMode="cover"
        source={
          item.poster_path
            ? {uri: 'https://image.tmdb.org/t/p/w500/' + item.poster_path}
            : placeholderImage
        }
      />
      {!item.poster_path && (
        <Text style={styles.placeholderMovieName}>{item.title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    height: 200,
    padding: 5,
    position: 'relative',
    alignItems: 'center',
    marginBottom: 8,
  },
  image: {
    height: 200,
    width: 120,
    borderRadius: 20,
  },
  placeholderMovieName: {
    position: 'absolute',
    width: 100,
    textAlign: 'center',
    paddingTop: 10,
  },
});

Card.propTypes = {
  item: PropTypes.object,
};
