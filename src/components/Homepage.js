import React from "react";
import ReactDOM from "react-dom";
import { Formik, Field, Form, useField, useFormikContext } from "formik";
import "./Homepage.css";

async function fetchNewTextC(a, b) {
  await new Promise((r) => setTimeout(r, 500));
  return `textA: ${a}, textB: ${b}`;
}

const MyField = (props) => {
  const {
    values: { textA, textB },
    setFieldValue,
  } = useFormikContext();
  const [field, meta] = useField(props);

  React.useEffect(() => {
    let isCurrent = true;
    // your business logic around when to fetch goes here.
    if (textA.trim() !== "" && textB.trim() !== "") {
      fetchNewTextC(textA, textB).then((textC) => {
        if (!!isCurrent) {
          // prevent setting old values
          setFieldValue(props.name, textC);
        }
      });
    }
    return () => {
      isCurrent = false;
    };
  }, [textB, textA, setFieldValue, props.name]);

  return (
    <>
      <input {...props} {...field} />
      {!!meta.touched && !!meta.error && <div>{meta.error}</div>}
    </>
  );
};
const Homepage = () => {
  const initialValues = { textA: "", textB: "", textC: "" };

  return (
    <div className="App">
      <Formik initialValues={initialValues}>
        <div className="section">
          <h1>My Cover Letter</h1>
          <Form>
            <label>
              Role
              <Field type="textarea" name="textA" />
            </label>
            <br></br>
            <br></br>
            <label>
              Company Name
              <Field name="textB" />
            </label>
            <br></br>
            <br></br>
            <label>
              Cover Letter
              <MyField name="textC" />
            </label>
            <br></br>
            <br></br>
            {/* <button type="submit">Submit</button> */}
          </Form>
        </div>
      </Formik>
    </div>
  );
};

export default Homepage;
