import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {
  getUpcomingMovies,
  getPopularMovies,
  getAdventureMovies,
  getDocumentaryMovies,
  getFamilyMovies,
  getPopularTv,
} from '../services/services';
import {SliderBox} from 'react-native-image-slider-box';
import List from '../components/List';
import Error from '../components/Error';
const dimention = Dimensions.get('screen');

const Home = ({navigation}) => {
  const [moviesImage, setMoviesImage] = useState([]);
  const [popularMovies, setPopularMovies] = useState(null);
  const [adventureMovies, setAdventureMovies] = useState(null);
  const [documentaryMovies, setDocumentaryMovies] = useState(null);
  const [familyMovies, setFamilyMovies] = useState(null);
  const [popularTv, setPopularTv] = useState(null);
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const getData = () => {
    return Promise.all([
      getUpcomingMovies(),
      getPopularMovies(),
      getAdventureMovies(),
      getDocumentaryMovies(),
      getFamilyMovies(),
      getPopularTv(),
    ]);
  };

  useEffect(() => {
    getData()
      .then(
        ([
          upcomingMoviesData,
          popularMoviesData,
          adventureMoviesData,
          documentaryMoviesData,
          familyMoviesData,
          popularTvData,
        ]) => {
          const movieImageArray = [];
          upcomingMoviesData.forEach(movie => {
            movieImageArray.push(
              'https://image.tmdb.org/t/p/w500/' + movie.poster_path,
            );
          });
          setMoviesImage(movieImageArray);
          setPopularMovies(popularMoviesData);
          setAdventureMovies(adventureMoviesData);
          setDocumentaryMovies(documentaryMoviesData);
          setFamilyMovies(familyMoviesData);
          setPopularTv(popularTvData);
        },
      )
      .catch(err => {
        setError(err);
        console.error(error);
      })
      .finally(() => {
        setLoaded(true);
      });
  }, []);

  const popularMoviesShow = itemData => {
    console.log('entrou' + itemData);
    return <Text>{itemData.title}</Text>;
  };

  return (
    <>
      {!error ? (
        loaded ? (
          <ScrollView style={{backgroundColor: '#000'}}>
            {moviesImage && (
              <View style={styles.sliderContainer}>
                <SliderBox
                  images={moviesImage}
                  autoplay
                  circleLoop
                  sliderBoxHeight={dimention.height / 1.5}
                  dotStyle={styles.sliderStyle}
                />
              </View>
            )}
            {popularMovies && (
              <List
                navigation={navigation}
                title="Popular Movies"
                content={popularMovies}
              />
            )}
            {popularTv && (
              <List
                navigation={navigation}
                title="Popular TV Shows"
                content={popularTv}
              />
            )}
            {adventureMovies && (
              <List
                navigation={navigation}
                title="Adventure Movies"
                content={adventureMovies}
              />
            )}
            {documentaryMovies && (
              <List
                navigation={navigation}
                title="Documentary Movies"
                content={documentaryMovies}
              />
            )}
            {familyMovies && (
              <List
                navigation={navigation}
                title="Family Movies"
                content={familyMovies}
              />
            )}
          </ScrollView>
        ) : (
          <ActivityIndicator size="large" />
        )
      ) : (
        <Error />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderStyle: {
    height: 0,
  },
});

export default Home;
