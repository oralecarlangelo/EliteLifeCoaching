import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import Body from "./components/Body";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

function App() {
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required(),
    address: Yup.object().shape({
      address: Yup.string().required(),
      city: Yup.string().when("address", {
        is: (value) => value,
        then: (city) => city.required(),
      }),
    }),
    bodySite: Yup.object().shape({
      system: Yup.string(),
      code: Yup.string().when("system", {
        is: (value) => value,
        then: (code) => code.required("Body Site Code is required."),
      }),
    }),
    age: Yup.number().required().min(1),
  });
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Body>
        <Formik
          validationSchema={validationSchema}
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            address: {
              address: "",
              city: "",
            },
            bodySite: {
              system: "",
              code: "",
            },
            age: 0,
          }}
          onSubmit={async (values) => {
            await new Promise((r) => setTimeout(r, 500));
            alert(JSON.stringify(values, null, 2));
          }}
        >
          <Form className="flex flex-col">
            <label htmlFor="firstName">First Name</label>
            <Field id="firstName" name="firstName" placeholder="Jane" />
            <ErrorMessage name="firstName">{(message) => message}</ErrorMessage>

            <label htmlFor="address">Address</label>
            <Field id="address" name="address.address" placeholder="Jane" />
            <ErrorMessage name="address.address">
              {(message) => message}
            </ErrorMessage>

            <label htmlFor="city">City</label>
            <Field id="city" name="address.city" placeholder="Jane" />
            <ErrorMessage name="address.city">
              {(message) => message}
            </ErrorMessage>

            <label htmlFor="system">Body Site System</label>
            <Field id="system" name="bodySite.system" placeholder="test" />
            <ErrorMessage name="bodySite.system">
              {(message) => message}
            </ErrorMessage>

            <label htmlFor="code">Body Site Code</label>
            <Field id="code" name="bodySite.code" placeholder="test" />
            <ErrorMessage name="bodySite.code">
              {(message) => message}
            </ErrorMessage>

            <label htmlFor="age">Age</label>
            <Field id="age" name="age" placeholder="Age" type="number" />
            <ErrorMessage name="age">{(message) => message}</ErrorMessage>

            <label htmlFor="lastName">Last Name</label>
            <Field id="lastName" name="lastName" placeholder="Doe" />

            <label htmlFor="email">Email</label>
            <Field
              id="email"
              name="email"
              placeholder="jane@acme.com"
              type="email"
            />
            <button type="submit">Submit</button>
          </Form>
        </Formik>
      </Body>
      <Footer />
    </div>
  );
}

export default App;
