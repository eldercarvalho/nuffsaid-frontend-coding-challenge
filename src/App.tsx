import { MessagesProvider } from '@/contexts/messages';
import { Home } from '@/pages/Home';

import { GlobalStyles } from '@/styles/global';

const App: React.FC<{}> = () => (
  <MessagesProvider>
    <GlobalStyles />
    <Home />
  </MessagesProvider>
);

export default App;
