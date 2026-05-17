import { useIsFocused } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { getPointBalance } from '@/lib/points';

const rewardOptions = [
  {
    title: 'Diapers (26-pack)',
    subtitle: 'A large pack of Pampers ultra-absorbent diapers to keep your baby dry and comfortable for up to 12 hours.',
    cost: '180 pts',
    image: require('../../assets/images/diapers.jpeg'),
  },
  {
    title: 'Gift Box',
    subtitle: 'A welcome gift for the new baby. Includes a set of clothing, a bib, and a plush toy.',
    cost: '200 pts',
    image: require('../../assets/images/giftbox.jpeg'),
  },
  {
    title: 'Formula (16oz)',
    subtitle: 'A can of Enfamil infant formula, providing essential nutrients for your baby\'s growth and development.',
    cost: '200 pts',
    image: require('../../assets/images/babyFormula.jpeg'),
  },
  {
    title: 'Vitamins Multi-pack',
    subtitle: 'A pack of essential vitamins for your baby\'s development. Includes Vitamin D, Iron, and Omega-3 supplements.',
    cost: '120 pts',
    image: require('../../assets/images/vitamins.jpeg'),
  },
  {
    title: 'Giftcard ($25)',
    subtitle: 'A giftcard to a store of your choice to support your pregnacy needs.',
    cost: '150 pts',
    image: require('../../assets/images/giftcard.jpeg'),
  },
  {
    title: 'Crib',
    subtitle: 'A new wooden crib with adjustable mattress heights, providing a safe and comfortable sleeping space for your baby.',
    cost: '450 pts',
    image: require('../../assets/images/crib.jpeg'),
  },
];

export default function RewardsScreen() {
  const isFocused = useIsFocused();
  const [balance, setBalance] = useState(getPointBalance());

  useEffect(() => {
    if (isFocused) {
      setBalance(getPointBalance());
    }
  }, [isFocused]);
  return (
    <ThemedView style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.titleBlock}>
          <ThemedText type="title">Rewards</ThemedText>
          <ThemedText type="subtitle">Earn a little something, for both you and the baby.</ThemedText>
        </View>
        <View style={styles.balanceCard}>
          <ThemedText type="subtitle">Point Balance</ThemedText>
          <ThemedText type="title">{balance}pt</ThemedText>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.grid} showsVerticalScrollIndicator={false}>
        {rewardOptions.map((reward) => (
          <View key={reward.title} style={styles.rewardCard}>
            <View style={styles.rewardCardContent}>
                <View style={styles.rewardCardText}> 
                    <ThemedText type="subtitle">{reward.title}</ThemedText>
                    <ThemedText>{reward.subtitle}</ThemedText>

                    <View style={styles.cardFooter}>
                    <ThemedText type="subtitle" style={styles.costText}>
                        {reward.cost}
                    </ThemedText>
                    <Pressable style={styles.redeemButton} onPress={() => {}}>
                        <IconSymbol name="bag.badge.plus" size={30} color="#FFFFF" />
                    </Pressable>
                    </View>
                </View>

                <Image source={reward.image} style={styles.rewardImage} resizeMode="cover" />
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
    width: '98%',
    borderRadius: 16,
    padding: 16,
    backgroundColor: '#F3F4F6',
    minHeight: 140,
    justifyContent: 'space-between',

  },
  rewardCardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rewardCardText: {
    flex: 1,
    gap: 4,
    paddingRight: 12,
  },
  rewardImage: {
    width: '40%',
    height: 120,
    borderRadius: 12,
    backgroundColor: '#E5E7EB',
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
    // backgroundColor: '#2563EB',
    paddingHorizontal: 14,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  redeemText: {
    color: '#FFFFFF',
  },
});
