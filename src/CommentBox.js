import React , {Component} from 'react';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
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
        this.handleCommentUpdate = this.handleCommentUpdate.bind(this);
        this.handleCommentDelete = this.handleCommentDelete.bind(this);
    }

    loadCommentFromServer()
    {
        axios.get(this.props.url)
        .then(res =>{
            this.setState({data:res.data});
        });
    }

    handleCommentSubmit(comment){
        let comments = this.state.data;
         comment._id = Date.now();
        let newComments = comments.concat([comment]);
         this.setState({date : newComments});
        axios.post(this.props.url,comment)
            .catch(err =>{
                console.error(err);
                this.setState({data:comments});
            });
    }

    handleCommentUpdate(id,comment){

        axios.put(`${this.props.url}/${id}`,comment)
            .catch(err =>{
                console.error(err);
            });
    }

    handleCommentDelete(id){

        axios.delete(`${this.props.url}/${id}`)
            .catch(err => {
                console.error(err);
            });
    }

    componentDidMount(){
        this.loadCommentFromServer();
        setInterval(this.loadCommentFromServer,this.props.pollInterval);
    }


    render() {
        return (
            <div style =  {style.commentBox}>
                <h2>Comments</h2>
                <CommentList onCommentDelete = {this.handleCommentDelete} onCommentUpdate = {this.handleCommentUpdate} data = {this.state.data}/>
                <CommentForm onCommentSubmit={ this.handleCommentSubmit }/>
                </div>
        )
    }
}

export default CommentBox;