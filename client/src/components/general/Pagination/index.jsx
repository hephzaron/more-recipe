import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleLeft, faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";

/**
 * @class Pagination
 * @description It enables paginated view across a list
 * @extends React.Component
 * @return {JSX} JSX Element
 */
class Pagination extends Component {
    /**Creates an instance of Pagination component
     * @method constructor
     * @memberof Pagination
     * @param { object } props
     * @return { null } void
     */
    constructor(props) {
        super(props);
        this.state = {
            currentPages: [1, 2, 3, 4, 5],
            activePage: 1,
            pages: []
        };
    }

    /**
     * Renders Pagination omponent
     * @method render
     * @memberof Pagination
     * @param {null} void
     * @returns { JSX }  JSX component
     */
    render() {
        const { currentPages } = this.state;
        return (
            <div className="pagination">
                <ul>
                    <li><a>First</a></li>
                    <li><a><FontAwesomeIcon icon={faAngleDoubleLeft}/></a></li>
                    {
                        currentPages && currentPages.map(pageNumber => (
                            <li key={`${pageNumber}`}><a>{ pageNumber }</a></li>
                        ))
                    }
                    <li><a><FontAwesomeIcon icon={faAngleDoubleRight}/></a></li>
                    <li><a>Last</a></li>
                </ul>
            </div>);
    }
}

Pagination.propTypes = {};

export default Pagination;
