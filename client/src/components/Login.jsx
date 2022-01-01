import React, {useEffect} from 'react'
import { Button, FormGroup, Label, Input, Form } from 'reactstrap';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { login } from '../store/reducers/userReducer';
import { userDataSelector } from '../store/selectors';

export default function Login() {
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

        return errors;
    };

    const formik = useFormik({
        initialValues: {
            login: '',
            password: '',
        },
        onSubmit: async (values) => {
            dispatch(login({
                ...values
            }))
        },
        validateOnBlur: false,
        validateOnChange: false,
        validate,
    });
    return (
        <div>
            <h1>Login</h1>
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

                <Button color="primary" className='m-2'  type="submit" >Login</Button>
                <Button color="primary" className='m-2' type="button" onClick={()=>history.push('/registration')}>Go to registration </Button>

            </Form>
        </div>
    )
}
