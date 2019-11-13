import PropTypes from 'prop-types';
import React, { createContext, useContext } from 'react';

export const FeatureContext = createContext();

export function useFeature() {
  return useContext(FeatureContext);
}

export function setFeatures(features) {
  if (Array.isArray(features)) {
    return {
      active: feature => features.indexOf(feature) !== -1
    };
  }
  throw new Error('the "features" argument must be an array');
}

function FeatureProvider({ children, features }) {
  const feature = setFeatures(features);
  return (
    <FeatureContext.Provider value={feature}>
      {children}
    </FeatureContext.Provider>
  );
}

FeatureProvider.propTypes = {
  children: PropTypes.node.isRequired,
  features: PropTypes.arrayOf(String).isRequired
};

export default FeatureProvider;
