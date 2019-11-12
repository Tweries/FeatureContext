import { render } from '@testing-library/react';
import React from 'react';
import FeatureContext, { setFeatures, useFeature } from './FeatureContext';

describe('FeatureContext', () => {
  const DANGER_V1 = 'DANGER_V1';
  const SUCCESS_V1 = 'SUCCESS_V1';
  const UNKNOWN_V1 = 'UNKNOWN_V1';

  function Message() {
    const feature = useFeature();
    if (feature.active(DANGER_V1)) {
      return <span>Oh Noes!</span>;
    }
    if (feature.active(SUCCESS_V1)) {
      return <span>YATTA</span>;
    }
    return (
      <span aria-label="man-shrugging" role="img">
        🤷‍♂
      </span>
    );
  }

  const scenarios = [
    {
      description: `${DANGER_V1} active`,
      feature: setFeatures([DANGER_V1])
    },
    {
      description: `${SUCCESS_V1} active`,
      feature: setFeatures([SUCCESS_V1])
    },
    {
      description: `${UNKNOWN_V1} active`,
      feature: setFeatures([UNKNOWN_V1])
    },
    {
      description: 'empty array',
      feature: setFeatures([])
    }
  ];

  scenarios.forEach(({ description, feature }) => {
    it(description, () => {
      const { container } = render(
        <FeatureContext.Provider value={feature}>
          <Message />
        </FeatureContext.Provider>
      );

      expect(container).toMatchSnapshot();
    });
  });

  it('when "null" then it should throw', () => {
    expect(() => {
      render(
        <FeatureContext.Provider value={setFeatures(null)}>
          <Message />
        </FeatureContext.Provider>
      );
    }).toThrowErrorMatchingSnapshot();
  });

  it('when "undefined" then it should throw', () => {
    expect(() => {
      render(
        <FeatureContext.Provider value={setFeatures()}>
          <Message />
        </FeatureContext.Provider>
      );
    }).toThrowErrorMatchingSnapshot();
  });
});
