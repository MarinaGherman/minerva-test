import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import s from './App.module.scss';
import Form from './components/Form';
import Graphs from './components/Graphs';
import Main from './components/Main';
import store from './store';

const App = () => (
    <div className={s.appContainer}>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/graphs" element={<Graphs />} />
          <Route path="/form" element={<Form />} />
        </Routes>
      </Provider>
    </div>
  );

export default App;
