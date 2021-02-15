import styled from 'styled-components';
import { color } from 'styled-system';

import BaseButton from './BaseButton';

const Button = styled(BaseButton)({}, color);

Button.defaultProps = {
  color: 'red400',
};

export default Button;
