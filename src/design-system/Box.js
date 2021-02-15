import styled from 'styled-components';

const Box = styled.div`
  padding: 4em;
  background: ${(porps) => (porps.primary ? 'dodgerblue' : 'crimson')};
`;

export default Box;
