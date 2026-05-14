import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/home";
import Notfound from "./Pages/Notfound";
import ProjectDetail from "./Pages/ProjectDetail";
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="projects/:slug" element={<ProjectDetail />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
