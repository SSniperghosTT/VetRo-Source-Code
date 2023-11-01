import './App.css';
import About from './Components/About';
import './MyCss/MyCustomStylesheet.css'
import 'font-awesome/css/font-awesome.min.css';
import Contact from './Components/Contact';
import Layout from './Components/Layout';
import Main from './Components/Main';
import Portfolio from './Components/Portfolio';
import SignIn from './Components/SignIn';
import VetRoBot from './Components/VetRoBot';
import { RouterProvider, createHashRouter } from "react-router-dom"
import PageMissing from './Components/PageMissing';
import MyContextProvider from './Components/ContextProvider';


function App() {

  let Routes = createHashRouter([
    {
      path: '/', element: <Layout />, children: [
        { path: "/", element: <Main /> },
        { path: "home", element: <Main /> },
        { path: "SignIn", element: <SignIn /> },
        { path: "VetRoBot", element: <VetRoBot /> },
        { path: "portfolio", element: <Portfolio /> },
        { path: "about", element: <About /> },
        { path: "contact", element: <Contact /> },
        { path: "*", element: <PageMissing /> },
      ]
    },


  ])
  return (
    <MyContextProvider>
      <div className='myWidth'>
        <RouterProvider router={Routes} />
        <VetRoBot />
      </div>
    </MyContextProvider>
  );
}

export default App;
