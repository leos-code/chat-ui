import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ChatUI from '@/pages/chat-ui';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ChatUI/>} />
      </Routes>
    </Router>
  )
}

export default App
