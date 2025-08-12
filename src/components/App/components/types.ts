import { IconName } from '@/components/Icon/types';
import { ObjectValues } from '@/types/common';

export interface TabBarOptions {
  icon: IconName;
  name: string;
}

export type TabBarOptionsMap<TName extends string = string> = Record<
  TName,
  TabBarOptions
>;

export const AppTabBarName = {
  Home: 'index',
  Message: 'message',
} as const;

export type AppTabBarName = ObjectValues<typeof AppTabBarName>;
