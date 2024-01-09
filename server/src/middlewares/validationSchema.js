import * as yup from 'yup';

const userValidationSchema = yup.object().shape({
    firstName: yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required first name').matches(/^[a-zA-Z]+$/, "Invalid first name format"),
    lastName: yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required last name').matches(/^[a-zA-Z]+$/, "Invalid last name format"),
    phone: yup.string().required("Phone number is required"),
    email: yup.string().email().required('Email is requried')
})

const loginSchema = yup.object().shape({
    email: yup.string().email().required('Email is requried'),
})

export {userValidationSchema, loginSchema};