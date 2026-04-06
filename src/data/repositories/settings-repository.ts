import type { UserSettings } from '@/types';

export interface ISettingsRepository {
  getSettings(): Promise<UserSettings>;
  saveSettings(settings: UserSettings): Promise<void>;
}
