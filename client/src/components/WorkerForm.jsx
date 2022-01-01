import React, { useState } from 'react'
import { useFormik } from 'formik';
import { Button, FormGroup, Label, Input, Form, ButtonGroup } from 'reactstrap';
import { saveWorker, updateWorker, setWorkerState } from '../store/reducers/currentWorkerReducer'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory,useRouteMatch } from 'react-router';
import { currentWorkerDataSelector } from '../store/selectors';

export default function WorkerForm() {
    const [selectedGender, setSelectedGender] = useState(0);
    const dispatch = useDispatch();
    const history = useHistory();
    const isEditPageRoute = useRouteMatch('/edit');

    const { worker } = useSelector(currentWorkerDataSelector);



    const validate = (values) => {
        const errors = {};

        if (!values.firstName) {
            errors.firstName = 'Required';
        }
        if (!values.lastName) {
            errors.lastName = 'Required';
        }
        if (!values.contacts) {
            errors.contacts = 'Required';
        }
        if (!values.salary) {
            errors.salary = 'Required';
        }
        if (!Number.isInteger(+values.salary)) {
            errors.salary = 'Must be a number';
        }
        if (!values.position) {
            errors.position = 'Required';
        }
        return errors;
    };

    const formik = useFormik({
        initialValues: {
            firstName: worker?.firstName || '',
            lastName: worker?.lastName || '',
            gender: worker?.gender ==='man' ||  true,
            contacts: worker?.contacts || '',
            salary: worker?.salary || 1000,
            position: worker?.position || '',
        },
        onSubmit: async (values) => {
            values.gender = !!selectedGender ? 'woman' : 'man'
            let res
            if(isEditPageRoute){
                res = await dispatch(updateWorker({ id: worker._id , data: values }));
            }else{
                res = await dispatch(saveWorker({ worker: values }));
            }
            if (res.error) {
                alert(res.error.message);
            } else {
                dispatch(setWorkerState(null))
                history.push('/workers')
            }
        },
        validateOnBlur: false,
        validateOnChange: false,
        validate,
    });
    return (
        <div>
            <h1>Add worker form</h1>
            <Form role="form" className="small" onSubmit={formik.handleSubmit}>
                <FormGroup>
                    <Label for="firstName">First Name</Label>
                    <Input type="text"
                        className='form-control'
                        name="firstName"
                        id="firstName"
                        placeholder="Enter first name"
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                    />
                </FormGroup>
                {formik.errors.firstName ? <div style={{ color: 'red' }}>{formik.errors.firstName}</div> : null}

                <FormGroup>
                    <Label for="lastName">lastName</Label>
                    <Input type="text"
                        className='form-control'
                        name="lastName"
                        id="lastName"
                        placeholder="Enter last name"
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                    />
                </FormGroup>
                {formik.errors.lastName ? <div style={{ color: 'red' }}>{formik.errors.lastName}</div> : null}

                <FormGroup>
                    <Label for="contacts">Contacts</Label>
                    <Input type="text"
                        className='form-control'
                        name="contacts"
                        id="contacts"
                        placeholder="Enter contacts"
                        value={formik.values.contacts}
                        onChange={formik.handleChange}
                    />
                </FormGroup>
                {formik.errors.contacts ? <div style={{ color: 'red' }}>{formik.errors.contacts}</div> : null}

                <FormGroup>
                    <Label for="position">Position</Label>
                    <Input type="text"
                        className='form-control'
                        name="position"
                        id="position"
                        placeholder="Enter position"
                        value={formik.values.position}
                        onChange={formik.handleChange}
                    />
                </FormGroup>
                {formik.errors.position ? <div style={{ color: 'red' }}>{formik.errors.position}</div> : null}

                <FormGroup>
                    <Label for="salary">Salary</Label>
                    <Input type="number"
                        className='form-control'
                        name="salary"
                        id="salary"
                        placeholder="Enter salary"
                        value={formik.values.salary}
                        onChange={formik.handleChange}
                    />
                </FormGroup>
                {formik.errors.salary ? <div style={{ color: 'red' }}>{formik.errors.salary}</div> : null}

                <FormGroup>
                    <Label for="gender" className="m-2">Gender</Label>
                    <ButtonGroup>
                        <Button color="primary"
                            className='mt-2'
                            type='button'
                            active={selectedGender === 0}
                            onClick={() => setSelectedGender(0)}
                        >Man</Button>

                        <Button color="primary"
                            className='mt-2'
                            type='button'
                            active={selectedGender === 1}
                            onClick={() => setSelectedGender(1)}
                        >Woman</Button>
                    </ButtonGroup>
                </FormGroup>
                <Button color="primary" className='m-2' type="submit" >{isEditPageRoute ? 'Update worker':'Add worker'} </Button>
            </Form>
        </div>
    )
}
