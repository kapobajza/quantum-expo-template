import { NavigationProp } from '@react-navigation/native';
import { ExpoRouter, useNavigation as useRNNavigation } from 'expo-router';

type ExpoRouteKey<
  TRoute extends
    ExpoRouter.__routes['hrefInputParams']['pathname'] = ExpoRouter.__routes['hrefInputParams']['pathname'],
> = TRoute extends `/${infer R}` ? R : TRoute;

const useNavigation = () => {
  return useRNNavigation<NavigationProp<Record<ExpoRouteKey, string>>>();
};

export default useNavigation;
