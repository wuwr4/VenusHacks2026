import { StyleSheet, ScrollView, View, Dimensions } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

// Calculate the exact same width the grid squares use
const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = (SCREEN_WIDTH - 48) * 0.48; // 48 = 24px padding on each side

export default function ResourcesScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ThemedText type="title">Resources</ThemedText>
      <ThemedText type="subtitle">
        Find helpful guides, support, and learning materials.
      </ThemedText>
      
      {/* Recommended For You - Horizontal Scroll */}
      <ThemedView style={styles.recommendedSection}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Recommended For You
        </ThemedText>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalScrollContent}
        >
          <ThemedView style={styles.recommendedCard}>
            <ThemedText type="defaultSemiBold">Week 24</ThemedText>
            <ThemedText style={styles.cardSubtext}>Baby Development</ThemedText>
          </ThemedView>
          <ThemedView style={styles.recommendedCard}>
            <ThemedText type="defaultSemiBold">Nutrition</ThemedText>
            <ThemedText style={styles.cardSubtext}>Eating Well</ThemedText>
          </ThemedView>
          <ThemedView style={styles.recommendedCard}>
            <ThemedText type="defaultSemiBold">Exercise</ThemedText>
            <ThemedText style={styles.cardSubtext}>Stay Active</ThemedText>
          </ThemedView>
          <ThemedView style={styles.recommendedCard}>
            <ThemedText type="defaultSemiBold">Sleep Tips</ThemedText>
            <ThemedText style={styles.cardSubtext}>Rest better</ThemedText>
          </ThemedView>
          <ThemedView style={styles.recommendedCard}>
            <ThemedText type="defaultSemiBold">Mental Health</ThemedText>
            <ThemedText style={styles.cardSubtext}>Self Care</ThemedText>
          </ThemedView>
          <ThemedView style={styles.recommendedCard}>
            <ThemedText type="defaultSemiBold">Birth Plan</ThemedText>
            <ThemedText style={styles.cardSubtext}>Get Prepared</ThemedText>
          </ThemedView>
        </ScrollView>
      </ThemedView>
      
      {/* Essentials Section — all wrapped together so gap:16 doesn't bleed inside */}
      <ThemedView style={styles.essentialsSection}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Essentials
        </ThemedText>

        {/* Top cards */}
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

        {/* First row of squares */}
        <ThemedView style={styles.gridContainer}>
          <ThemedView style={styles.square}>
            <ThemedText type="subtitle">Resource 3</ThemedText>
          </ThemedView>
          <ThemedView style={styles.square}>
            <ThemedText type="subtitle">Resource 4</ThemedText>
          </ThemedView>
        </ThemedView>

        {/* Second row of squares */}
        <ThemedView style={styles.gridContainer}>
          <ThemedView style={styles.square}>
            <ThemedText type="subtitle">Resource 5</ThemedText>
          </ThemedView>
          <ThemedView style={styles.square}>
            <ThemedText type="subtitle">Resource 6</ThemedText>
          </ThemedView>
        </ThemedView>

        {/* Bottom cards */}
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
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,         
    padding: 24,
    paddingTop: 80,
    paddingBottom: 40,
  },
  recommendedSection: {
    backgroundColor: 'transparent',
    gap: 12,         
  },
  essentialsSection: {
    backgroundColor: 'transparent',
    gap: 12,          
  },
  sectionTitle: {
  },
  horizontalScrollContent: {
    paddingRight: 24,
    gap: 12,
  },
  recommendedCard: {
    width: CARD_WIDTH, 
    aspectRatio: 1.4,  
    borderRadius: 16,
    backgroundColor: '#E5E7EB',
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardSubtext: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
    textAlign: 'center',
  },
  cardContainer: {
    backgroundColor: 'transparent',
    gap: 12,           
  },
  card: {
    width: '100%',
    borderRadius: 16,
    padding: 20,
    backgroundColor: '#E5E7EB',
  },
  gridContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  square: {
    width: '48%',
    aspectRatio: 1.4,
    borderRadius: 16,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
});