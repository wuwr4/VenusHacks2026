import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

type YesNo = 'yes' | 'no' | null;
type FamilyHeartHistory = 'none' | 'immediate' | 'extended' | 'unsure' | null;
type CholesterolStatus = 'none' | 'self' | 'family' | 'unsure' | null;
type NicotineStatus = 'never' | 'quit' | 'current' | 'someone' | null;

type ProviderCondition = 'highBloodPressure' | 'preeclampsia' | 'gestationalDiabetes' | 'none';

const providerOptions = [
  { key: 'highBloodPressure', label: 'High blood pressure' },
  { key: 'preeclampsia', label: 'Preeclampsia' },
  { key: 'gestationalDiabetes', label: 'Gestational diabetes' },
  { key: 'none', label: 'None of the above' },
] as const;

const familyHeartOptions = [
  { key: 'none', label: 'No \n (No family history)' },
  { key: 'immediate', label: 'Yes, in immediate family \n (Parents, siblings, or children)' },
  { key: 'extended', label: 'Yes, in extended family \n (Grandparents, aunts, uncles)' },
  { key: 'unsure', label: 'Unsure / Adopted' },
] as const;

const cholesterolOptions = [
  { key: 'none', label: 'No' },
  { key: 'self', label: 'Yes, I have high cholesterol' },
  { key: 'family', label: 'Yes, a blood relative has high cholesterol' },
  { key: 'unsure', label: 'Unsure' },
] as const;

const nicotineOptions = [
  { key: 'never', label: 'Never smoked / used nicotine' },
  { key: 'quit', label: 'Quit before becoming pregnant' },
  { key: 'current', label: 'Currently smoke or use nicotine \n (cigarettes, vaping, patches)' },
  { key: 'someone', label: 'Someone else smokes inside my home' },
] as const;

