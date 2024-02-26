import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';

// Import all background images
import Background1 from './assets/Background1.jpg';
import Background2 from './assets/Background2.jpg';
import Background3 from './assets/Background3.jpg';
import Background4 from './assets/Background4.jpg';

function LoadingScreen() {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="pink" />
      <Text style={styles.loadingText}>Pink-u!</Text>
    </View>
  );
}

// Define an array with all background images
const backgrounds = [Background1, Background2, Background3, Background4];

function getRandomBackground() {
  const randomIndex = Math.floor(Math.random() * 4);
  return backgrounds[randomIndex];
}

function getAdviceTextColor(backgroundImage: any) {
  switch (backgroundImage) {
    case Background1:
      return 'red';
    case Background2:
      return '#3EE9E8';
    case Background3:
      return 'pink';
    case Background4:
      return 'white';
    default:
      return 'black';
  }
}

function App() {
  const [advice, setAdvice] = useState('Click the button to get Advice');
  const [loading, setLoading] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState(getRandomBackground());

  async function getAdvice() {
    setLoading(true);
    const random = Math.floor(Math.random() * 1000);
    const res = await fetch('https://api.adviceslip.com/advice?id=' + random);
    const data = await res.json();
    setAdvice(data.slip.advice);
    setLoading(false);
  }

  useEffect(() => {
    setBackgroundImage(getRandomBackground());
  }, []); // Run only once when the component mounts

  const adviceTextColor = getAdviceTextColor(backgroundImage);

  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        resizeMode="stretch"
        source={backgroundImage}
        style={styles.ImageBackground}
      />

      <Text style={[styles.adviceText, {color: adviceTextColor}]}>
        {' '}
        " {advice} "{' '}
      </Text>

      {loading ? <LoadingScreen /> : null}

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={getAdvice}>
          <Text style={styles.buttonText}>Get New</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  adviceText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 350,
    marginHorizontal: 20,
    textShadowColor: 'rgba(255, 0, 0, 0.2)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 10,
    elevation: 5,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50, // Adjust this value to change the distance from the bottom
    width: '100%',
    alignItems: 'center',
  },
  button: {
    width: 100,
    height: 50,
    backgroundColor: 'rgba(44, 62, 80, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },

  buttonText: {
    textShadowColor: 'rgba(255, 0, 0, 0.7)',
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  ImageBackground: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: 'pink',
    fontSize: 18,
    marginTop: 10,
  },
});

export default App;
