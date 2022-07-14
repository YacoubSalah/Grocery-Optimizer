import React, { useEffect } from 'react'
import { observer, inject } from 'mobx-react'
import { Button, Snackbar } from '@mui/material';
import { Rating } from 'react-simple-star-rating';

import './post_form.css';

const PostForum = inject("store")(observer((props) => {
 
    useEffect(() => {

        props.store.getProductsNameList()

        props.store.getStoresNameList()

        props.store.getStoresLocationList()

    }, [props.store])

    return (
        <div className="Form">

            <Snackbar
                message={props.store.clickOnAddPost ? "post was added successfully" : "post store failed"}
                autoHideDuration={2000}
                open={props.store.addPostStatus}
                onClose={props.store.closeSnackbar}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}
            />

            <label>Select Store</label>
            <select name="storeName" onChange={props.store.handelInputs} defaultValue={'default'}>
                <option value="">Choose a Store...</option>
                {props.store.storesNameList.map(store => {
                    return (
                        <option key={store} value={store}>{store}</option>
                    )
                })}
            </select>

            <label>Select City</label>
            <select name="storeLocation" onChange={props.store.handelInputs} defaultValue={'default'}>
                <option value="" >Choose a Location...</option>
                {props.store.storesLocationList.map(city => {
                    return (
                        <option key={city} value={city}>{city}</option>
                    )
                })}
            </select>

            <label>Product Name</label>
            <select name="productName" onChange={props.store.handelInputs} defaultValue={'default'}>
                <option value="" >Choose a Product...</option>
                {props.store.productsNameList.map(product => {
                    return (
                        <option key={product} value={product}>{product}</option>
                    )
                })}
            </select>

            <div className="PriceAndScore">

                <div className="priceDiv">
                    <label>Price</label>
                    <input name="price" onChange={props.store.handelInputs} type='number' />
                </div>

                <div className="scoreDiv">
                    <div>Score</div>
                    <div>
                        <Rating name="score" onClick={props.store.handelScore} ratingValue={props.store.score * 20} />
                    </div>
                </div>

            </div>

            <div className="DescriptionAndImage">

                <div className="textArea">
                    <label>Note</label>
                    <textarea name="note" onChange={props.store.handelInputs} className="textarea" placeholder="Enter Note here" form="usrform"></textarea>
                </div>

                <div className="AddIMage">
                    <label>Upload Image</label>
                    
                    <img src={props.store.imageUrl} sx={{ width: 150, height: 150 }} alt='no pics' />
                    <input type="file" onChange={props.store.handleImageChange} />
                       
                </div>

            </div>

            <Button onClick={props.store.handelAddClick} className="addPostButton">Add Post</Button>
            
        </div>
    )

}))

export default PostForum