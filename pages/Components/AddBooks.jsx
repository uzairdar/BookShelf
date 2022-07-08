import React,{useState} from 'react'
import DatePicker from "react-datepicker";
import styles from "../../styles/Landing.module.css";
import { useForm } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "react-modal";
import {Button} from 'reactstrap'
import { addBook } from '../services/bookService';

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    width: "60vw",
    height: "80vh",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
function AddBooks(props) {
    const [startDate, setStartDate] = useState(new Date());
  const [modalIsOpen, setIsOpen] = useState(false);
  const {user}=props
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm();
  const onSubmit = (data) => {
      let bookData={
          ...data,
          status:"plan",
          publicationD:startDate,
          userId: user?._id
      };
    
        addBook(bookData)
      .then(res=>{
          if(res?.data){
            props.setCheck((previous)=>!previous)
            closeModal()
            reset()

          }
      })
      .catch(err=>{
          console.log("err",err)
      })
  }
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div>
        <Button onClick={openModal} color="primary">Add Book</Button>
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
        contentLabel="Example Modal"
      >
        <div style={{display: 'flex', justifyContent: 'space-between',alignItems: 'center'}}>
        <h2>Insert Book Details</h2>
        <button  onClick={closeModal}>close</button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} >
        <div className={styles.space}>
          <label>Title:</label>
          <input
            {...register("title", { required: true })}
            placeholder="Enter Title"
          />
          {errors.title?.type === "required" && (
            <p className={styles.errors}>Title is required</p>
          )}
        </div>
        <div className={styles.space}>
          <label>Author Name:</label>
          <input
            {...register("authorname", { required: true })}
            placeholder="Enter Author Name"
          />
          {errors.authorname?.type === "required" && (
            <p className={styles.errors}>Author Name is required</p>
          )}
        </div>
        <div className={styles.space}>
          <label>Publication House:</label>
          <input
            {...register("publicationH", { required: true })}
            placeholder="Enter Publication House"
          />
          {errors.publicationH?.type === "required" && (
            <p className={styles.errors}>Publication house is required</p>
          )}
        </div>
        <div className={styles.space}>
          <label>Publication Date:</label>
          <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
        </div>
        <div className={styles.space}>
          <label>Genre:</label>
          <input
            {...register("genre", { required: true })}
            placeholder="Enter Genre"
          />
          {errors.genre?.type === "required" && (
            <p className={styles.errors}>Genre is required</p>
          )}
        </div>
        <div className={styles.space}>
          <label>Publication Year:</label>
          <input
            {...register("publicationY", { required: true })}
            placeholder="Enter Publication Year"
          type="number"
          />
          {errors.publicationY?.type === "required" && (
            <p className={styles.errors}>Publication Year is required</p>
          )}
        </div>
        <input type="submit" value="ADD"/>
        </form>
      </Modal>
    </div>
  )
}

export default AddBooks