
import React from 'react';
import { connect } from 'react-redux';
import { addShape } from '../actions';

const AddShape = ({ dispatch }) => {
  let sidesInput;
  let colorInput;

  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault();
        if (!sidesInput.value.trim()) {
          return;
        }
        if (!colorInput.value.trim()) {
          return;
        }
        dispatch(addShape(Number(sidesInput.value), colorInput.value));
        colorInput.value = '';
        sidesInput.value = '';
      }}>
        <div>
          Sides: <input ref={node => sidesInput = node} />
        </div>
        <div>
          Color: <input ref={node => colorInput = node} />
        </div>
        <button type="submit">
          Add Shape
        </button>
      </form>
    </div>
  );
}

export default connect()(AddShape);