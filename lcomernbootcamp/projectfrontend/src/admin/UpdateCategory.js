import React, {useState, useEffect} from 'react';
import Base from '../core/Base';
import {Link} from 'react-router-dom';
import { getCategories, getProduct, updateCategory, getCategory } from './helper/adminapicall';
import {isAuthenticated} from "../auth/helper/index";



const UpdateCategory =({match}) => {

    const {user, token} = isAuthenticated();

    const [names, setNames] = useState(""); 
    const [errors, setErrors] = useState(false);
    const [success, setSuccess] = useState(false);
    const [createdCategory, setcreatedCategory] = useState("");
    
    // const preload = (categoryId) => {
    //     getCategory(categoryId).then(data => {
    //         console.log("data inside getcategory");
    //         console.log(data);
    //         if (data.error){
               
    //             setState({ 
    //             
    //             errors: data.error
    //             })
    //         } else {
    //            
    //            preloadCategories()
    //            // console.log("CATE:", categories);
    //         }
    //     });
    // };

    // useEffect(() => {
    //    preload(match.params.categoryId);
    // }, []);



    const onSubmit = (event) => {
        event.preventDefault();
        setErrors("");
        updateCategory(match.params.categoryId,user._id, token, {names})
        .then(data => {
            if(data.error){
                setErrors(true)
            }else {
                setErrors("");

               setSuccess(true);
                setNames("");
            }
        });
       
     }

    const handleChange = (event) => {
        setErrors("");
        setNames(event.target.value);
       
        
    };



    //todo
    const successMessage = () => {
    return <div className="alert alert-success mt-3" 
        style={{display: (success == true)? "": "none"}}>
        <h4>{createdCategory} Category Updated Successfully</h4>
        </div>

    }

    const updateCategoryForm = () => (
      <div>
        <form >
          <div className="form-group">
           <p className="lead">Change Category Name</p>
            <input type="text"
              onChange={handleChange}
              name="photo"
              className="form-control"
              placeholder="Name"
              value={names}
            />
          </div>
          
                
          
          <button type="submit" onClick={onSubmit} className="btn btn-outline-success mb-3">
            Update Category
          </button>
        </form>
        </div>
      );



    return (
        <Base
        title="Rename a Category here!"
        description="Welcome to Update Category section"
        className="container bg-info p-4"
        >
        <Link to="/admin/dashboard"
        className = "btn btn-md btn-dark rounded mb-3">
        Admin Home
        </Link>
        <div className="row bg-dark text-white rounded">
            <div className="col-md-8 offset-md-2"> 
            {successMessage()}          
            {updateCategoryForm()}
            </div>
        </div>
            
        </Base>
    )
}


export default UpdateCategory;