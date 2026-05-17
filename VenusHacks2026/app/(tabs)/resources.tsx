import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function ResourcesScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Resources</ThemedText>
      <ThemedText type="subtitle">Find helpful guides, support, and learning materials.</ThemedText>
      <ThemedView style={styles.cardContainer}>
        <ThemedView style={styles.card}>
          <ThemedText type="subtitle">Daily Tips</ThemedText>
          <ThemedText>Quick, helpful suggestions for your pregnancy journey.</ThemedText>
        </ThemedView>
        <ThemedView style={styles.card}>
          <ThemedText type="subtitle">Wellness Plan</ThemedText>
          <ThemedText>Track goals, appointments, and care reminders.</ThemedText>
        </ThemedView>
        <ThemedView style={styles.card}>
          <ThemedText type="subtitle">Community</ThemedText>
          <ThemedText>Connect with local groups, classes, and support resources.</ThemedText>
        </ThemedView>
      </ThemedView>
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
  cardContainer: {
    flex: 1,
    gap: 12,
  },
  card: {
    flex: 1,
    width: '100%',
    borderRadius: 16,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#F3F4F6',
  },
});
