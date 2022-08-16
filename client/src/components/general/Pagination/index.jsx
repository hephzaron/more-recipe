/* eslint-disable react/no-did-update-set-state */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAngleDoubleLeft,
    faAngleDoubleRight
} from "@fortawesome/free-solid-svg-icons";
import { connect } from 'react-redux';
import { fetchRecipes } from '../../../actions/recipeActions';
import { setPage, setFetchedPages } from '../../../actions/paginationActions';

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
            currentPage: 1,
            recipePages: {},
            offset: 8
        };
        this.setSelectedPage = this.setSelectedPage.bind(this);
    }

    /**
     * Sets up pagination
     * @method componentDidMount
     * @memberof Pagination
     * @param {null} void
     * @returns { null }  void
     */
    componentDidMount() {
        const { recipePages, recipes } = this.props;
        this.props.dispatch(setFetchedPages(recipes, recipePages['0'], 8));
        this.setState({ recipePages });
    }

    /**
     * Sets up pagination
     * @method componentDidUpdate
     * @memberof Pagination
     * @param {object} prevProps
     * @returns { null }  void
     */
    componentDidUpdate(prevProps) {
        const { recipePages } = prevProps;
        const { recipes, currentPage } = this.props;
        if (currentPage === recipePages['4'] + 1) {
            this.props.dispatch(setFetchedPages(recipes, currentPage, 8));
            this.setState({ recipePages });
        }
    }

    /**
     * Brings up the selected page to the view of the user
     * @method setSelectedPage
     * @memberof Pagination
     * @param {integer} pageNumber
     * @returns { null }  void
     */
    setSelectedPage(pageNumber) {
        const { recipePages, currentPage } = this.props;
        if (Object.keys(recipePages).length === 5 &&
            recipePages['4'] === currentPage &&
            pageNumber >= recipePages['4']) {
            this.props.dispatch(fetchRecipes(Object.keys(recipePages).length * 8));
        }
        this.props.dispatch(setPage(pageNumber));
        this.setState({ currentPage: pageNumber });
    }

    /**
     * Renders Pagination omponent
     * @method render
     * @memberof Pagination
     * @param {null} void
     * @returns { JSX }  JSX component
     */
    render() {
        const { recipePages, currentPage } = this.props;
        return (
            <div className="pagination">
                <ul>
                    <li><a onClick={() => this.setSelectedPage(currentPage - 1)}>
                        <FontAwesomeIcon icon={faAngleDoubleLeft}/></a>
                    </li>
                    {
                        recipePages && Object.entries(recipePages).map(([recipeIndex, pageNumber]) => (
                            <li key={`${pageNumber}`}
                                className={`${pageNumber === recipePages[`${currentPage - 1}`] ? 'active' : ''}`}>
                               <a onClick={() => this.setSelectedPage(parseInt(recipeIndex, 10) + 1)}>{ pageNumber }</a>
                            </li>
                        ))
                    }
                    <li><a onClick={() => this.setSelectedPage(currentPage + 1)}>
                        <FontAwesomeIcon icon={faAngleDoubleRight}/></a>
                    </li>
                </ul>
            </div>);
    }
}

Pagination.propTypes = {
    recipePages: PropTypes.object,
    currentPage: PropTypes.number,
    dispatch: PropTypes.func,
    recipes: PropTypes.array
};

const mapStateToProps = (state) => ({
    recipes: state.recipeReducer.recipes,
    recipePages: state.paginationReducer.recipePages,
    currentPage: state.paginationReducer.currentPage
  });

export default connect(mapStateToProps)(Pagination);
