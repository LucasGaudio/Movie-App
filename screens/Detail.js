import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  Image,
  Dimensions,
  ActivityIndicator,
  Modal,
} from 'react-native';
import {getMovie} from '../services/services';
import StarRating from 'react-native-star-rating';
import dateFormat from 'dateformat';
import PlayButton from '../components/PlayButton';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import VideoPlayer from 'react-native-video-controls';
// import Video from 'react-native-video';

const height = Dimensions.get('screen').height;

const Detail = ({route, navigation}) => {
  const movieId = route.params.movieId;
  const [movieDetail, setMovieDetail] = useState();
  const [loaded, setLoaded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const placeholderImage = require('../assets/images/placeholder.png');

  const videoShown = () => {
    setModalVisible(!modalVisible);
  };

  useEffect(() => {
    getMovie(movieId).then(movieData => {
      setMovieDetail(movieData);
      setLoaded(true);
    });
  }, [movieId]);

  return (
    <>
      {loaded ? (
        <>
          <ScrollView>
            <Image
              style={styles.image}
              resizeMode="cover"
              source={
                movieDetail.poster_path
                  ? {
                      uri:
                        'https://image.tmdb.org/t/p/w500/' +
                        movieDetail.poster_path,
                    }
                  : placeholderImage
              }
            />
            <View style={styles.container}>
              <View style={styles.playButton}>
                <PlayButton handlePress={videoShown} />
              </View>
              <Text style={styles.movieTitle}>{movieDetail.title}</Text>
              {movieDetail.genres && (
                <View style={styles.genresContainer}>
                  {movieDetail.genres.map(genre => {
                    return (
                      <Text key={genre.id} style={styles.genre}>
                        {genre.name}
                      </Text>
                    );
                  })}
                </View>
              )}
              <StarRating
                disabled={true}
                maxStars={5}
                rating={movieDetail.vote_average / 2}
                fullStarColor={'gold'}
                starSize={30}
              />
              <Text style={styles.overview}>{movieDetail.overview}</Text>
              <Text style={styles.releaseDate}>
                {`Release date: ${dateFormat(
                  movieDetail.release_date,
                  'dd/mm/yyyy',
                )}`}
              </Text>
            </View>
          </ScrollView>
          <Modal animationType="slide" visible={modalVisible}>
            <View style={styles.videoModal}>
              {/* <Pressable onPress={() => videoShown()}>
                <Text>Test</Text>
              </Pressable> */}
              {/* <VideoPlayer
                source={{uri: 'https://vjs.zencdn.net/v/oceans.mp4'}}
                navigation={navigation}
                onBack={() => {
                  videoShown();
                }}
              /> */}
            </View>
          </Modal>
        </>
      ) : (
        <ActivityIndicator size="large" />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  genresContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    marginVertical: 10,
  },
  image: {
    height: height / 2.5,
  },
  movieTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginVertical: 10,
  },
  genre: {
    marginRight: 10,
    marginTop: 10,
    fontWeight: '500',
  },
  overview: {
    padding: 15,
  },
  releaseDate: {
    fontWeight: '700',
  },
  playButton: {
    position: 'absolute',
    top: -20,
    right: 20,
  },
  videoModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Detail;
