import React, { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';

import { setSurveyCompleted } from '@/lib/survey-state';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useRouter } from 'expo-router';
const API_SURVEY_URL = "http://127.0.0.1:8000/items/survey?";
const USER_ID = 1;

const questions = [
  {
    id: 1,
    title: 'Question 1',
    text: 'How many hours of sleep did you get last night?',
    multi: false,
    options: [
      'Less than 5 hours',
      '5 - 6 hours',
      '7 - 8 hours',
      '9+ hours',
    ],
  },
  {
    id: 2,
    title: 'Question 2',
    text: 'Over the past few days, how often have you felt emotionally supported and connected to others?',
    multi: false,
    options: [
      'Always',
      'Often',
      'Sometimes',
      'Rarely',
    ],
  },
  {
    id: 3,
    title: 'Question 3',
    text: 'In the past week, have you experienced any of the following? (Check all that apply)',
    multi: true,
    options: [
      'Strong or unusual headaches',
      'Vision changes (blurred vision, seeing spots, etc.)',
      'Chest discomfort or pain',
      'None of the above',
    ],
  },
  {
    id: 4,
    title: 'Question 4',
    text: 'Have you recently felt strong pain or pressure in your upper stomach or below your ribs?',
    multi: false,
    options: [
      'No',
      'Mild discomfort',
      'Severe discomfort',
    ],
  },
  {
    id: 5,
    title: 'Question 5',
    text: 'Compared to yesterday, how does your body feel today?',
    multi: false,
    options: [
      'Better',
      'About the same',
      'More tired than usual',
      'Much more uncomfortable',
    ],
  },
];

async function send_survey(responses:Array<Array<boolean>>)
{
  let encoded = responses.map(r => r.indexOf(true));
  let url = API_SURVEY_URL;
  let uhhh = {user_id: USER_ID, sleep: encoded[0], support:encoded[1], symptoms: encoded[2], rib_pain: encoded[3], change: encoded[4]};
  url += new URLSearchParams(uhhh).toString();
  console.log(url);
  fetch(url);
}

export default function SurveyScreen() {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<boolean[][]>(questions.map(q => Array(q.options.length).fill(false)));
  const [comment, setComment] = useState('');
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    slideAnim.setValue(100);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [currentQuestionIndex]);

  const isCommentScreen = currentQuestionIndex === questions.length;
  const currentQuestion = questions[currentQuestionIndex] ?? questions[0];
  const currentResponses = responses[currentQuestionIndex] ?? responses[0];

  function toggle(i: number) {
    const copy = [...responses];
    
    // If single-select (radio button behavior), clear all other selections
    if (!currentQuestion.multi) {
      copy[currentQuestionIndex] = Array(currentQuestion.options.length).fill(false);
      copy[currentQuestionIndex][i] = true;
    } else {
      // Multi-select (checkbox behavior)
      copy[currentQuestionIndex][i] = !copy[currentQuestionIndex][i];
    }
    
    setResponses(copy);
  }

  const anySelected = isCommentScreen ? true : currentResponses.some(Boolean);

  function handleNext() {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (currentQuestionIndex === questions.length - 1) {
      setCurrentQuestionIndex(questions.length);
    } else {
      setSurveyCompleted(true);
      send_survey(responses);
      router.push('/');
    }
  }

  function handlePrevious() {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  }

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <ThemedText type="subtitle" style={styles.screenLabel}>
          Daily Survey
        </ThemedText>

        <View style={styles.topBar}>
          {questions.map((_, i) => (
            <View
              key={i}
              style={[styles.progressDot, i <= Math.min(currentQuestionIndex, questions.length - 1) && styles.filled]}
            />
          ))}
        </View>

        <Animated.View style={{ transform: [{ translateX: slideAnim }] }}>
          {isCommentScreen ? (
            <>
              <ThemedText type="title" style={styles.questionTitle}>
                Additional Comments
              </ThemedText>

              <ThemedText style={styles.questionText}>
                Share any other concerns you'd like your care team to know. Please be honest so we can best help you and your baby!
              </ThemedText>

              <TextInput
                style={styles.commentInput}
                multiline
                placeholder="Type your comments here..."
                placeholderTextColor="#9CA3AF"
                value={comment}
                onChangeText={setComment}
              />
            </>
          ) : (
            <>
              <ThemedText type="title" style={styles.questionTitle}>
                {currentQuestion.title}
              </ThemedText>

              <ThemedText style={styles.questionText}>
                {currentQuestion.text}
              </ThemedText>

              <View style={styles.options}>
                {currentQuestion.options.map((opt, i) => (
                  <Pressable key={opt} style={styles.optionRow} onPress={() => toggle(i)}>
                    <View style={[
                      currentQuestion.multi ? styles.checkbox : styles.radioButton
                    ]}>
                      {currentResponses[i] && (
                        <View style={[
                          currentQuestion.multi ? styles.checkboxInner : styles.radioButtonInner
                        ]} />
                      )}
                    </View>
                    <View style={styles.optionContent}>
                      <ThemedText type="defaultSemiBold">{opt}</ThemedText>
                    </View>
                  </Pressable>
                ))}
              </View>
            </>
          )}
        </Animated.View>

        <View style={styles.buttonRow}>
          {(currentQuestionIndex > 0 || isCommentScreen) && (
            <Pressable style={styles.previousButton} onPress={handlePrevious}>
              <ThemedText type="subtitle" style={styles.previousText}>
                {'Back'}
              </ThemedText>
            </Pressable>
          )}
          <Pressable
            style={[styles.continueButton, !anySelected && styles.continueButtonDisabled, currentQuestionIndex === 0 && styles.fullWidth]}
            onPress={handleNext}
            disabled={!anySelected}
          >
            <ThemedText type="subtitle" style={styles.continueText}>
              {isCommentScreen ? 'Complete' : 'Next'}
            </ThemedText>
          </Pressable>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    padding: 20,
    paddingTop: 36,
    paddingBottom: 40,
  },
  screenLabel: {
    color: '#6B7280',
    marginBottom: 12,
    fontSize: 18,
    textAlign: 'center',
  },
  topBar: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  progressDot: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D1D5DB',
  },
  filled: {
    backgroundColor: '#10B981',
  },
  questionTitle: {
    textAlign: 'center',
    marginBottom: 12,
  },
  questionText: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
    color: '#374151',
  },
  options: {
    gap: 12,
    marginBottom: 20,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    padding: 24,
    borderRadius: 8,
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#9CA3AF',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  checkboxInner: {
    width: 16,
    height: 16,
    backgroundColor: '#9CA3AF',
    borderRadius: 3,
  },
  radioButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#9CA3AF',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  radioButtonInner: {
    width: 16,
    height: 16,
    backgroundColor: '#9CA3AF',
    borderRadius: 8,
  },
  optionContent: {
    flex: 1,
  },
  commentInput: {
    minHeight: 200,
    backgroundColor: '#F9FAFB',
    borderColor: '#D1D5DB',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    textAlignVertical: 'top',
    fontSize: 18,
    color: '#111827',
    marginBottom: 24,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  previousButton: {
    flex: 1,
    backgroundColor: '#E5E7EB',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  previousText: {
    color: '#111827',
  },
  continueButton: {
    flex: 1,
    backgroundColor: '#3B82F6',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  fullWidth: {
    flex: 1,
  },
  continueButtonDisabled: {
    opacity: 0.5,
  },
  continueText: {
    color: '#FFFFFF',
  },
});