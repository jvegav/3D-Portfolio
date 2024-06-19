import { Suspense, useRef, useState, useEffect } from "react";
import emailjs from '@emailjs/browser';
import { Canvas } from "@react-three/fiber";
import Loader from "../components/Loader";
import Whale from '../models/Whale';
import Octopus from "../models/Octopus";
import useAlert from "../hooks/useAlert";
import Alert from "../components/Alert";

const Contact = () => {
  const [form, setForm] = useState({name : '', email :'' , message:'' });
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef(null);
  const [currentAnimation, setCurrentAnimation] = useState('idle (sculk)');
  const {alert, showAlert, hideAlert} = useAlert();

  const adjustOctoForScreenSize = () => {
    let screenScale, screenPosition = [0, -2, -8];
    let rotation = [0, 4.4, 0];

    if (window.innerWidth < 768) {
      screenScale = [1.9, 1.9, 1.9];
      screenPosition = [0, -0.5, 0];
    } else {
      screenPosition = [1, -2.5, -8];
      screenScale = [4.5, 4.5, 4.5];
    }

    return [screenScale, screenPosition, rotation];
  };

  const [octoScreenScale, octoScreenPosition, octoRotation] = adjustOctoForScreenSize();

  useEffect(() => {
    const handleResize = () => {
      const [newScale, newPosition, newRotation] = adjustOctoForScreenSize();
      setOctoScreenScale(newScale);
      setOctoScreenPosition(newPosition);
      setOctoRotation(newRotation);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleChange = (e) =>{
    setForm({...form,[e.target.name]: e.target.value});
  }

  const handleFocus = () => {
    setCurrentAnimation('swim sculked');
  }

  const handleBlur = () => {
    setCurrentAnimation('idle (sculk)');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setCurrentAnimation('spread sculk');

    emailjs.send(
      process.env.VITE_EMAILJS_SERVICE_ID,
      process.env.VITE_EMAILJS_TEMPLATE_ID,
      {
        from_name: form.name,
        to_name: 'Josue',
        from_email: form.email,
        to_email: 'josuevegavalbuena@gmail.com',
        message: form.message
      },
      process.env.VITE_EMAILJS_PUBLIC_KEY
    ).then(() => {
      setIsLoading(false);
      showAlert({ show: true, text: 'Message sent successfully', type: 'success' });

      setTimeout(() => {
        hideAlert();
        setCurrentAnimation('idle (sculk)');
        setForm({ name: '', email: '', message: '' });
      }, 3000);
    }).catch((error) => {
      setIsLoading(false);
      setCurrentAnimation('idle (sculk)');
      console.log(error);
      showAlert({ show: true, text: 'I didn\'t receive your message', type: 'danger' });
    });
  };

  return (
    <section className="relative flex lg:flex-row flex-col max-container bg-slate-950 p-4">
      {alert.show && <Alert {...alert} />}
      
      <div className="flex-1 min-w-[50%] flex flex-col">
        <h1 className="head-text text-white">
          Get In Touch
        </h1>

        <form 
          className="w-full flex flex-col gap-7 mt-14"
          onSubmit={handleSubmit}
        >
          <label className="text-white font-semibold">
            Name
            <input
              type="text"
              name="name"
              className="input"
              placeholder="Pep"
              required
              value={form.name}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>

          <label className="text-white font-semibold">
            Email
            <input
              type="email"
              name="email"
              className="input"
              placeholder="pepguardiola@gmail.com"
              required
              value={form.email}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>

          <label className="text-white font-semibold">
            Message
            <textarea
              name="message"
              className="input"
              placeholder="How I Can Help You?"
              required
              value={form.message}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>

          <button
            type="submit"
            className="btn"
            onFocus={handleFocus}
            disabled={isLoading}
            onBlur={handleBlur}
          >
            {isLoading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>

      <div className="w-[80%] h-auto ">
        <Canvas
          className="flex justify-center items-center"
          camera={{
            position: [0, 0, 5],
            fov: 75,
            near: 0.1,
            far: 1000
          }}
        >
          <directionalLight intensity={2.5} position={[0, 0, 1]} />
          <ambientLight intensity={0.5} />
          <Suspense fallback={<Loader />}>
            <Octopus
              currentAnimation={currentAnimation}
              position={octoScreenPosition}
              rotation={octoRotation}
              scale={octoScreenScale}
            />
          </Suspense>
        </Canvas>
      </div>
    </section>
  );
};

export default Contact;
