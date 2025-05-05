import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

import './App.css';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <div className="project-app">
        <Header />
        <main className="mx-3">
          <ScrollToTop />
          <Outlet />
        </main>
        <Footer />
    </div>
  );
}

export default App;
