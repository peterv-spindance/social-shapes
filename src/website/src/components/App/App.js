import React from 'react';

import AddShape from '../../containers/AddShape';
import FilteredShapeList from '../../containers/FilteredShapeList';

const App = () => {
  return (
    <div>
      <AddShape />
      <FilteredShapeList />
    </div>
  );
}

export default App;