import { render } from '@testing-library/react';
import React from 'react';
import FeatureProvider, { setFeatures, useFeature } from './FeatureProvider';

describe('FeatureProvider', () => {
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
      features: [DANGER_V1]
    },
    {
      description: `${SUCCESS_V1} active`,
      feature: setFeatures([SUCCESS_V1]),
      features: [SUCCESS_V1]
    },
    {
      description: `${UNKNOWN_V1} active`,
      features: [UNKNOWN_V1]
    },
    {
      description: 'empty array',
      features: []
    }
  ];

  scenarios.forEach(({ description, features }) => {
    it(description, () => {
      const { container } = render(
        <FeatureProvider features={features}>
          <Message />
        </FeatureProvider>
      );

      expect(container).toMatchSnapshot();
    });
  });

  it('when "null" then it should throw', () => {
    expect(() => {
      render(
        <FeatureProvider features={null}>
          <Message />
        </FeatureProvider>
      );
    }).toThrowErrorMatchingSnapshot();
  });

  it('when "undefined" then it should throw', () => {
    expect(() => {
      render(
        <FeatureProvider>
          <Message />
        </FeatureProvider>
      );
    }).toThrowErrorMatchingSnapshot();
  });
});
