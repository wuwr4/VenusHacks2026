import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function ConnectScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Connect</ThemedText>
      <ThemedText type="subtitle">Chat with your community and stay in touch.</ThemedText>
      <ThemedView style={styles.cardContainer}>
        
        <ThemedView style={styles.card}>
          <View style={styles.profileRow}>
            <View style={styles.avatar}>
              <ThemedText type="subtitle" style={styles.avatarText}>
                EM
              </ThemedText>
            </View>
            <View style={styles.profileInfo}>
              <ThemedText type="subtitle">Emily Matthews</ThemedText>
              <ThemedText>San Diego, CA</ThemedText>
            </View>
          </View>
          <ThemedText>
            Looking for a walking buddy and prenatal class recommendations nearby.
          </ThemedText>
          <View style={styles.actions}>
            <Pressable style={styles.iconButton} onPress={() => {}}>
              <IconSymbol name="bubble.left.and.bubble.right.fill" size={20} color="#FFFFFF" />
            </Pressable>
            <Pressable style={styles.iconButtonSecondary} onPress={() => {}}>
              <IconSymbol name="person.badge.plus" size={20} color="#2563EB" />
            </Pressable>
          </View>
        </ThemedView>

        <ThemedView style={styles.card}>
          <View style={styles.profileRow}>
            <View style={styles.avatar}>
              <ThemedText type="subtitle" style={styles.avatarText}>
                AL
              </ThemedText>
            </View>
            <View style={styles.profileInfo}>
              <ThemedText type="subtitle">Avery Lee</ThemedText>
              <ThemedText>Portland, OR</ThemedText>
            </View>
          </View>
          <ThemedText>
            New to the neighborhood and excited to meet other moms for coffee and support.
          </ThemedText>
          <View style={styles.actions}>
            <Pressable style={styles.iconButton} onPress={() => {}}>
              <IconSymbol name="bubble.left.and.bubble.right.fill" size={20} color="#FFFFFF" />
            </Pressable>
            <Pressable style={styles.iconButtonSecondary} onPress={() => {}}>
              <IconSymbol name="person.badge.plus" size={20} color="#2563EB" />
            </Pressable>
          </View>
        </ThemedView>

        <ThemedView style={styles.card}>
          <View style={styles.profileRow}>
            <View style={styles.avatar}>
              <ThemedText type="subtitle" style={styles.avatarText}>
                MO
              </ThemedText>
            </View>
            <View style={styles.profileInfo}>
              <ThemedText type="subtitle">Mia Ortiz</ThemedText>
              <ThemedText>Atlanta, GA</ThemedText>
            </View>
          </View>
          <ThemedText>
            Loves sharing baby prep checklists and quick wellness tips for busy days.
          </ThemedText>
          <View style={styles.actions}>
            <Pressable style={styles.iconButton} onPress={() => {}}>
              <IconSymbol name="bubble.left.and.bubble.right.fill" size={20} color="#FFFFFF" />
            </Pressable>
            <Pressable style={styles.iconButtonSecondary} onPress={() => {}}>
              <IconSymbol name="person.badge.plus" size={20} color="#2563EB" />
            </Pressable>
          </View>
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
  },
  card: {
    flex: 1,
    width: '100%',
    borderRadius: 16,
    padding: 18,
    backgroundColor: '#F3F4F6',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
  },
  profileInfo: {
    flex: 1,
    gap: 4,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 16,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2563EB',
  },
  iconButtonSecondary: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#2563EB',
    backgroundColor: '#FFFFFF',
  },
});
