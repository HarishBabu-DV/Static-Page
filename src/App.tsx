import { Route, Routes } from "react-router"
import Home from "./pages/Home"
import MainLayout from "./layout/MainLayout"

const App = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  )
}

export default App