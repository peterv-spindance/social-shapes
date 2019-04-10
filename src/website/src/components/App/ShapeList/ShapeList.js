import React from 'react';
import Shape from './Shape/Shape';

const ShapeList = ({ shapes, removeShape }) => (
  <ul>
    {Object.keys(shapes).map(id =>
      <Shape
        key={shapes[id].shapeId}
        {...shapes[id]}
        onClick={() => removeShape(shapes[id].shapeId)}
      />
    )}
  </ul>
)

export default ShapeList