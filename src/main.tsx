import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

//import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App';
import Error from './pages/Error';
import Landing from './pages/Landing';
import Projects from './pages/Projects';
import About from './pages/About';
import Reviews from './pages/Reviews';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: '/Projects',
        element: <Projects />,
      },
      {
        path: '/About',
        element: <About />,
      },
      {
        path: '/Reviews',
        element: <Reviews />,
      }
    ],
  },
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <RouterProvider router={router} />
  );
} else {
  console.error('Failed to find the root element');
}
