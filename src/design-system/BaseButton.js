import styled from 'styled-components';
import { space, typography, border } from 'styled-system';

export const BaseButton = styled('button')(
  {
    position: 'relative',
    display: 'inline-block',
    whiteSpace: 'nowrap',
    verticalAlign: 'middle',
    lineHeight: '20px',
    cursor: 'pointer',
    userSelect: 'none',
    appearance: 'none',
  },
  space,
  border,
  typography,
);

BaseButton.defaultProps = {
  fontSize: 'body-font-size',
  fontWeight: 'font-weight-semibold',
  px: '5px',
  py: 'spacer-3',
  borderWidth: 'border-width',
  borderStyle: 'border-style',
  borderRadius: 'border-radius',
};

export default BaseButton;
