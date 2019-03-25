import React from 'react';
import Shape from './Shape/Shape';

const ShapeList = ({ shapes, removeShape }) => (
  <ul>
    {Object.keys(shapes).map(id =>
      <Shape
        key={shapes[id].id}
        {...shapes[id]}
        onClick={() => removeShape(shapes[id].id)}
      />
    )}
  </ul>
)

export default ShapeList