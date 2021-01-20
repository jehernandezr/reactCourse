import React, { Component } from "react";
import {
    Card,
    CardImg,
    CardImgOverlay,
    CardText,
    CardBody,
    CardTitle,
} from "reactstrap";

class DishDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dish: this.props.dish,
        };
    }

    renderDish(dish) {
        if (dish != null)
            return (
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <Card key={dish.id}>
                            <CardImg top src={dish.image} alt={dish.name} />
                            <CardBody>
                                <CardTitle>{dish.name}</CardTitle>
                                <CardText>{dish.description}</CardText>
                            </CardBody>
                        </Card>
                    </div>
                    {this.renderComments(this.props.dish.comments)}
                </div>
            );
        else
            return (
                <div></div>
            );
    }
    renderComments(comments) {
        if (comments != null) {
            const come = comments.map((comment) => {
                return (
                    <dl key={comment.id} className="unstyled-list">
                        <dd>{comment.comment}</dd>
                        <dd>-- {comment.author}, {(new Date (comment.date)).toLocaleDateString('en-US',{month:"short",year:"numeric",day:"numeric"})}</dd>
                    </dl>
                );
            });
            return (
                <div className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    {come}
                </div>
            );
        }
        else
            return (
                <div></div>
            );
    }
    render() {

        return (
            this.renderDish(this.props.dish)
        );
    }
}

export default DishDetail;
