import { Route, Routes } from 'react-router-dom';
import Nav from './components/Nav';
import StudentPage from './pages/StudentPage';


const App = () => {
  return (
    <>
      {/* NavBar */}
      <Nav />

      <Routes>
            <Route path = '/' element = { <StudentPage />} > </Route>
          <Route path = '/page/:pageNumber' element = { <StudentPage />} > </Route>
            {/* <Route path='/mail' element={<StudentPage />} > </Route> */}

             
          </Routes>
    </>
  )
};

export default App;
