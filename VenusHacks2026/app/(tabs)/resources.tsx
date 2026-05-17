import { StyleSheet, ScrollView } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function ResourcesScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ThemedText type="title">Resources</ThemedText>
      <ThemedText type="subtitle">
        Find helpful guides, support, and learning materials.
      </ThemedText>
      
      {/* top cards */}
      <ThemedView style={styles.cardContainer}>
        <ThemedView style={styles.card}>
          <ThemedText type="subtitle">Daily Tips</ThemedText>
          <ThemedText>
            Quick, helpful suggestions for your pregnancy journey.
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.card}>
          <ThemedText type="subtitle">Wellness Plan</ThemedText>
          <ThemedText>
            Track goals, appointments, and care reminders.
          </ThemedText>
        </ThemedView>
      </ThemedView>
      
      {/* first row of squares */}
      <ThemedView style={styles.gridContainer}>
        <ThemedView style={styles.square}>
          <ThemedText type="subtitle">Resource 3</ThemedText>
        </ThemedView>
        <ThemedView style={styles.square}>
          <ThemedText type="subtitle">Resource 4</ThemedText>
        </ThemedView>
      </ThemedView>
      
      {/* second row of squares */}
      <ThemedView style={styles.gridContainer}>
        <ThemedView style={styles.square}>
          <ThemedText type="subtitle">Resource 5</ThemedText>
        </ThemedView>
        <ThemedView style={styles.square}>
          <ThemedText type="subtitle">Resource 6</ThemedText>
        </ThemedView>
      </ThemedView>
      
      {/* bottom cards */}
      <ThemedView style={styles.cardContainer}>
        <ThemedView style={styles.card}>
          <ThemedText type="subtitle">Resource 7</ThemedText>
          <ThemedText>
            Additional helpful resources and support materials.
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.card}>
          <ThemedText type="subtitle">Resource 8</ThemedText>
          <ThemedText>
            More helpful guides and support materials.
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingTop: 80,
    paddingBottom: 40,
  },
  cardContainer: {
    marginTop: 12,
    backgroundColor: 'transparent',
  },
  card: {
    width: '100%',
    borderRadius: 16,
    padding: 20,
    backgroundColor: '#E5E7EB',
    marginBottom: 12,
  },
  gridContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    backgroundColor: 'transparent',
  },
  square: {
    width: '48%',
    aspectRatio: 1,
    borderRadius: 16,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
});