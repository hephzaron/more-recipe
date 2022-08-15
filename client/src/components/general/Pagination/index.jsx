/* eslint-disable react/no-did-update-set-state */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleLeft, faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
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
            recipePages: [],
            offset: 8
        };
        this.setSelectedPage = this.setSelectedPage.bind(this);
        this.setFetchedRecipePages = this.setFetchedRecipePages.bind(this);
    }

    /**
     * Sets up pagination
     * @method componentDidMount
     * @memberof Pagination
     * @param {null} void
     * @returns { null }  void
     */
    componentDidMount() {
        this.props.dispatch(setFetchedPages(this.props.recipes, 1, 8));
        const { recipePages } = this.props;
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
        if (this.props.recipePages !== prevProps.recipePages) {
            const { recipePages, currentPage } = this.props;
            this.setState({ recipePages, currentPage });
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
        if (this.props.recipePages.includes(pageNumber)) {
            this.props.dispatch(setPage(pageNumber));
        }
    }

    /**
     * Sets pages fetched from the backend
     * @method setSelectedPage
     * @memberof Pagination
     * @param {null} void
     * @returns { null }  void
     */
    setFetchedRecipePages() {
        const { recipes, recipePages } = this.props;
        const beginAt = recipePages[recipePages.length - 1];
        this.props.dispatch(setFetchedPages(recipes, beginAt, 8));
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
                    <li><a>First</a></li>
                    <li><a onClick={() => this.setSelectedPage(currentPage - 1)}>
                        <FontAwesomeIcon icon={faAngleDoubleLeft}/></a>
                    </li>
                    {
                        recipePages && recipePages.map(pageNumber => (
                            <li key={`${pageNumber}`}
                                className={`${pageNumber === currentPage ? 'active' : ''}`}>
                                    <a onClick={() => this.setSelectedPage(pageNumber)}>{ pageNumber }</a>
                            </li>
                        ))
                    }
                    <li><a onClick={() => this.setSelectedPage(currentPage + 1)}>
                        <FontAwesomeIcon icon={faAngleDoubleRight}/></a>
                    </li>
                    <li><a>Last</a></li>
                </ul>
            </div>);
    }
}

Pagination.propTypes = {
    recipePages: PropTypes.array,
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
