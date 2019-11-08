import React, { Component } from 'react';
import { Phone } from '../models';

export class PhoneEditor extends Component {
    phoneTypeOptions = ['home', 'mobile', 'fax'];
    state = {
        number: '',
        type: '',
        deleteChoice: ''
    };

    onSubmit() {
        this.props.onPhoneAdded(new Phone(this.state.number, this.state.type));
        this.setState({ number: '', type: ''});        
    };

    onRemove() {
        this.props.onPhoneRemoved(this.state.deleteChoice);
        this.setState({deleteChoice: ''});
    }

    render() {
        return (
            <div className='add-remove'>
                <div className="row mb-4">
                    <div className="col-3">
                        <select
                            name="newPhone_type"
                            id="newPhone_type"
                            className="form-control"
                            value = {this.state.type}
                            onChange = {e => this.setState({type: e.target.value})}>
                            <option></option>
                            {
                                this.phoneTypeOptions.map((x, i) => 
                                <option key = {i}>
                                    {x}
                                </option>)
                            }
                        </select>
                    </div>
                    <div className="col-6">
                        <input
                            type="text"
                            name="newPhone_number"
                            id="newPhone_number"
                            className="form-control" 
                            value = {this.state.number}
                            onChange = {e => this.setState({number: e.target.value})}
                            />
                    </div>
                    <div className="col-3">
                        <button
                            type="button"
                            className="btn btn-success btn-block addButton"
                            onClick={ () => this.onSubmit() }>
                            Add
                        </button>
                    </div>
                </div>

                <div className="row mt-4 mb-4">
                    <div className='col-9'>
                        <select
                            name="delete_phone_number"
                            id="delete_phone_number"
                            className="form-control"
                            value = {this.state.deleteChoice}
                            onChange = {e => this.setState({deleteChoice: e.target.value})}>
                            <option></option>
                            {
                                this.props.phoneNumbers.map((x, i) => 
                                <option key = {i}>
                                    {x.number}
                                </option>)
                            }
                        </select>
                    </div>
                    <div className='col-3'>
                        <button
                            type="button"
                            className="btn btn-success btn-block removeButton"
                            onClick={ () => this.onRemove() }>
                            Remove
                        </button>
                    </div>
                </div>
            </div>

        );
    }
}