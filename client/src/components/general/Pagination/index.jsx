/* eslint-disable react/no-did-update-set-state */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAngleDoubleLeft,
    faAngleDoubleRight,
    faAngleLeft,
    faAngleRight
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
            recipePages: [],
            offset: 8
        };
        this.setSelectedPage = this.setSelectedPage.bind(this);
        this.getNextPagesOfRecipes = this.getNextPagesOfRecipes.bind(this);
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
            this.setState({ currentPage: pageNumber });
        }
    }

    /**
     * fetch Next Recipes
     * @method fetchNextRecipes
     * @memberof Pagination
     * @param {bool} prev
     * @returns { null }  void
     */
    fetchNextRecipes(prev) {
        const { recipes } = this.props;
        const offset = recipes.length;
        this.props.dispatch(fetchRecipes(offset));
    }

    /**
     * Sets pages fetched from the backend
     * @method getNextPagesOfRecipes
     * @memberof Pagination
     * @param {bool} prev
     * @returns { null }  void
     */
    getNextPagesOfRecipes(prev = false) {
        const { recipes, recipePages } = this.props;
        let beginAt = 1;
        if (recipes !== []) {
            beginAt = recipePages[recipePages.length - 1] + 1;
        }
        if (prev && (recipePages[0] > 1)) {
            beginAt = recipePages[0] - 4;
        }
        this.props.dispatch(setFetchedPages(recipes, beginAt, 8));
        this.props.dispatch(setPage(beginAt));
        this.setState({ currentPage: beginAt });
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
                    <li><a onClick={() => this.getNextPagesOfRecipes(true)}>
                        <FontAwesomeIcon icon={faAngleDoubleLeft}/></a>
                    </li>
                    <li><a onClick={() => this.setSelectedPage(currentPage - 1)}>
                        <FontAwesomeIcon icon={faAngleLeft}/></a>
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
                        <FontAwesomeIcon icon={faAngleRight}/></a>
                    </li>
                    <li><a onClick={() => this.getNextPagesOfRecipes()}>
                        <FontAwesomeIcon icon={faAngleDoubleRight}/></a>
                    </li>
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
