import React,{Component} from 'react';
import PropTypes from 'prop-types';

class Image extends Component{
    state = {
        dimensions : {}
    }

    static propTypes = {
        src : PropTypes.string
    }

    /**
     * Atualiza o estado da imagem com dados da imagem carregada.
     * @param {Event} e evento contendo o objeto da imagem
     */
    onImageLoad = ({target:img})=>{
        //debugger;
        const {width,height} = img;

        this.setState({dimensions:{width,height}});
    }

    render(){
        const {src} = this.props;
        const {width,height} = this.state.dimensions;

        return (
            <div className='book-cover' style={{width,height,backgroundImage: `url("${src}")`}}>
                {src && <img 
                    onLoad={this.onImageLoad} src={src}  
                    style={{display:'none'}}
                    alt = ''
                />}
            </div>
        );
    }
}

export default Image;