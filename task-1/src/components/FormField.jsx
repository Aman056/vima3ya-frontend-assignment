import { useField } from "formik";

const FormField = ({ name, ...props }) => {
  const [field, meta] = useField(name);

  return (
    <div className="mb-3">
      <input {...field} {...props} className="form-control" />

      {meta.touched && meta.error && (
        <div className="text-danger">{meta.error}</div>
      )}
    </div>
  );
};

export default FormField;