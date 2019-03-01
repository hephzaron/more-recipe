import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node.isRequired
};

/**
 * App component
 *
 * @returns {JSX} JSX
 *
 * @param {object} props - component props
*/
const App = ({ children }) => (
  <div>
    <div id="loader">
        <div>
            <div className="loader spin"/>
            <p>Loading...</p>
        </div>
    </div>
    {children}
  </div>
);

App.propTypes = propTypes;
export default App;
