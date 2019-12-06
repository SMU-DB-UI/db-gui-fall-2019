import React, { Component } from 'react';
import { EmpRepository } from '../api/empRepository'
import { Redirect } from 'react-router-dom';

export class AddEmpForm extends Component {


    state = {
        fname: '',
        lname: '',
        dep_id: '',
        pos: '',
        manager: '',
        addr: '',
        email: '',
        phn_num: '',
        strikes: 0,
        managers: []

    }

    empRepo = new EmpRepository();

    departments = [
        [1, 'Computer Science'],
        [2, 'Mechanical Engineering'],
        [3, 'Marketing'],
        [4, 'Human Resources'],
        [5, 'Sanitation']
    ]

    onSubmit() {
        let empInfo = {
            fname: this.state.fname,
            lname: this.state.lname,
            dep_id: this.state.dep_id,
            pos: this.state.pos,
            manager: this.state.manager,
            addr: this.state.addr,
            email: this.state.email,
            phn_num: this.state.phn_num
        }

        this.empRepo.addEmployee(empInfo);
        this.setState({
            fname: '',
            lname: '',
            dep_id: '',
            pos: '',
            manager: '',
            addr: '',
            email: '',
            phn_num: '',
        })
    }

    componentDidMount() {
        let managers = [];
        this.empRepo.getManagers()
            .then(x => {
                x.forEach(m =>
                    managers.push([m.id, m.fname + " " + m.lname])
                )
                this.setState({ managers: managers })
            })
    }

    render() {

        if (window.location.userId === -1) {
            return <Redirect to='/' />
        }

        return (
            <>
                <form className='form'>
                    <div className='form-row justify-content-md-center mt-3'>
                        <div className='form-group  col-3'>
                            <label htmlFor='firstName'>
                                First Name
                        </label>
                            <input type='text'
                                id='firstName'
                                name='firstName'
                                className='form-control'
                                value={this.state.fname}
                                onChange={e => this.setState({ fname: e.target.value })} />
                        </div>

                        <div className='form-group  col-3'>
                            <label htmlFor='lastName'>
                                Last Name
                        </label>
                            <input type='text'
                                id='lastName'
                                name='lastName'
                                className='form-control'
                                value={this.state.lname}
                                onChange={e => this.setState({ lname: e.target.value })} />
                        </div>
                    </div>
                    <div className='form-row justify-content-md-center'>
                        <div className='form-group  col-3'>
                            <label htmlFor='email'>
                                Email
                        </label>
                            <input type='text'
                                id='email'
                                name='email'
                                className='form-control'
                                value={this.state.email}
                                onChange={e => this.setState({ email: e.target.value })} />
                        </div>
                        <div className='form-group  col-3'>
                            <label htmlFor='phone'>
                                Phone Number
                        </label>
                            <input type='text'
                                id='phone'
                                name='phone'
                                className='form-control'
                                value={this.state.phn_num}
                                onChange={e => this.setState({ phn_num: e.target.value })} />
                        </div>
                    </div>
                    <div className='form-row justify-content-md-center'>
                        <div className='form-group  col-3'>
                            <label htmlFor='position'>
                                Position
                        </label>
                            <input type='text'
                                id='position'
                                name='position'
                                className='form-control'
                                value={this.state.pos}
                                onChange={e => this.setState({ pos: e.target.value })} />
                        </div>

                        <div className='form-group  col-3'>
                            <label htmlFor="manager">Manager</label>
                            <select type="text"
                                id="manager"
                                name="manager"
                                className="form-control"
                                value={this.state.manager}
                                onChange={e => this.setState({ manager: e.target.value })}>
                                <option key='0' value='0'></option>
                                {
                                    this.state.managers.map(m =>
                                        <option key={m[0]} value={m[0]}>{m[1]}</option>
                                    )
                                }
                            </select>
                        </div>
                    </div>

                    <div className='form-row justify-content-md-center'>
                        <div className="form-group col-3">
                            <label htmlFor="departmentId">Department</label>
                            <select type="text"
                                id="departmentId"
                                name="departmentId"
                                className="form-control"
                                value={this.state.dep_id}
                                onChange={e => this.setState({ dep_id: e.target.value })}>
                                <option key='0' value='0'></option>
                                {
                                    this.departments.map(department =>
                                        <option key={department[0]} value={department[0]}>{department[1]}</option>
                                    )
                                }
                            </select>
                        </div>

                        <div className="form-group col-3">
                            <label htmlFor="address">Address</label>
                            <input type="text"
                                id="address"
                                name="address"
                                className="form-control"
                                value={this.state.addr}
                                onChange={e => this.setState({ addr: e.target.value })}>
                            </input>
                        </div>
                    </div>

                    <div className='form-row justify-content-md-center'>
                        <button type='button' className='btn btn-info col-3' onClick={() => this.onSubmit()}>Submit</button>
                    </div>

                </form>
            </>
        );
    }

}