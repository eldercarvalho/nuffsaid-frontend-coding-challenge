import { MessagesProvider } from '@/contexts/messages';
import { Home } from '@/pages/Home';

import { GlobalStyles } from '@/styles/global';
import { Theme } from './contexts/theme';

const App: React.FC<{}> = () => (
  <Theme>
    <MessagesProvider>
      <GlobalStyles />
      <Home />
    </MessagesProvider>
  </Theme>
);

export default App;
