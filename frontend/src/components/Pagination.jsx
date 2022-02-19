import React from 'react'
import './Pagination.css'

const Pagination = ({numPage, pages, changePage}) => {
 

    let middlePagination;

    if (pages > 0  &&  pages <= 5 ) {
        middlePagination = [...Array( pages )]
            .map( ( _, idx ) => (
                <button
                    key={idx + 1}
                    onClick={() => changePage( idx + 1 )}
                    disabled={numPage === idx + 1}
                >
                    {idx + 1}
                </button>
            ) );
    } else {
        const startVal = Math.floor( ( numPage - 2 ) / 5 ) * 5 + 1;
        
        middlePagination = (
            <>
                {[...Array( 5 )].map( ( _, idx ) => (
                    <button 
                        key={startVal + idx + 1}
                        disabled={numPage === startVal + idx + 1}
                        onClick={() => changePage( startVal + idx + 1 )}

                    >
                        {startVal + idx + 1}
                    </button>
                ) )}
                
                <button>
                        ...
                </button>

                <button onClick={() =>changePage(pages)}>
                    {pages}
                </button>
            </>
        )

        if ( numPage > 5 ) {
            if ( pages - numPage > 5 ) {
                middlePagination = (
                    <>
                        <button
                            onClick={() => changePage( 1 )}
                        >
                            1
                        </button>
                        <button>
                            ...
                        </button>
                        <button
                            onClick={() => changePage( startVal )}>
                            {startVal}
                        </button>

                {[...Array( 5 )].map( ( _, idx ) => (
                    <button 
                        key={startVal + idx + 1}
                        disabled={numPage === startVal + idx + 1}
                        onClick={() => changePage( startVal + idx + 1 )}

                    >
                        {startVal + idx + 1}
                    </button>
                ) )}
                
                <button>
                        ...
                </button>

                <button onClick={() =>changePage(pages)}>
                    {pages}
                </button>
            </>
        )
            } else {

                let amountLeft = pages - numPage + 5;

                middlePagination = (
                    
                     <>
                        <button
                            onClick={() => changePage( 1 )}
                        >
                            1
                        </button>
                        <button>
                            ...
                        </button>
                        <button
                            onClick={() => changePage( startVal )}>
                            {startVal}
                        </button>

                {[...Array( amountLeft )].map( ( _, idx ) => (
                    <button 
                        key={startVal + idx + 1}
                        style={pages < startVal + idx + 1 ? {display: 'none'} : null}
                        disabled={numPage === startVal + idx + 1}
                        onClick={() => changePage( startVal + idx + 1 )}

                    >
                        {startVal + idx + 1}
                    </button>
                ) )}
                
               
                    </>
                    
                    )

            }
        }
      
    }

    return pages > 1 && (
        <div className="pagination">
            <button
                className="pahination__prev"
                onClick={() => changePage( numPage - 1 )}
                disabled={numPage === 1}
            >
                &#171;
            </button>
            {middlePagination}
            
            <button
                className="pahination__next"
                onClick={() => changePage( numPage + 1 )}
                disabled={numPage === pages}
            >
                &#187;
            </button>
        </div>
    )
}

export default Pagination