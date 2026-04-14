import { Formik, Form } from "formik";
import * as Yup from "yup"; // Import Yup
import { useEffect, useRef, useState } from "react";
import FormField from "./components/FormField";
import Sidebar from "./components/Sidebar";
import Section from "./components/Section";
import FormObserver from "./components/FormObserver";
import '../src/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const SignupSchema = Yup.object().shape({
  name: Yup.string().min(2, "Too Short!").required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(10, "Must be at least 10 digits")
    .required("Phone is required"),
  city: Yup.string().required("City is required"),
  company: Yup.string().required("Company is required"),
  role: Yup.string().required("Role is required"),
  hobby: Yup.string().required("Hobby is required"),
  skill: Yup.string().required("Skill is required"),
});

const initalValue = {
          name: "", email: "", phone: "", city: "",
          company: "", role: "", hobby: "", skill: "",
        }

export default function App() {
  const [submitted, setSubmitted] = useState(false);
  const [activeSections, setActiveSections] = useState([0]);
  const [loading, setLoading] = useState(false);
  const sectionRefs = useRef([]);

const onFormComplete = (values, actions) => {
  setLoading(true);
  setSubmitted(true);

  setTimeout(() => {
    setLoading(false);
    setSubmitted(false);

    // ✅ RESET FORM HERE
    actions.resetForm();
  }, 3000);
};
  const handleScroll = () => {
    const newActive = [];
    sectionRefs.current.forEach((ref, index) => {
      if (ref) {
        const rect = ref.getBoundingClientRect();
        if (rect.top < window.innerHeight / 2 && rect.bottom > 100) {
          newActive.push(index);
        }
      }
    });
    setActiveSections(newActive);
  };

  const scrollToSection = (index) => {
    const target = sectionRefs.current[index];
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="app-layout">
      <Formik
        initialValues={initalValue}
        validationSchema={SignupSchema} 
        onSubmit={onFormComplete}
      >
        {({ values, errors, touched, isSubmitting }) => (
          <>
            <FormObserver values={values} onFormComplete={onFormComplete} />

            <div className="container d-flex">
              <Sidebar activeSections={activeSections} onNavigate={scrollToSection} />

              <div className="content flex-grow-1 ms-4" >
                <Form>
                  <Section id="A" title="Section A — Personal Info" ref={(el) => (sectionRefs.current[0] = el)}>
                    <FormField name="name" placeholder="Name" />
                    <FormField name="email" placeholder="Email" />
                  </Section>

                  <Section id="B" title="Section B — Contact" ref={(el) => (sectionRefs.current[1] = el)}>
                    <FormField name="phone" placeholder="Phone" />
                    <FormField name="city" placeholder="City" />
                  </Section>

                  <Section id="C" title="Section C — Work" ref={(el) => (sectionRefs.current[2] = el)}>
                    <FormField name="company" placeholder="Company" />
                    <FormField name="role" placeholder="Role" />
                  </Section>

                  <Section id="D" title="Section D — Skills" ref={(el) => (sectionRefs.current[3] = el)}>
                    <FormField name="hobby" placeholder="Hobby" />
                    <FormField name="skill" placeholder="Skill" />
                  </Section>
              {submitted && (
                <div className="">
                  <div className="text-center p-5 bg-white shadow rounded">
                    <h2 className="text-success">🎉 Success!</h2>
                    <p>Your form has been submitted successfully.</p>
                    <button className="btn btn-primary mt-3" onClick={() => setSubmitted(false)}>
                      Fill Again
                    </button>
                  </div>
                </div>
              )}
                  <button type="submit" className="btn btn-primary my-5" disabled={loading}>
                    {loading ? "Processing..." : "Submit"}
                  </button>
                </Form>
              </div>

             
            </div>
          </>
        )}
      </Formik>
    </div>
  );
}