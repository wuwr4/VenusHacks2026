import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { setUserName } from '@/lib/user';

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const ageOptions = Array.from({ length: 28 }, (_, i) => 18 + i);
const dayOptions = Array.from({ length: 31 }, (_, i) => i + 1);
const monthOptions = Array.from({ length: 12 }, (_, i) => i + 1);
const currentYear = new Date().getFullYear();
const yearOptions = [currentYear, currentYear + 1];

function WheelPicker<T extends string | number>({
  values,
  selected,
  onValueChange,
}: {
  values: T[];
  selected: T;
  onValueChange: (value: T) => void;
}) {
  const handleMomentumScrollEnd = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.y / 40);
    const normalizedIndex = Math.min(Math.max(index, 0), values.length - 1);
    onValueChange(values[normalizedIndex]);
  };

  return (
    <ScrollView
      snapToInterval={40}
      decelerationRate="fast"
      showsVerticalScrollIndicator={false}
      onMomentumScrollEnd={handleMomentumScrollEnd}
      contentContainerStyle={styles.wheelContent}
      style={styles.wheelPicker}
    >
      {values.map((value) => (
        <View key={String(value)} style={styles.wheelItem}>
          <Text style={styles.wheelItemText}>{String(value)}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

export default function EntryScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [selectedAge, setSelectedAge] = useState<number | null>(null);
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [location, setLocation] = useState('');
  const [isDateModalVisible, setDateModalVisible] = useState(false);
  const [isAgePickerVisible, setAgePickerVisible] = useState(false);
  const [selectedDay, setSelectedDay] = useState(1);
  const [selectedMonth, setSelectedMonth] = useState(1);
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const allFieldsFilled = !!name.trim() && selectedAge !== null && !!dueDate && !!location.trim();

  const dueDateLabel = dueDate
    ? `${monthNames[dueDate.getMonth()]} ${dueDate.getDate()}, ${dueDate.getFullYear()}`
    : 'Select your due date';

  const openDatePicker = () => {
    setDateModalVisible(true);
  };

  const saveDueDate = () => {
    const date = new Date(selectedYear, selectedMonth - 1, selectedDay);

    if (!Number.isNaN(date.getTime())) {
      setDueDate(date);
    }
    setDateModalVisible(false);
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.inner}>
        <ThemedText type="title">Welcome to CardiMom!</ThemedText>
        <ThemedText type="subtitle">Please fill out this quick pre-survey so we know how to best support you and your baby.</ThemedText>

        <ThemedText type="subtitle" style={styles.label}>Name</ThemedText>
        <TextInput value={name} onChangeText={setName} style={styles.input} placeholder="Your name" placeholderTextColor="#9CA3AF" />

        <ThemedText type="subtitle" style={styles.label}>Age</ThemedText>
        <Pressable style={styles.dateInput} onPress={() => setAgePickerVisible(true)}>
          <ThemedText type="subtitle" style={selectedAge ? null : styles.placeholderText}>
            {selectedAge ? String(selectedAge) : 'Select your age'}
          </ThemedText>
        </Pressable>

        <ThemedText type="subtitle" style={styles.label}>Estimated Due Date</ThemedText>
        <Pressable style={styles.dateInput} onPress={openDatePicker}>
          <ThemedText type="subtitle" style={dueDate ? null : styles.placeholderText}>{dueDateLabel}</ThemedText>
        </Pressable>

        <ThemedText type="subtitle" style={styles.label}>Location</ThemedText>
        <TextInput value={location} onChangeText={setLocation} style={styles.input} placeholder="City, Country" placeholderTextColor="#9CA3AF" />

        <Pressable
          style={[styles.button, !allFieldsFilled && styles.buttonDisabled]}
          onPress={() => {
            setUserName(name);
            router.push('/prescreen');
          }}
          disabled={!allFieldsFilled}
        >
          <ThemedText type="subtitle" style={styles.buttonText}>Continue</ThemedText>
        </Pressable>
      </View>

      <Modal visible={isDateModalVisible} transparent animationType="slide">
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContent}>
            <ThemedText type="title">Select due date</ThemedText>
            <View style={styles.dateWheelRow}>
              <View style={styles.wheelColumn}>
                <ThemedText type="subtitle" style={styles.wheelLabel}>Month</ThemedText>
                <WheelPicker values={monthOptions} selected={selectedMonth} onValueChange={setSelectedMonth} />
              </View>
              <View style={styles.wheelColumn}>
                <ThemedText type="subtitle" style={styles.wheelLabel}>Day</ThemedText>
                <WheelPicker values={dayOptions} selected={selectedDay} onValueChange={setSelectedDay} />
              </View>
              <View style={styles.wheelColumn}>
                <ThemedText type="subtitle" style={styles.wheelLabel}>Year</ThemedText>
                <WheelPicker values={yearOptions} selected={selectedYear} onValueChange={setSelectedYear} />
              </View>
            </View>
            <View style={styles.modalButtons}>
              <Pressable style={styles.modalButton} onPress={() => setDateModalVisible(false)}>
                <ThemedText type="subtitle">Cancel</ThemedText>
              </Pressable>
              <Pressable style={styles.modalButton} onPress={saveDueDate}>
                <ThemedText type="subtitle">Save</ThemedText>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <Modal visible={isAgePickerVisible} transparent animationType="slide">
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContent}>
            <ThemedText type="title">Select your age</ThemedText>
            <ScrollView style={styles.ageScroll} contentContainerStyle={styles.ageScrollContent}>
              {ageOptions.map((option) => (
                <Pressable
                  key={option}
                  style={[styles.ageOption, selectedAge === option && styles.ageOptionSelected]}
                  onPress={() => setSelectedAge(option)}
                >
                  <Text style={[styles.ageOptionText, selectedAge === option && styles.ageOptionTextSelected]}>{option}</Text>
                </Pressable>
              ))}
            </ScrollView>
            <View style={styles.modalButtons}>
              <Pressable style={styles.modalButton} onPress={() => setAgePickerVisible(false)}>
                <ThemedText type="subtitle">Done</ThemedText>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, paddingTop: 30 },
  inner: { gap: 16 },
  label: { marginTop: 12 },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 14,
    backgroundColor: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
  },
  dateInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
  },
  placeholderText: { color: '#9CA3AF' },
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
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    borderRadius: 16,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  pickerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    marginTop: 16,
  },
  datePickerInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 14,
    backgroundColor: '#F9FAFB',
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginHorizontal: 4,
    backgroundColor: '#E5E7EB',
  },
  ageScroll: {
    maxHeight: 260,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    backgroundColor: '#F9FAFB',
  },
  ageScrollContent: {
    paddingVertical: 8,
  },
  ageOption: {
    paddingVertical: 14,
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ageOptionSelected: {
    backgroundColor: '#DBEAFE',
    borderRadius: 10,
  },
  ageOptionText: {
    fontSize: 16,
    color: '#111827',
  },
  ageOptionTextSelected: {
    color: '#1D4ED8',
    fontWeight: '600',
  },
  dateWheelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    marginTop: 16,
  },
  wheelColumn: {
    flex: 1,
    alignItems: 'center',
  },
  wheelLabel: {
    marginBottom: 10,
  },
  wheelPicker: {
    width: '100%',
    height: 160,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    backgroundColor: '#F9FAFB',
  },
  wheelContent: {
    paddingVertical: 60,
  },
  wheelItem: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wheelItemText: {
    fontSize: 16,
    color: '#111827',
  },
});
