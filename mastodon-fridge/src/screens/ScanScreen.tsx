import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';
import { useTheme } from '../theme';
import ScannerFrame from '../components/scanner/ScannerFrame';
import ScanControls from '../components/scanner/ScanControls';
import ScanHeader from '../components/scanner/ScanHeader';
import PermissionDeniedCard from '../components/scanner/PermissionDeniedCard';

const SCAN_DURATION_MS = 2000;

export default function ScanScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const cameraRef = useRef<CameraView | null>(null);

  const [permission, requestPermission] = useCameraPermissions();
  const [flashOn, setFlashOn] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (permission && !permission.granted && permission.canAskAgain) {
      requestPermission();
    }
  }, [permission, requestPermission]);

  const runScanAnimation = (uri: string) => {
    console.log('[ScanScreen] captured:', uri);
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      navigation.navigate('Confirm', { imageUri: uri });
    }, SCAN_DURATION_MS);
  };

  const handleShutter = async () => {
    if (!cameraRef.current || isProcessing) return;
    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.7,
        skipProcessing: true,
      });
      if (photo?.uri) runScanAnimation(photo.uri);
    } catch (err) {
      console.warn('[ScanScreen] takePictureAsync failed:', err);
    }
  };

  const handleGallery = async () => {
    if (isProcessing) return;
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) return;
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.7,
    });
    if (!result.canceled && result.assets[0]?.uri) {
      runScanAnimation(result.assets[0].uri);
    }
  };

  const handleClose = () => {
    navigation.goBack();
  };

  // Permission: loading first check
  if (!permission) {
    return (
      <View style={styles.blackCenter}>
        <StatusBar style="light" />
        <ActivityIndicator color={theme.colors.action} size="large" />
      </View>
    );
  }

  // Permission: not granted — either waiting on user response, or denied permanently
  if (!permission.granted) {
    if (permission.canAskAgain) {
      return (
        <View style={styles.blackCenter}>
          <StatusBar style="light" />
          <ActivityIndicator color={theme.colors.action} size="large" />
          <Text
            style={[
              theme.typography.body,
              { color: theme.colors.white, marginTop: theme.spacing.lg },
            ]}
          >
            Initializing camera…
          </Text>
        </View>
      );
    }
    return (
      <>
        <StatusBar style="light" />
        <PermissionDeniedCard />
      </>
    );
  }

  // Granted — full scanner UI
  return (
    <View style={styles.root}>
      <StatusBar style="light" />

      <CameraView
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        facing="back"
        enableTorch={flashOn}
      />

      <LinearGradient
        pointerEvents="box-none"
        colors={['rgba(0,0,0,0.65)', 'rgba(0,0,0,0)']}
        style={[styles.topScrim, { paddingTop: insets.top }]}
      >
        <ScanHeader onClose={handleClose} />
      </LinearGradient>

      <View pointerEvents="box-none" style={styles.centerOverlay}>
        <ScannerFrame />
        <Text
          style={[
            theme.typography.caption,
            styles.caption,
            { color: theme.colors.white },
          ]}
        >
          Align flyer within frame
        </Text>
      </View>

      <LinearGradient
        pointerEvents="box-none"
        colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.75)']}
        style={[
          styles.bottomScrim,
          { paddingBottom: insets.bottom + 24 },
        ]}
      >
        <ScanControls
          flashOn={flashOn}
          onGallery={handleGallery}
          onShutter={handleShutter}
          onFlashToggle={() => setFlashOn((x) => !x)}
          disabled={isProcessing}
        />
      </LinearGradient>

      {isProcessing && (
        <View style={styles.processingOverlay}>
          <ActivityIndicator color={theme.colors.action} size="large" />
          <Text
            style={[
              theme.typography.h3,
              {
                color: theme.colors.white,
                marginTop: theme.spacing.lg,
              },
            ]}
          >
            Reading flyer…
          </Text>
          <Text
            style={[
              theme.typography.caption,
              {
                color: 'rgba(255,255,255,0.7)',
                marginTop: theme.spacing.xs,
              },
            ]}
          >
            Extracting event details
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#000000',
  },
  blackCenter: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topScrim: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingBottom: 16,
  },
  centerOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  caption: {
    marginTop: 20,
    letterSpacing: 0.3,
  },
  bottomScrim: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 48,
  },
  processingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.75)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
