import React, {useEffect} from 'react'
import { Button, FormGroup, Label, Input, Form } from 'reactstrap';
import { useFormik } from 'formik';
import isEmail from 'validator/es/lib/isEmail';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { registration } from '../store/reducers/userReducer';
import { userDataSelector } from '../store/selectors';

export default function Registration() {
    const userSelector = useSelector(userDataSelector);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        if(userSelector.token){
            localStorage.setItem('token', userSelector.token)  
            history.push('/workers');
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userSelector.token])

    const validate = (values) => {
        const errors = {};

        if (!values.login) {
            errors.login = 'Required';
        }
        if (!values.password) {
            errors.password = 'Required';
        }
        if (!values.email) {
            errors.email = 'Required';
        } else if (!isEmail(values.email)) {
            errors.email = 'Must be  email';
        }

        return errors;
    };

    const formik = useFormik({
        initialValues: {
            login: '',
            password: '',
        },
        onSubmit: async (values) => {
            dispatch(registration({
                ...values
            }))
        },
        validateOnBlur: false,
        validateOnChange: false,
        validate,
    });
    return (
        <div>
            <h1>Registration</h1>
            <Form role="form" className="small" onSubmit={formik.handleSubmit}>
                <FormGroup>
                    <Label for="login">Login</Label>
                    <Input type="text"
                        className='form-control'
                        name="login"
                        id="login"
                        placeholder="Enter login"
                        value={formik.values.login}
                        onChange={formik.handleChange}
                    />
                </FormGroup>
                {formik.errors.login ? <div style={{ color: 'red' }}>{formik.errors.login}</div> : null}
                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input type="password"
                        className='form-control'
                        name="password"
                        id="password"
                        placeholder="Enter password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                    />

                </FormGroup>
                {formik.errors.password ? <div style={{ color: 'red' }}>{formik.errors.password}</div> : null}
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input type="text"
                        className='form-control'
                        name="email"
                        id="email"
                        placeholder="Enter email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                    />

                </FormGroup>
                {formik.errors.email ? <div style={{ color: 'red' }}>{formik.errors.email}</div> : null}
                <Button color="primary" className='m-2' type="submit" >Registration</Button>
                <Button color="primary" className='m-2' type="button" onClick={()=>history.push('/login')}>Go to login </Button>
            </Form>
            {/* </Formik> */}
        </div>
    )
}
