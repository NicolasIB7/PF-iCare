import "./App.css";
//components
import Navbar from "./components/landing/navbar/navBar";
import Footer from "./components/landing/footer/footer";
import Landing from "./components/landing/landing";
import About from "./components/About/about";
import Blog from "./components/blog/blog";
import NoteOne from "./components/blog/note1/note";
import NoteTwo from "./components/blog/note2/note";
import NoteThree from "./components/blog/note 3/note";
import Services from "./components/serv/services";
import Work from "./components/work/work";
import LoginClient from "./components/LoginClient/LoginClient";
import MedicForm from "./components/medicWorkForm/medicForm";
import LoginMedic from "./components/LoginMedic/LoginMedic";
import { Route, Routes } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {
  Chat,
  HomeClient,
  MedicalHistory,
  MedicalAppointments,
  MyShifts,
  Profile,
  Reviews,
  Urgency,
} from "./components/HomeClient/index";
import {Agenda, HomeMedic,MedicalEmergency,ProfileMedic,ReviewsMedic } from "./components/HomeMedic/index";

function App() {
  const location = useLocation();

  console.log(location.pathname);
  return (
    <div className="App">
      {location.pathname.startsWith("/HomeClient") ? (
        <HomeClient />
      ) : (
        <>
          <Navbar />
          <Footer />
        </>
      )}
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/noteOne" element={<NoteOne />} />
        <Route path="/blog/noteTwo" element={<NoteTwo />} />
        <Route path="/blog/noteThree" element={<NoteThree />} />
        <Route path="/work" element={<Work />} />
        <Route path="/loginClient" element={<LoginClient />} />
        <Route path="/work/registerForm" element={<MedicForm />} />
        <Route path="/HomeClient/Profile" element={<Profile />} />
        <Route path="/HomeClient/MyShifts" element={<MyShifts />} />
        <Route path="/HomeClient/Chat" element={<Chat />} />
        <Route path="/HomeClient/MedicalHistory" element={<MedicalHistory />} />
        <Route path="/HomeClient/MedicalAppointments" element={<MedicalAppointments />} />
        <Route path="/HomeClient/Reviews" element={<Reviews />} />
        <Route path="/HomeClient/Urgency" element={<Urgency />} />
      </Routes>
    </div>
  );
}
export default App;

