import { Container } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import PostDetails from "./components/PostDetails/PostDetails";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Auth from "./components/Auth/Auth";

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<Home />} />
          <Route path="/posts/search" element={<Home />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/auth" element={!user? <Auth />: <Home />}/>
          <Route path="/*" element={<Home/>} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;