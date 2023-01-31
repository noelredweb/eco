import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import './App.css';
import Footer from './components/footer/footer.component';
import Navbar from './components/navbar/navbar.component';
import useAfterSignIn from './hooks/useAfterSignIn';
import AboutPage from './pages/about/about';
import HomePage from './pages/homepage/home.page';
import LogoutPage from './pages/logout/logout';
import LogInPage from './pages/login/login';
import SignUpPage from './pages/signup/signup';
import SearchPage from './pages/search/search';
import StartPetitionPage from './pages/petitions/start.petition';
import MyPetitionsPage from './pages/petitions/my.petitions';
import PetitionsPage from './pages/petitions/petitions';
import ForgotPasswordPage from './pages/login/forgot.password';
import PetitionViewPage from './pages/petitions/petition.view';
import ContactPage from "./pages/contact/contact";

function App() {

  const afterSignIn = useAfterSignIn();

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      afterSignIn(token);
    } catch(e) { 
    }
  }, []);

  return (
    <div className="container">
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="login" element={<LogInPage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="logout" element={<LogoutPage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="start-a-petition" element={<StartPetitionPage />} />
        <Route path="start-a-petition/:id" element={<StartPetitionPage />} />
        <Route path="me" element={<MyPetitionsPage />} />
        <Route path="petitions" element={<PetitionsPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
        <Route path="petitions/:id" element={<PetitionViewPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
