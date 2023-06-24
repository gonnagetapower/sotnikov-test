import './App.css';
import { Header } from './components';
import PostPage from './pages/PostPage';

function App() {
  return (
    <div className="App">
      <Header />
      <div className='container'>
        <PostPage />
      </div>
    </div>
  );
}

export default App;
