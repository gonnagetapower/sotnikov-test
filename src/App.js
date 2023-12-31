import './App.css';
import { Header } from './components';
import AlbumPage from './pages/AlbumPage/AlbumPage';
import PostPage from './pages/PostPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import TaskPage from './pages/TaskPage/TaskPage';
import PhotosPage from './pages/PhotosPage/PhotosPage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <div className='container'>
          <Routes>
            <Route path='/' element={<PostPage />} />
            <Route path='/album' element={<AlbumPage />} />
            <Route path='/album/:id' element={<PhotosPage />} />
            <Route path='/task' element={<TaskPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
