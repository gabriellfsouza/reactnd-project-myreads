import React from 'react';
import ButtonLink from './ButtonLink';
import * as BooksAPI from './BooksAPI'
import Book from './Book';


class SearchBooks extends React.Component{

    state = {
      books : []
    }

    /**
     * Lógica para realizar a busca, incluindo a propriedade shelf no objeto book após a função de busca.
     * @param {Object} e evento de mudança, aplicado no campo de busca
     */
    searchChange = (e)=>{

      const query = e.currentTarget.value;
      
      if(query){
        let allBooksShelves = []
        ,   allBooksSearch = [];

        BooksAPI.getAll().then(books=>{
          allBooksShelves = books;
          return BooksAPI.search(query);
        })
        .then(result=>{
          let books = [];
          if (!result.error) books = result;
          allBooksSearch = books;
          return Promise
          .resolve(allBooksSearch.map(book => {
              let bsf = allBooksShelves.find(bs=>bs.id===book.id);
              book.shelf = (bsf) ? bsf.shelf : 'none';
              return book;
            })
          );
        })
        .then((books)=>{
          this.setState({books});
        });
      }else{
          this.setState({books:[]});
      }

      
    }

    /**
     * Função utilizada para forçar a renderização da página.
     */
    bookRender = ()=>{
      this.setState(currentState=>currentState);
    }

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
                <input type="text" placeholder="Search by title or author" onChange={this.searchChange}/>

              </div>
            </div> 

            <div className="search-books-results">
              <ol className="books-grid">{books.map(book=>(
                <li key={book.id}>
                  
                    <Book 
                    fnRender={this.bookRender}
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