import { Tabs } from 'expo-router';

import { useTranslation } from '@/locale/hooks';

import { TabBar } from './components/TabBar';
import { AppTabBarName, TabBarOptions } from './components/types';
import { useSubscribeToNewMessages } from './hooks/useSubscribeToNewMessages';

const AppTabsLayout = () => {
  const { t } = useTranslation();

  useSubscribeToNewMessages();

  const tabBarOptions: Record<AppTabBarName, TabBarOptions> = {
    [AppTabBarName.Home]: {
      icon: 'Home',
      name: t(`bottomTabBar.${AppTabBarName.Home}`),
    },
    [AppTabBarName.Message]: {
      icon: 'Message',
      name: t(`bottomTabBar.${AppTabBarName.Message}`),
    },
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <TabBar {...props} options={tabBarOptions} />}
    >
      <Tabs.Screen name={AppTabBarName.Home} />
      <Tabs.Screen name={AppTabBarName.Message} />
    </Tabs>
  );
};

export default AppTabsLayout;