export default function PreScreen() {
  const router = useRouter();
  const [pregnant, setPregnant] = useState<YesNo>(null);
  const [providerConditions, setProviderConditions] = useState<ProviderCondition[]>([]);
  const [bpOutside, setBpOutside] = useState<YesNo>(null);
  const [familyHeart, setFamilyHeart] = useState<FamilyHeartHistory>(null);
  const [cholesterol, setCholesterol] = useState<CholesterolStatus>(null);
  const [nicotine, setNicotine] = useState<NicotineStatus>(null);

  const toggleProviderCondition = (option: ProviderCondition) => {
    if (option === 'none') {
      setProviderConditions(['none']);
      return;
    }

    const hasNone = providerConditions.includes('none');
    const next = providerConditions.includes(option)
      ? providerConditions.filter((item) => item !== option)
      : [...providerConditions.filter((item) => item !== 'none'), option];

    setProviderConditions(next);
  };

  const allAnswered =
    providerConditions.length > 0 &&
    bpOutside !== null &&
    familyHeart !== null &&
    cholesterol !== null &&
    nicotine !== null;

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.inner}>
        <ThemedText type="title">One more step</ThemedText>
        <ThemedText type="subtitle">
          Help us understand your pregnancy and family history with a few quick questions.
        </ThemedText>

        <View style={styles.questionBlock}>
          <ThemedText type="subtitle" style={styles.questionText}>
            During this or a previous pregnancy, has a healthcare provider ever told you that you had:
          </ThemedText>
          {providerOptions.map((option) => {
            const selected = providerConditions.includes(option.key);
            return (
              <Pressable
                key={option.key}
                style={[styles.checkboxRow, selected && styles.checkboxSelected]}
                onPress={() => toggleProviderCondition(option.key)}
              >
                <View style={[styles.checkbox, selected && styles.checkboxChecked]} />
                <ThemedText type="subtitle">
                  {option.label}
                </ThemedText>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.questionBlock}>
          <ThemedText type="subtitle" style={styles.questionText}>
            Have you ever been diagnosed with high blood pressure outside of pregnancy, or do you take blood pressure medication?
          </ThemedText>
          <View style={styles.choiceRow}>
            {(['yes', 'no'] as YesNo[]).map((option) => (
              <Pressable
                key={option}
                style={[styles.choiceButton, bpOutside === option && styles.choiceButtonSelected]}
                onPress={() => setBpOutside(option)}
              >
                <ThemedText type="subtitle" style={bpOutside === option ? styles.choiceTextSelected : styles.choiceText}>
                  {option === 'yes' ? 'Yes' : 'No'}
                </ThemedText>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.questionBlock}>
          <ThemedText type="subtitle" style={styles.questionText}>
            Has any blood relative had a heart attack, stroke, heart disease, or sudden unexplained death (especially before age 55 for men / 65 for women)?
          </ThemedText>
          {familyHeartOptions.map((option) => (
            <Pressable
              key={option.key}
              style={[styles.choiceButton, familyHeart === option.key && styles.choiceButtonSelected]}
              onPress={() => setFamilyHeart(option.key)}
            >
              <ThemedText type="subtitle" style={familyHeart === option.key ? styles.choiceTextSelected : styles.choiceText}>
                {option.label}
              </ThemedText>
            </Pressable>
          ))}
        </View>

        <View style={styles.questionBlock}>
          <ThemedText type="subtitle" style={styles.questionText}>
            Do you have high cholesterol, or is there a strong family history of it?
          </ThemedText>
          {cholesterolOptions.map((option) => (
            <Pressable
              key={option.key}
              style={[styles.choiceButton, cholesterol === option.key && styles.choiceButtonSelected]}
              onPress={() => setCholesterol(option.key)}
            >
              <ThemedText type="subtitle" style={cholesterol === option.key ? styles.choiceTextSelected : styles.choiceText}>
                {option.label}
              </ThemedText>
            </Pressable>
          ))}
        </View>

        <View style={styles.questionBlock}>
          <ThemedText type="subtitle" style={styles.questionText}>
            What is your current nicotine or tobacco use status?
          </ThemedText>
          {nicotineOptions.map((option) => (
            <Pressable
              key={option.key}
              style={[styles.choiceButton, nicotine === option.key && styles.choiceButtonSelected]}
              onPress={() => setNicotine(option.key)}
            >
              <ThemedText type="subtitle" style={nicotine === option.key ? styles.choiceTextSelected : styles.choiceText}>
                {option.label}
              </ThemedText>
            </Pressable>
          ))}
        </View>

        <Pressable
          style={[styles.button, !allAnswered && styles.buttonDisabled]}
          onPress={() => router.replace('/(tabs)')}
          disabled={!allAnswered}
        >
          <ThemedText type="subtitle" style={styles.buttonText}>Complete</ThemedText>
        </Pressable>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, paddingTop: 30 },
  inner: { gap: 16 },
  questionBlock: {
    gap: 10,
    padding: 16,
    borderRadius: 15,
    marginBottom: 15,
    backgroundColor: '#F3F4F6',
  },
  questionText: {
    color: '#111827',
  },
  choiceRow: {
    flexDirection: 'row',
    gap: 12,
  },
  choiceButton: {
    flex: 1,
    paddingVertical: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    textAlign: 'center',
  },
  choiceButtonSelected: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    backgroundColor: '#FFFFFF',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    backgroundColor: '#FFFFFF',
  },
  checkboxChecked: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  checkboxSelected: {
    borderColor: '#3B82F6',
    backgroundColor: '#E0F2FE',
  },
  choiceText: {
    color: '#111827',
    flex: 1,
    textAlign: 'center',
  },
  choiceTextSelected: {
    color: '#FFFFFF',
    textAlign: 'center',
  },
  button: {
    marginTop: 24,
    borderRadius: 12,
    backgroundColor: '#3B82F6',
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#94A3B8',
  },
  buttonText: { color: '#FFFFFF' },
});
