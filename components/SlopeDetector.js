import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import * as Speech from 'expo-speech';

export default function SlopeDetector() {
  const [pitch, setPitch] = useState(0);
  const [offset, setOffset] = useState(0);
  const [rawData, setRawData] = useState({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    Accelerometer.setUpdateInterval(500);

    const subscription = Accelerometer.addListener(({ x, y, z }) => {
      setRawData({ x, y, z });

      // Updated formula based on Joseph's test (z-axis most responsive)
      const pitchRadians = Math.atan2(z, Math.sqrt(x * x + y * y));
      const pitchDegrees = pitchRadians * (180 / Math.PI);
      setPitch(pitchDegrees.toFixed(1));
    });

    return () => subscription.remove();
  }, []);

  const calibrate = () => {
    setOffset(parseFloat(pitch));
    Alert.alert('Calibrated!', `Baseline set to ${pitch}°`);
  };

  const giveAdvice = () => {
    const adjusted = parseFloat(pitch) - offset;

    if (adjusted > 5) {
        Speech.speak("You are on a downhill. Turn wheels toward the curb.");
    } else if (adjusted < -5) {
        Speech.speak("You are on an uphill. Turn wheels away from the curb.");
    
    } else {
      Speech.speak("You are on a level road. Keep wheels straight.");
    }
  };

  const adjustedPitch = (pitch - offset).toFixed(1);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>NavBuddy</Text>
      <Text style={styles.subtitle}>Slope Detection</Text>

      <Text style={styles.reading}>Raw Accelerometer:</Text>
      <Text style={styles.reading}>x: {rawData.x.toFixed(2)}</Text>
      <Text style={styles.reading}>y: {rawData.y.toFixed(2)}</Text>
      <Text style={styles.reading}>z: {rawData.z.toFixed(2)}</Text>

      <Text style={styles.reading}>Raw Pitch: {pitch}°</Text>
      <Text style={styles.reading}>Offset: {offset}°</Text>
      <Text style={styles.reading}>Adjusted Pitch: {adjustedPitch}°</Text>

      <View style={{ marginVertical: 10 }}>
        <Button title="Calibrate (on level ground)" onPress={calibrate} />
      </View>
      <Button title="Give Parking Advice" onPress={giveAdvice} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
    padding: 20, backgroundColor: '#f0f4ff',
  },
  title: {
    fontSize: 32, fontWeight: 'bold', color: '#1e40af', marginBottom: 10,
  },
  subtitle: {
    fontSize: 18, marginBottom: 15, color: '#334155',
  },
  reading: {
    fontSize: 16, marginBottom: 4,
  },
});
