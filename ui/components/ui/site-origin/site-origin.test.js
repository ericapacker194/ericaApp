import React from 'react';
import { renderWithProvider } from '../../../../test/lib/render-helpers';
import SiteOrigin from './site-origin';

describe('SiteOrigin', () => {
  const defaultProps = {
    siteOrigin: 'https://example.com',
    iconSrc: 'https://example.com/icon.png',
    iconName: 'icon',
    chip: false,
    className: '',
    rightIcon: false,
  };

  it('renders number and hyphen prefixed domains correctly', () => {
    const { container } = renderWithProvider(
      <SiteOrigin {...defaultProps} siteOrigin={'0-example.com'} />
    );
    expect(container).toMatchSnapshot();
  });
});
