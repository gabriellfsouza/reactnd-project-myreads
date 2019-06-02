import React from 'react';
import ButtonLink from './ButtonLink';
import * as BooksAPI from './BooksAPI'
import Book from './Book';
import debounce from 'lodash.debounce'


class SearchBooks extends React.Component{

    state = {
      books : []
    }

    /**
     * Lógica para realizar a busca, incluindo a propriedade shelf no objeto book após a função de busca.
     * @param {Object} e evento de mudança, aplicado no campo de busca
     */
    searchChange = (currentTarget) => {
      const query = currentTarget.value;

      let allBooksShelves = []

      BooksAPI.getAll().then(books => {
          allBooksShelves = books;
          return BooksAPI.search(query);
      }).then(result => {
          const allBooksSearch = (result && !result.error) ? result : [];
          return Promise
              .resolve(allBooksSearch.map(book => {
                  let bsf = allBooksShelves.find(bs => bs.id === book.id);
                  book.shelf = (bsf) ? bsf.shelf : 'none';
                  return book;
              })
          );
      }).then((books) => {
          this.setState({ books });
      })
  }

    handleOnchange = (e)=>{
      //const {value = ''} = e.currentTarget;
      const {currentTarget} = e;
      this.debouncedSearchChange(currentTarget);
    }

    debouncedSearchChange = debounce((currentTarget)=>{
      debugger;
      return this.searchChange(currentTarget)
    },500)


    render(){
        const {books} = this.state;
        
        return(
            <div className="search-books">
            <div className="search-books-bar">
              <ButtonLink className="close-search" to='/'>Close</ButtonLink>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input 
                  type="search" 
                  placeholder="Search by title or author" 
                  autoFocus
                  onMouseUp={this.handleOnchange}
                  
                  onChange={this.handleOnchange}
                />
              </div>
            </div> 

            <div className="search-books-results">
              <ol className="books-grid">{books.map(book=>(
                <li key={book.id}>
                  
                    <Book 
                    book={book}
                  />
                </li>
              ))}</ol>
            </div>
          </div>
        );
    }
}

export default SearchBooks;