import { Routing } from 'pages';
import { withProviders } from './providers';
import './styles/index.scss';


function App() {
  return (
    <Routing />
  );
}

export default withProviders(App);
