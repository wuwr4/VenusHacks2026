import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

const weeksCompleted = 32;
const weeksTotal = 40;
const progressPercent = (weeksCompleted / weeksTotal) * 100;
const rightRotation = progressPercent <= 50 ? (progressPercent / 50) * 180 : 180;
const leftRotation = progressPercent <= 50 ? 0 : ((progressPercent - 50) / 50) * 180;

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Good morning, Mom</ThemedText>
      <ThemedText type="subtitle">You are 32 weeks into your pregnancy and due Friday, August 21, 2026</ThemedText>
      <ThemedText type="subtitle">Baby Jake is arriving in 6 weeks!</ThemedText>

      <View style={styles.progressWrapper}>
        <View style={styles.progressCircle}>
          <View style={styles.progressTrack} />
          <View style={[styles.progressFill, styles.rightHalf, { transform: [{ rotate: `${rightRotation}deg` }] }]} />
          <View
            style={[
              styles.progressFill,
              styles.leftHalf,
              { transform: [{ rotate: `${leftRotation}deg` }], opacity: progressPercent > 50 ? 1 : 0 },
            ]}
          />
          <View style={styles.progressCenter}>
            <ThemedText type="title">{weeksCompleted}/{weeksTotal}</ThemedText>
            <ThemedText type="subtitle">weeks</ThemedText>
          </View>
        </View>
      </View>

      <ThemedText type="subtitle" style={styles.quote}>
        “Every step you take is a step toward the most beautiful arrival.”
      </ThemedText>

      <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        onPress={() => {
          // TODO: navigate to daily survey
        }}>
        <ThemedText type="subtitle" style={styles.buttonText}>
          Take today's survey
        </ThemedText>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
    padding: 24,
    paddingTop: 80
  },
  progressWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressCircle: {
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressTrack: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 100,
    borderWidth: 16,
    borderColor: '#E5E7EB',
  },
  progressFill: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 100,
    borderWidth: 16,
    borderColor: '#3B82F6',
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
  },
  rightHalf: {
    transform: [{ rotate: '0deg' }],
  },
  leftHalf: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 100,
    borderWidth: 16,
    borderColor: '#3B82F6',
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
  },
  progressCenter: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: '100%',
    borderRadius: 12,
    backgroundColor: '#3B82F6',
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPressed: {
    opacity: 0.75,
  },
  buttonText: {
    color: '#FFFFFF',
  },
  quote: {
    fontStyle: 'italic',
    color: '#4B5563',
    marginVertical: 8,
  },
});
