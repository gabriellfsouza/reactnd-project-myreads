import React from 'react';
import PropTypes from 'prop-types'

import Image from './Image';

import * as Utils from './Utils';
import * as BooksAPI from './BooksAPI';


class Book extends React.Component{
    
    static propTypes = {
        book : PropTypes.object.isRequired,
        fnRender : PropTypes.func
    }

    state = {
        book:{}
    }

    componentDidMount(){
        const {book} = this.props;
        this.setState({book});
    }

    /**
     * Atualiza a estante em que o livro se encontra.
     * @param {Event} e 
     * @param {Object} book 
     * @param {Function} fnRender 
     */
    shelfChanger = (e,book,fnRender)=>{
        const id = e.currentTarget.value;
        
        this.setState({book:{...book,shelf:id}})
        debugger;
        BooksAPI.update(book,id)
        .then(result=>{
            //console.log(result);
            //debugger;
            return BooksAPI.get(book.id);
        })
        .then(book=>{
            if(fnRender) fnRender();
            //else this.setState({book});
        });
    };

    render(){
        const {book} = this.state;
        const {fnRender} = this.props;
        let {title,authors,imageLinks} = book;
        authors = authors || [];
        
        const {bookshelves} = Utils;
        //const obj = bookshelves.map(bs=>{return {value:bs.id,text:bs.title};});

        return (
            <div className="book">
                <div className="book-top">
                <Image src={imageLinks && imageLinks.smallThumbnail} />
                <div className="book-shelf-changer">
                <select onChange={e=>{this.shelfChanger(e,book,fnRender)}} value={book.shelf}>
                    <option value="move" disabled>Move to...</option>
                    {bookshelves.map(bs=>(
                        <option key={bs.id} value={bs.id}>{book.shelf === bs.id && '✔ '}{bs.title}</option>
                    ))};
                </select>
                </div>
                </div>
                <div className="book-title">{title}</div>
                <div className="book-authors">{authors.map((author)=>(<span key={author}>{author}<br /></span>))}</div>
            </div>
        );
    }
}

export default Book;