import React from 'react';
import { Link } from 'react-router-dom';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const IZPagination = ({ match, pdefault, arrPagination, clickPagination }) => {
    return(
        <Pagination className="iz-nav-pagination">

            { arrPagination.length > 1 &&
                <PaginationItem>
                    <Link className="page-link"
                        to= { pdefault === 0 
                                ? `${match.url}?p=1`
                                : `${match.url}?p=${pdefault}`
                            }
                        onClick={ clickPagination }
                        aria-label="Previous"
                    >
                        <span aria-hidden="true">‹</span>
                        <span className="sr-only">Previous</span>
                    </Link>
                </PaginationItem>    
            }
            
            { arrPagination.length > 0 && arrPagination.map( item =>
                <PaginationItem key={item} active={ ( pdefault === (item - 1) ) ? true : false }>
                    <Link className="page-link"
                        to={`${match.url}?p=${item}`}
                        onClick={ clickPagination }
                    >
                        { item }
                    </Link>
                </PaginationItem>
            )}
            
            { arrPagination.length > 1 &&
                <PaginationItem>
                    <Link className="page-link"
                        to= { pdefault === ( arrPagination.length - 1 )
                                ? `${match.url}?p=${arrPagination.length}`
                                : `${match.url}?p=${pdefault + 2}`
                            }
                        onClick={ clickPagination }
                        aria-label="Next"
                    >
                        <span aria-hidden="true">›</span>
                        <span className="sr-only">Next</span>
                    </Link>
                </PaginationItem>
            }

        </Pagination>
    )
}

export default IZPagination;