import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleLeft, faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import usePagination from './PaginationCustomHook';
import { fetchRecipes } from '../../../actions/recipeActions';
import { setPage, setFetchedPages } from '../../../actions/paginationActions';

/**
 * @function Pagination
 * @description It enables paginated view across a list
 * @param {array} recipePages
 * @param {integer} currentPage
 * @returns {JSX} JSX Element
 */
const Pagination = () => {
    const { recipePages, currentPage, setSelectedPage } = usePagination({ fetchRecipes, setPage, setFetchedPages });
    const pageIndex = (currentPage > 0 && currentPage % 5 === 0) ? 5 : currentPage % 5;
    return (
        <div className="pagination">
            <ul>
                <li><a onClick={() => setSelectedPage(currentPage - 1)}>
                    <FontAwesomeIcon icon={faAngleDoubleLeft}/></a>
                </li>
                {
                    recipePages && Object.entries(recipePages).map(([_, pageNumber]) => (
                        <li key={`${pageNumber}`}
                            className={`${pageNumber === recipePages[`${pageIndex - 1}`] ? 'active' : ''}`}>
                        <a onClick={() => setSelectedPage(pageNumber)}>{ pageNumber }</a>
                        </li>
                    ))
                }
                <li><a onClick={() => setSelectedPage(currentPage + 1)}>
                    <FontAwesomeIcon icon={faAngleDoubleRight}/></a>
                </li>
            </ul>
        </div>
    );
};

export default Pagination;
