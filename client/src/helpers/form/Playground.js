import React, { Component } from 'react';
import FormContainer from './FormContainer';
import TextField from './TextField';
import SelectField from './SelectField';
import CheckboxGroup from './CheckboxGroup';

class Playground extends Component {
  constructor(props) {
    super(props);

    this.state = {
      test: 1,
      name: 'Default name',
      name2: 'Default2',
      items: [1, 2, 3],
      categories: ['two'],
      First: 'Default First'
    }
  }


  render() {
    let dummyData = [
      {id: 1, label: 'Item 1'},
      {id: 2, label: 'Item 2'},
      {id: 3, label: 'Item 3'},
      {id: 4, label: 'Item 4'}
    ];
    let categories = [
      { value: 'one', label: 'One'},
      { value: 'two', label: 'Two'},
      { value: 'three', label: 'Three'}
    ];

    return(
      <div>
        <h2>Playground</h2>
        <FormContainer scope={this}>
          <TextField name='name' />
          <CheckboxGroup name='items' options={dummyData} />
          
          <SelectField floatingLabelText='Categorias' multiple={true} options={categories} name='categories' />

          <div>
            <span>
              Oi
              <TextField name='First' />
              <span>First</span>
              <span>?</span>
            </span>
            <p>Second</p>
            <p>Third</p>
          </div>
        </FormContainer>
      </div>
    );
  }
}

export default Playground;
