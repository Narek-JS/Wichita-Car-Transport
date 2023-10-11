import { useFormik, FormikValues } from 'formik';

type CheckErrorProps<Values extends FormikValues> = {
    formik: ReturnType<typeof useFormik<Values>>,
    name: string,
    classes: Record<string, string>
};

function FormikErrors<Values extends FormikValues>({
    formik,
    name,
    classes
}: CheckErrorProps<Values>): JSX.Element | null {
    const error = formik.touched[name] && formik.errors[name];
    const errorMessage = Array.isArray(error) ? error.join(', ') : error as string;
  
    return errorMessage ? <span className={classes.error}>{errorMessage}</span> : null;
};
  
export { FormikErrors };