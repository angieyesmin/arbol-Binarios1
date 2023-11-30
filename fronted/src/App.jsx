import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Inicio from './Views/Inicio';

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />}/>
      </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App