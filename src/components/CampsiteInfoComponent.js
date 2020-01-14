import React,{ Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle,Breadcrumb,BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

class CampsiteInfo extends Component {

    renderCampsite(campsite) {
        return (
            <div  className="col-md-5 m-1">
                    <Card>
                      <CardImg top src={this.props.campsite.image} alt={this.props.campsite.name} />
                        <CardBody>

                            <CardText>{this.props.campsite.description}</CardText>
                        </CardBody>
                    </Card>
                    </div>

        );

    }
    renderComments(comments) {
    
        if (comments) {
                return (
                    <div className="col-md-5 m-1">
                        <h4>Comments</h4>
                        {
                            comments.map(comment => <div key={comment.id}>{comment.text}
                                                                         <p>--{comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                           </div> )
                        }
                    </div>

        );
                }
    }
    
        render() {

            if(this.props.campsite) {
                return (
                
                    <div className="container">
                        <div className="row">
                             <div className="col">
                               <Breadcrumb>
                                  <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                                    <BreadcrumbItem active>{this.props.campsite.name}</BreadcrumbItem>
                               </Breadcrumb>
                        <h2>{this.props.campsite.name}</h2>
                        <hr />
                    </div>
                </div>
                    <div className="row">
                       {this.renderCampsite(this.props.campsite)} 
                       {this.renderComments(this.props.comments)}
                    </div>
                    </div>
                    
                   
                );
            }
            return <div />;
    }


}
export default CampsiteInfo;