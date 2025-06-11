
import { Outlet } from "react-router";
import './App.css'

function App() {

  return (
    <>
      {/* <Navbar /> */}
      <main className="">
        <Outlet />
      </main>
    </>
  )
}

export default App
