import { createContext, useContext } from 'react';

const FeatureContext = createContext();

export default FeatureContext;

export function setFeatures(features) {
  if (Array.isArray(features)) {
    return {
      active: feature => features.indexOf(feature) !== -1
    };
  }
  throw new Error('the "features" argument must be an array');
}

export function useFeature() {
  return useContext(FeatureContext);
}
