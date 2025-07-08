import React from 'react';
import PropTypes from 'prop-types';

import Box from '../box';
import {
  BackgroundColor,
  BorderColor,
  BorderRadius,
  BorderStyle,
} from '../../../helpers/constants/design-system';

const Card = ({ border = true, backgroundColor = BackgroundColor.backgroundDefault, children, ...props }) => (
  <Box
    borderColor={border && BorderColor.borderMuted}
    borderRadius={border && BorderRadius.MD}
    borderStyle={border && BorderStyle.solid}
    backgroundColor={backgroundColor}
    padding={4}
    {...props}
  >
    {children}
  </Box>
);

Card.propTypes = {
  border: PropTypes.bool,
  backgroundColor: PropTypes.oneOf(Object.values(BackgroundColor)),
  ...Box.propTypes,
};

export default Card;
