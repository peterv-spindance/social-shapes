import React from 'react';
import Shape from './Shape/Shape';

const ShapeList = ({ shapes, removeShape }) => (
  <ul>
    {shapes.map(shape =>
      <Shape
        key={shape.id}
        {...shape}
        onClick={() => removeShape(shape.id)}
      />
    )}
  </ul>
)

export default ShapeList