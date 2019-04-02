import React from 'react';
import PropTypes from 'prop-types';

import Book from './Book';

class Bookshelf extends React.Component{

    static propTypes = {
        books : PropTypes.array.isRequired,
        fnRender : PropTypes.func.isRequired,
        title : PropTypes.string.isRequired
    }

    render(){
        const {title,books,fnRender} = this.props;

        return(
            <div className="bookshelf">
                <h2 className="bookshelf-title">{title}</h2>
                <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.map(book=>(
                        <li key={book.id}>
                            <Book 
                                book={book}
                                fnRender={fnRender}
                                
                                
                            />
                        </li>
                    ))}
                </ol>
                </div>
            </div>
        );
    }
}

export default Bookshelf;