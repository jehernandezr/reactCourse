/* eslint-disable react/jsx-pascal-case */
import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, Row, Col, Label } from 'reactstrap';
import { LocalForm} from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { Control, Form, Errors, actions } from 'react-redux-form';

const  DishDetail =function (props) {
    if (props.isLoading) {
        return(
            <div className="container">
                <div className="row">            
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return(
            <div className="container">
                <div className="row">            
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.dish != null) {
        return (
            
            <div className="container">
            <div className="row">
                <Breadcrumb>

                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                </div>                
            </div>
            <div className="row">
            <RenderDish dish={props.dish} />
            <RenderComments comments={props.comments} 
            dishId={props.dish.id}
            addComment={props.addComment}/>
            </div>
            </div>
        );
      }
      else {
        return <div></div>
    }
    }

function RenderComments({comments, addComment, dishId}) {
    if (comments != null) {
        const come = comments.map((comment) => {
            return (
                <dl key={comment.id} className="unstyled-list">
                    <dd>{comment.comment}</dd>
                    <dd>-- {comment.author}, {new Intl.DateTimeFormat('en-US',
                    {year:'numeric',
                    month:'short',
                    day:'2-digit'}).format( new Date(Date.parse(comment.date)))}
                    </dd>
                </dl>
            );
        });
        return (
            <div className="col-12 col-md-6">
                <h4>Comments</h4>
                {come}
                <CommentForm dishId={dishId} addComment={addComment} />
            </div>
        );
    }
    else
        return (
            <div></div>
        );
}
    function RenderDish({dish}) {

            return (
                    <div className="col-12 col-md-6">
                        <Card key={dish.id}>
                            <CardImg top src={dish.image} alt={dish.name} />
                            <CardBody>
                                <CardTitle>{dish.name}</CardTitle>
                                <CardText>{dish.description}</CardText>
                            </CardBody>
                        </Card>
                    </div>
            );
    }

    
    
    const required = (val) => val && val.length;
    const maxLength = (len) => (val) => !(val) || (val.length <= len);
    const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {
    
        constructor(props) {
            super(props);
            this.toggleModal = this.toggleModal.bind(this);
            this.state = {
                isModalOpen: false
            };
        }
    
        toggleModal() {
            this.setState({
                isModalOpen: !this.state.isModalOpen
            });
        }
    
        handleSubmit(values) {
            this.toggleModal();
            this.props.addComment(this.props.dishId,values.rating,values.author,values.comment);
        }
    
    
        render() {
            return (
                <div> <Button outline onClick={this.toggleModal}><span className="fa fa-edit fa-lg"></span>Submit Comment</Button>
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                <Row className="form-group">
                                    <Label htmlFor="rating" md={12}>Rating</Label>
                                    <Col md={12}>
                                        <Control.select model=".rating" id="rating" name="rating"
                                            className="form-control">
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                            </Control.select>
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label md={12} htmlFor="yourname" >Your Name</Label>
                                    <Col md={12}>
                                        <Control.text model=".author" id="yourname" name="yourname"
                                            placeholder="Your Name"
                                            className="form-control"
                                            validators={{
                                                required, minLength: minLength(2), maxLength: maxLength(15)
                                            }}
                                        />
                                        <Errors
                                            className="text-danger"
                                            model=".author"
                                            show="touched"
                                            messages={{
                                                required: 'Required ',
                                                minLength: 'Must be greater than 2 characters',
                                                maxLength: 'Must be 15 characters or less'
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="message" md={12}>Comment</Label>
                                    <Col md={12}>
                                        <Control.textarea model=".comment" id="message" name="message"
                                            rows="12"
                                            className="form-control" />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Col>
                                        <Button type="submit" color="primary">Submit</Button>
                                    </Col>
                                </Row>
                            </LocalForm>
                        </ModalBody>
                    </Modal>
                </div>
    
            );
        }
    }
export default DishDetail;

