import React , {Component} from 'react';
import CommentList from './CommentList';
import CommentFrom from './CommentForm';
import DATA from './data';
import style from './style';


class CommentBox extends Component
{
    constructor(props){
        super(props);
        this.state = {
            data :[]
        };
    }


    render() {
        return (
            <div style =  {style.commentBox}>
                <h2>Comments</h2>
                <CommentList data = {DATA}/>
                <CommentFrom/>
                </div>
        )
    }
}

export default CommentBox;