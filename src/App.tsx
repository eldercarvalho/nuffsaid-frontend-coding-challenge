import { MessagesProvider } from '@/contexts/messages';
import Navbar from '@/components/Navbar';
import Home from '@/pages/Home';

import { GlobalStyles, Content } from '@/styles/global';
import { Theme } from './contexts/theme';
import { NotificationsProvider } from './contexts/notifications';

const App: React.FC<{}> = () => (
  <Theme>
    <NotificationsProvider>
      <MessagesProvider>
        <GlobalStyles />
        <Navbar />
        <Content>
          <Home />
        </Content>
      </MessagesProvider>
    </NotificationsProvider>
  </Theme>
);

export default App;
