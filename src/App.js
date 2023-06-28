import './App.css';
import { Header } from './components';
import PhotoPage from './pages/PhotoPage/PhotoPage';
import PostPage from './pages/PostPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import TaskPage from './pages/TaskPage/TaskPage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <div className='container'>
          <Routes>
            <Route path='/' element={<PostPage />} />
            <Route path='/photo' element={<PhotoPage />} />
            <Route path='/task' element={<TaskPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
