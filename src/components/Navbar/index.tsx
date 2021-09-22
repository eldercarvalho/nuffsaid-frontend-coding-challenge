import styled from 'styled-components';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

const Container = styled(AppBar)`
  &&& {
    background-color: #fff;
    box-shadow: none;
    border-bottom: 2px solid #ccc;
  }
`;

const Navbar: React.FC = () => (
  <Container>
    <Toolbar>
      <h1>nuffsaid.com Coding Challenge</h1>
    </Toolbar>
  </Container>
);

export default Navbar;
