import React from 'react';

import * as BooksAPI from './BooksAPI';
import * as Utils from './Utils';
import Bookshelf from './Bookshelf';
import ButtonLink from './ButtonLink';


class MyReads extends React.Component{
    
  state = {
    bookshelves:[]
  }

  /**
   * Executa operação para carregar os livros antes de iniciar o componente.
   */
  componentDidMount(){
    this.bookRender();
  }

  /**
   * Carrega a lista de livros
   */
  bookRender = ()=>{
    BooksAPI.getAll().then((books) =>{
      this.setState({bookshelves:this.separaEstantes(books)});
    });
  };
  
  /**
   * Organiza os livros informados de acordo com a sua estante.
   * @param {Array} books array de livros
   */
  separaEstantes = (books)=>{
    
    const elements = Utils.bookshelves.filter(bookshelf=>bookshelf.id !== "none");/*[
      {title:'Currently Reading',id:'currentlyReading'},
      {title:'Want to Read',id:'wantToRead'},
      {title:'Read',id:'read'},
    ];*/

    const bookshelves = elements.map(element=>{
      const {title,id} = element;
      return {title,id, books:books.filter(book=> element.id === book.shelf)};
    });

    return bookshelves;
  }

  render(){
      const {bookshelves} = this.state;

      return(
          <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              {bookshelves.map(bookshelf=>(
                <Bookshelf 
                  title={bookshelf.title}
                  books={bookshelf.books}
                  fnRender={this.bookRender}

                  key={bookshelf.id}
                />
              ))}
            </div>
          </div>
          <div className="open-search">
            <ButtonLink to="/search">Add a book</ButtonLink>
          </div>
        </div>
      );
  }
}

export default MyReads;