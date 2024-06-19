import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import NavBar from "./components/NavBar"
import './index.css'
import Home from "./pages/Home"
import Projects from "./pages/Projects"
import Contact from "./pages/Contact"
import About from "./pages/About"


const App = () => {
  return (
    <main className="bg-slate-950 h-[100vh]">
        <Router>
            <NavBar/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/projects" element={<Projects/>}/>
                <Route path="/contact" element={<Contact/>}/>

            </Routes>
        </Router>

    </main>
  )
}

export default App