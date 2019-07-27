import React from 'react';
import { FormContainer, TextField, withScope } from 'react-form-container';

class PlaygroundContainer extends React.Component {

    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
        }
    }

    render() {
        return (
            <Playground scope={this} />
        );
    }
}

const Playground = (props) => (
    <FormContainer scope={props.scope}>
        <SomeFields />
    </FormContainer>
);


const SomeFields = (props) => (
    <FormContainer scope={props.scope}>
        <TextField required name='name' />
        <TextField name='email' />
        <MoreFields />
    </FormContainer>
)

const MoreFields = (props) => (
    <FormContainer scope={props.scope}>
        <TextField name='name' />
        <TextField name='email' />
    </FormContainer>
);

export default PlaygroundContainer;