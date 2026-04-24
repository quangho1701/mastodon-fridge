import React, { useRef } from 'react';
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme';

interface AddPhotoButtonProps {
  onPress: () => void;
  disabled?: boolean;
}

function AddPhotoButton({ onPress, disabled }: AddPhotoButtonProps) {
  const { theme } = useTheme();
  const scale = useRef(new Animated.Value(1)).current;

  const pressIn = () => {
    Animated.timing(scale, {
      toValue: 0.97,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const pressOut = () => {
    Animated.timing(scale, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Pressable
        onPress={onPress}
        onPressIn={pressIn}
        onPressOut={pressOut}
        disabled={disabled}
        accessibilityRole="button"
        accessibilityLabel="Add a photo"
        style={({ pressed }) => [
          styles.button,
          {
            backgroundColor: theme.colors.action,
            opacity: disabled ? 0.5 : pressed ? 0.92 : 1,
          },
        ]}
      >
        <View style={styles.inner}>
          <Ionicons name="add" size={20} color={theme.colors.black} />
          <Text
            style={[
              theme.typography.button,
              styles.label,
              { color: theme.colors.black },
            ]}
          >
            Add a Photo
          </Text>
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  label: {
    letterSpacing: 0.5,
  },
});

export default React.memo(AddPhotoButton);
