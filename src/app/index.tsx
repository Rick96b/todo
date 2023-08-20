import { Routing } from 'pages';
import { withProviders } from './providers';
import './styles/index.scss';
import { useEffect } from 'react';

function App() {
  return (
    <Routing />
  );
}

export default withProviders(App);
