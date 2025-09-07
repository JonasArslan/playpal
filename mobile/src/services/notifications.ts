import { Platform } from 'react-native';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { RESULTS, request, PERMISSIONS, check } from 'react-native-permissions';

export async function ensurePushPermission(): Promise<boolean> {
  if (Platform.OS !== 'ios') return true;
  const status = await check(PERMISSIONS.IOS.NOTIFICATIONS);
  if (status === RESULTS.GRANTED) return true;
  const r = await request(PERMISSIONS.IOS.NOTIFICATIONS, {
    // iOS 12+ notification options
    alert: true,
    badge: true,
    sound: true,
    criticalAlert: false,
    provisional: false,
    announcement: false,
  } as any);
  return r === RESULTS.GRANTED || r === RESULTS.LIMITED;
}

export async function getApnsToken(): Promise<string | null> {
  if (Platform.OS !== 'ios') return null;
  try {
    const token = await PushNotificationIOS.getDeviceToken();
    return token ?? null;
  } catch {
    return null;
  }
}

export async function initNotifications(): Promise<{ granted: boolean; token: string | null }> {
  const granted = await ensurePushPermission();
  let token: string | null = null;
  if (granted) {
    token = await getApnsToken();
  }
  return { granted, token };
}

export function scheduleLocalNotification(title: string, body: string, delayMs = 500) {
  if (Platform.OS !== 'ios') return;
  const fireDate = new Date(Date.now() + delayMs);
  PushNotificationIOS.addNotificationRequest({
    id: String(Date.now()),
    title,
    body,
    fireDate,
    sound: 'default',
  });
}


