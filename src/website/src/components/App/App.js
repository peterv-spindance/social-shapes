import React from 'react';

import AddShape from '../../containers/AddShape';
import FilteredShapeList from '../../containers/FilteredShapeList';
import Footer from './Footer/Footer';

const App = ({ match: { params } }) => {
  return (
    <div>
      <AddShape />
      <FilteredShapeList filter={params.filter || 'SHOW_ALL'} />
      <Footer />
    </div>
  )
}

export default App;