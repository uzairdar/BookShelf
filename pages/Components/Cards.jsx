import React,{useState,useEffect} from 'react'
import {
    CardText,
    CardSubtitle,
    Card,
    CardBody,
    Dropdown, DropdownToggle, DropdownMenu, DropdownItem,
    CardTitle,
    Button,
  } from 'reactstrap';
import { changeBookStatus, deleteBook } from '../services/bookService';

import { connect } from "react-redux";
import { loadUser, setBookData } from '../redux/ActionCreators';
import AddBooks from './AddBooks';
function Cards(props) {
    const {book,getUser}=props
    const [openDrop,setOpenDrop]=useState(false)
    const title = book.status === "plan"
      ? "Plan to read"
      : book.status === "reading"
      ? "Reading"
      : book.status === "complete"
      ? "Completed"
      : "";
    function toggle() {
        setOpenDrop(!openDrop)
      }
    const changeStatus=(status)=>{
        changeBookStatus(book._id,{status})
        .then(response=>{
            if(response.data){
                getUser()
            }
        })
        .catch(err=>{
            console.log("err",err)
        })
    }
    const deleteRecord=()=>{
        deleteBook(book?._id)
        .then(response=>{
            if(response.data){
                getUser()
            }
        })
        .catch(err=>{
            console.log("err",err)
        })
    }
  return (
    <Card className="mb-3 mt-3 ml-3 mr-3" 
    >
        <CardBody>
        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
            <Dropdown isOpen={openDrop} toggle={toggle} size="sm">
            <DropdownToggle caret className="mb-2">
            Change Category
            </DropdownToggle>
            <DropdownMenu>
                {book.status!="plan" && <DropdownItem onClick={()=>changeStatus("plan")}>Plan to read</DropdownItem>}
                {book.status!="reading" && <DropdownItem onClick={()=>changeStatus("reading")}>Reading</DropdownItem>}
                {book.status!="complete" && <DropdownItem onClick={()=>changeStatus("complete")}>Completed</DropdownItem>}
            </DropdownMenu>
            </Dropdown>
        </div>
            <CardTitle ><h5 className="hovered">{book.title}</h5></CardTitle>
            <CardSubtitle className="mb-2">Author Name: {book.authorname} </CardSubtitle>
            <CardText >Publication House: {book.publicationH}</CardText>
            <CardText >  Publication Year: {book.publicationY} </CardText>
            <CardText > Publication Date: {book.publicationD} </CardText>
            <CardText > Genre: {book.genre} </CardText>
            <CardText> <p className="text-muted">{title}</p></CardText>
            <div style={{display: 'flex',justifyContent:"space-between"}}>
            <Button color="primary" onClick={()=>deleteRecord()}>Delete</Button>
            <AddBooks edit={true} book={book}/>
            </div>
        </CardBody>
    </Card>
  )
}
const mapStateToProps = (state) => {
    // console.log("state", state);
    const { user } = state;
    return { user };
  };
const mapDispatchToProps = (dispatch) => {
    return {
        getUser: () => dispatch(loadUser()),
    };
  }
export default connect(mapStateToProps,mapDispatchToProps)(Cards)