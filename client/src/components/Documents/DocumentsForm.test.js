import React from 'react';
import ReactDOM from 'react-dom';
import enzyme, { render, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DocumentsForm from './DocumentsForm';

enzyme.configure({adapter: new Adapter()})

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DocumentsForm />, div);
});

it('should render all the 16 form elements', () => {
  const onSubmitFn = jest.fn()
  const wrapper = shallow(<DocumentsForm onSubmit={onSubmitFn} />)
  const inputs = wrapper.find('input[type="text"]')
  expect(inputs.length).toEqual(16)
});

it('should call props.onSubmit when the submit button is clicked', () => {
  const onSubmitFn = jest.fn()
  const wrapper = render(<DocumentsForm onSubmit={onSubmitFn} />)

  const button = wrapper.find('button').first()
  expect(onSubmitFn.mock.calls.length).toEqual(0)
  button.simulate('click')
  expect(onSubmitFn.mock.calls.length).toEqual(1)
  expect(1).toEqual(1)

});

it('array Container', () => {
  expect(['A', 'B', 'C']).toEqual(expect.arrayContaining(['A']));
})
