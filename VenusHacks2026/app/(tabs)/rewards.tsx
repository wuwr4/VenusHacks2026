import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

const rewardOptions = [
  { title: 'Free Prenatal Class', subtitle: 'Redeem for one session', cost: '240 pts' },
  { title: 'Gift Box', subtitle: 'Choose a baby welcome gift', cost: '320 pts' },
  { title: 'Wellness Kit', subtitle: 'Self-care essentials', cost: '180 pts' },
  { title: 'Nutrition Guide', subtitle: 'Meal planning tools', cost: '150 pts' },
  { title: 'Maternity Pass', subtitle: 'Discounts on products', cost: '400 pts' },
  { title: 'Community Badge', subtitle: 'Connect with parents', cost: '100 pts' },
];

export default function RewardsScreen() {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.titleBlock}>
          <ThemedText type="title">Rewards</ThemedText>
          <ThemedText type="subtitle">Earn points, unlock perks, and track your rewards.</ThemedText>
        </View>
        <View style={styles.balanceCard}>
          <ThemedText type="subtitle">Point Balance</ThemedText>
          <ThemedText type="title">1,240</ThemedText>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.grid} showsVerticalScrollIndicator={false}>
        {rewardOptions.map((reward) => (
          <View key={reward.title} style={styles.rewardCard}>
            <ThemedText type="subtitle">{reward.title}</ThemedText>
            <ThemedText>{reward.subtitle}</ThemedText>
            <View style={styles.cardFooter}>
              <ThemedText type="subtitle" style={styles.costText}>
                {reward.cost}
              </ThemedText>
              <Pressable style={styles.redeemButton} onPress={() => {}}>
                <ThemedText type="subtitle" style={styles.redeemText}>
                  Redeem
                </ThemedText>
              </Pressable>
            </View>
          </View>
        ))}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 80
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 16,
    marginBottom: 16,
  },
  titleBlock: {
    flex: 1,
    gap: 8,
  },
  balanceCard: {
    minWidth: 120,
    borderRadius: 16,
    padding: 16,
    backgroundColor: '#F3F4F6',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    paddingBottom: 24,
  },
  rewardCard: {
    width: '48%',
    borderRadius: 16,
    padding: 16,
    backgroundColor: '#F3F4F6',
    minHeight: 140,
    justifyContent: 'space-between',
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
    marginTop: 12,
  },
  costText: {
    color: '#4B5563',
  },
  redeemButton: {
    borderRadius: 12,
    backgroundColor: '#2563EB',
    paddingHorizontal: 14,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  redeemText: {
    color: '#FFFFFF',
  },
});
