import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, DropdownItem, DropdownMenu, DropdownToggle, Table, UncontrolledDropdown } from 'reactstrap';
import { logout } from '../store/reducers/userReducer'
import { loadWorkers, deleteWorker } from '../store/reducers/workersReducer';
import { workersDataSelector } from '../store/selectors';
import {setWorkerState} from '../store/reducers/currentWorkerReducer'

export default function Workers() {
    const dispatch = useDispatch();
    const history = useHistory();
    const workersSelector = useSelector(workersDataSelector);


    const hanldeLogout = () => {
        localStorage.removeItem('token')
        dispatch(logout())
        history.push('/login');
    }

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            history.push('/login');
        }
        dispatch(loadWorkers())

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleEditClick = (worker) => {
        dispatch(setWorkerState(worker))
        history.push(`/edit`)
    }

    return (
        <div>
            <h1>Workers</h1>
            <Button color="primary" className='m-2' type="button" onClick={hanldeLogout}>Logout </Button>
            <Button color="primary" className='m-2' type="button" onClick={() => history.push('/workerForm')} >Add worker </Button>
            {!workersSelector.workers.length ? <h1>You don't have workers</h1> :

                <Table className="align-items-center table-flush meetings-table">
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">
                                First Name
                        </th>
                            <th scope="col">
                                Last Name
                        </th>
                            <th scope="col">
                                Gender
                        </th>
                            <th scope="col">
                                Contacts
                        </th>
                            <th scope="col">
                                Salary
                        </th>
                            <th scope="col">
                                Position
                        </th>
                            <th scope="col">
                                Created at
                        </th>
                        </tr>
                    </thead>
                    <tbody className="list">
                        {workersSelector.workers.map((worker) => (
                            <tr key={worker._id}>
                                <td >
                                    <span className="name mb-0 text-sm">{worker.firstName}</span>
                                </td>
                                <td >
                                    <span className="name mb-0 text-sm">{worker.lastName}</span>
                                </td>
                                <td >
                                    <span className="name mb-0 text-sm">{worker.gender}</span>
                                </td>
                                <td>
                                    <span className="name mb-0 text-sm">{worker.contacts}</span>
                                </td>
                                <td>
                                    <span className="name mb-0 text-sm">{worker.salary}</span>
                                </td>
                                <td>
                                    <span className="name mb-0 text-sm">{worker.position}</span>
                                </td>
                                <td>
                                    <span className="name mb-0 text-sm">{new Date(worker.createdAt).toUTCString()}</span>
                                </td>
                                <td className="">
                                    <UncontrolledDropdown>
                                        <DropdownToggle>
                                            {/* <i className="fas fa-ellipsis-h" /> */}
                                            Delete/Edit
                                        </DropdownToggle>

                                        <DropdownMenu className="dropdown-menu-arrow" right>
                                            <DropdownItem onClick={() => handleEditClick(worker)}>Edit</DropdownItem>
                                            <DropdownItem className="text-danger" onClick={() => dispatch(deleteWorker(worker._id))}>
                                                Delete
                                        </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </Table>
            }
        </div>
    )
}
