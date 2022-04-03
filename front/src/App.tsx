import { ReactLocation, Router } from '@tanstack/react-location';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import { userStore } from './store/userStore/userStore';
import { ROUTES } from './constants';

const locationRouter = new ReactLocation();

function App() {
  return (
    <ChakraProvider>
      <Provider store={userStore}>
        <Router location={locationRouter} routes={ROUTES} />
      </Provider>
    </ChakraProvider>
  );
}

export default App;
