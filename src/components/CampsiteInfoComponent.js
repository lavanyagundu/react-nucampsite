import React,{ Component } from 'react';
import {Label,Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle,Breadcrumb,BreadcrumbItem,Button,Modal,ModalHeader, ModalBody  } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control,LocalForm,Errors } from 'react-redux-form';


const maxLength = len => val => !val || (val.length<=len);
const minLength = len => val => val && (val.length>=len);

class  CommentForm extends Component {
      constructor(props) {
          super(props);
          this.toggleModal=this.toggleModal.bind(this);
          this.handleSubmit = this.handleSubmit.bind(this);
          this.state = {
            isModalOpen:false
          };
      }
      toggleModal() {
        this.setState({isModalOpen:!this.state.isModalOpen});
    }
    
    handleSubmit(values) {

        this.toggleModal();
        this.props.addComment(this.props.campsiteId,values.rating,values.author,values.text);
        console.log('current state is:'+JSON.stringify(values));
        alert('current state is:'+JSON.stringify(values));
       
    }
    

    render() {
        return (
            <React.Fragment>
            <Button outline  onClick={this.toggleModal}>
                <i className="fa fa-pencil"></i>Submit Comment
                </Button>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                     <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                     <ModalBody>
                     <LocalForm onSubmit={values => this.handleSubmit(values)}>
                         <div className="group">
                         <Label htmlFor="rating">Rating</Label>
                         <Control.select model=".rating" id="rating" name="rating"
                                           className="form-control">
                                           
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                       </div>
                         <div className="group">
                         <Label htmlFor="author">Your Name</Label>
                         <Control.text id="author" model='.author' name="author" className="form-control"
                          validators = { {
                          
                            minLength:minLength(2),
                            maxLength:maxLength(15)
                            
                        } } />
                         <Errors
                                       className="text-danger"
                                       model=".author"
                                       show="touched"
                                       component="div"
                                       messages = {{
                                          
                                           minLength:"Must be atleast 2 characters ",
                                           maxLength:"Must be 15 characters or less"
                                       }}

                                       />

                         </div>
                         <div className="group">
                         <Label htmlFor="comment">Comment</Label>
                         <Control.textarea id="comment" model='.text' name="comment" rows="6" className="form-control" />
                         </div>
                         
                         <div className="group mt-4">
                                 
                         <Button type="submit" color="primary" >
                                        Submit
                                    </Button>
                     

                           </div>

                     </LocalForm>
                     </ModalBody>

          </Modal>
            </React.Fragment>
        )
    }

}

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
    renderComments(comments,addComment,campsiteId) {
    
        if (comments) {
                return (
                    <div className="col-md-5 m-1">
                        <h4>Comments</h4>
                        {
                            comments.map(comment => <div key={comment.id}>{comment.text}
                                                                         <p>--{comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                           </div> )
                        }
                        <CommentForm  campsiteId={campsiteId} addComment={addComment}  />
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
                       {this.renderComments(this.props.comments,this.props.addComment,this.props.campsite.id)}
                    </div>
                    </div>
                    
                   
                );
            }
            return <div />;
    }


}
export default CampsiteInfo;