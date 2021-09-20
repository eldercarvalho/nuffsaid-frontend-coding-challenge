import { MessagesProvider } from '@/contexts/messages';
import Navbar from '@/components/Navbar';
import Home from '@/pages/Home';

import { GlobalStyles, Content } from '@/styles/global';
import { Theme } from './contexts/theme';

const App: React.FC<{}> = () => (
  <Theme>
    <MessagesProvider>
      <GlobalStyles />
      <Navbar />
      <Content>
        <Home />
      </Content>
    </MessagesProvider>
  </Theme>
);

export default App;
