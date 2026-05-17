import { useIsFocused } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { isSurveyCompleted } from '@/lib/survey-state';

const weeksCompleted = 32;
const weeksTotal = 40;
const progressPercent = (weeksCompleted / weeksTotal) * 100;
const rightRotation = progressPercent <= 50 ? (progressPercent / 50) * 180 : 180;
const leftRotation = progressPercent <= 50 ? 0 : ((progressPercent - 50) / 50) * 180;

export default function HomeScreen() {
  const nextRewardProgress = 295 / 320;
  const nextRewardLabel = 'Baby Gift Box';
  const router = useRouter();
  const isFocused = useIsFocused();
  const [surveyCompleted, setSurveyCompletedState] = useState(isSurveyCompleted());

  useEffect(() => {
    if (isFocused) {
      setSurveyCompletedState(isSurveyCompleted());
    }
  }, [isFocused]);

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Good morning, Mom!</ThemedText>
      <ThemedText type="subtitle">Baby Jake is due Friday, August 21 and arriving in 6 weeks!</ThemedText>

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

      <ThemedView style={styles.cardContainer}>
        <ThemedText type="subtitle">Upcoming Events</ThemedText>
        <ThemedView style={styles.card}>
          <ThemedText type="subtitle">Mother's Meetup</ThemedText>
          <ThemedText>Sunday, May 17 (1:30pm - 3:30pm)</ThemedText>
          <ThemedText>Location: Capybara Cafe</ThemedText>
        </ThemedView>
      </ThemedView>
    
        <Pressable
        style={({ pressed }) => [
          styles.button,
          surveyCompleted && styles.buttonDisabled,
          pressed && !surveyCompleted && styles.buttonPressed,
        ]}
        onPress={() => {
          if (!surveyCompleted) {
            router.push('/survey');
          }
        }}
        disabled={surveyCompleted}>
        <ThemedText type="subtitle" style={styles.buttonText}>
          {surveyCompleted ? 'Survey Completed' : 'Take the Daily Survey!'}
        </ThemedText>
      </Pressable>

       <View style={styles.rewardProgress}>
        <View style={styles.rewardProgressHeader}>
          <ThemedText type="subtitle">Next reward: {nextRewardLabel}</ThemedText>
        </View>
        <View style={styles.rewardProgressBar}>
          <View style={[styles.rewardProgressFill, { width: `${nextRewardProgress * 100}%` }]} />
        </View>
        <View>
          <ThemedText type="subtitle">295 / 320 pts</ThemedText>  
        </View> 
      </View>

    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
    padding: 24,
    paddingTop: 80,
  },
    cardContainer: {
    flex: 1,
    gap: 12,
    marginBottom: 20,
  },
  card: {
    flex: 1,
    width: '100%',
    borderRadius: 16,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#F3F4F6',
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
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#4B5563',
    marginVertical: 8,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  rewardProgress: {
    gap: 10,
    width: '100%',
    marginBottom: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rewardProgressHeader: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  rewardProgressBar: {
    width: '100%',
    height: 10,
    borderRadius: 8,
    backgroundColor: '#E5E7EB',
    overflow: 'hidden',
  },
  rewardProgressFill: {
    height: '100%',
    borderRadius: 8,
    backgroundColor: '#3B82F6',
  },
});
