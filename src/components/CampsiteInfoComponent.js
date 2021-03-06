import React,{Component} from 'react';
import { Card,CardTitle, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem, Button,Label,Modal,ModalHeader, ModalBody} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm , Errors} from 'react-redux-form';


const required = val =>val && val.length;
const maxLength = len=>val=> !val || (val.length <= len)
const minLength = len => val => val && (val.length >= len);

class CommentForm extends Component{
    constructor(props){
        super(props);

        this.state = {
        
            isModalOpen: false
        }

       }
        
        toggleModal=()=>{
            this.setState({
                isModalOpen :!this.state.isModalOpen
            });
        }

        handleSubmit=(value)=>{
            this.toggleModal()
      alert(`Current state is ${JSON.stringify(value)}`)
        console.log(`Current state is ${JSON.stringify(value)}`)
        
           
        }
      
   
    render(){
        return(
           
            <div>
            <Button outline onClick={this.toggleModal}><i className="fa fa-pencil fa-lg"></i> Submit Comment</Button>
            <Modal  isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}> Submit Comment </ModalHeader>
            <ModalBody>
            <LocalForm onSubmit={(value)=>this.handleSubmit(value)} >
                <div className="form-group">
                    <Label htmlFor="rating">Rating</Label>
                            <Control.select model=".rating"
                            id="rating"
                            name="rating"
                            className="form-control"
                            
                            >
                                <option></option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option >4</option>
                                <option>5</option>
                            </Control.select>
                        </div>
                            <div className="form-group">
                                <Label htmlFor="author">Your Name</Label>
                                    <Control.text
                                    model=".author"
                                    id="author"
                                    name="author"
                                    className="form-control"
                                    validators={{
                                        required,
                                        minLength:minLength(2),
                                        maxLength:maxLength(15)
                                    }}
                                />
                                <Errors className="text-danger"
                                model=".author"
                                show="touched" 
                                component="div"
                                messages={{
                                    required:'Required',
                                    minLength:'Must be at least 2 characters',
                                    maxLength:'Must be 15 characters or less'
                                }}
                            />
                            </div>
                    <div className="form-group">
                        <Label htmlFor="text">Comment</Label>
                            <Control.textarea rows="6"
                            className="form-control"
                            model=".text"
                            id="text"
                            name="text"
                            
                            />
                        
                        </div>
                        <Button type="submit" value="submit" color="primary" >Submit</Button>
            </LocalForm>
            </ModalBody>
            </Modal>
            </div>
         
        )
    }
}
function RenderCampsite({campsite}){

   return(
       <div className="col-md-5 m-1">
            <Card>
                <CardImg top src={campsite.image} alt={campsite.name} />
                <CardBody>
                   
                    <CardText>{campsite.description} </CardText>
                
                </CardBody>
            </Card>
       
        </div>
        );
    
}

function RenderComments({comments}){
    if(comments){
   
    return(
       
        <div className="col-md-5 m-1">
        <h4>Comments</h4>
      {
            comments.map(comment=>{
            return (<div key={comment.id}>
            
                    <p>{comment.text}</p>
                    
                    <p>~~{comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                    
                </div>
               
                )
            })
        }
        <CommentForm/>
        </div>
           
    )
    }
}
    
function CampsiteInfo(props){
    if (props.campsite){
       
    return(
        <div class="container">
        <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <h2>{props.campsite.name}</h2>
                        <hr />
                    </div>
                </div>
            <div className="row">
                    <RenderCampsite campsite ={props.campsite} />
                    <RenderComments comments = {props.comments} />
            </div>
        </div>
    
            
        );
        }
            return <div/>
        }

       


export default CampsiteInfo;