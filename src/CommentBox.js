import React , {Component} from 'react';
import CommentList from './CommentList';
import CommentFrom from './CommentForm';
import style from './style';
import axios from 'axios';


class CommentBox extends Component
{
    constructor(props){
        super(props);
        this.state = {
            data :[]
        };
        this.loadCommentFromServer = this.loadCommentFromServer.bind(this);
        this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    }

    loadCommentFromServer()
    {
        axios.get(this.props.url)
        .then(res =>{
            this.setState({data:res.data});
        })
    }

    handleCommentSubmit(){
        //let me come back here later
    }

    componentDidMount(){
        this.loadCommentFromServer();
        setInterval(this.loadCommentFromServer,this.props.pollInterval);
    }


    render() {
        return (
            <div style =  {style.commentBox}>
                <h2>Comments</h2>
                <CommentList data = {this.state.data}/>
                <CommentFrom/>
                </div>
        )
    }
}

export default CommentBox;