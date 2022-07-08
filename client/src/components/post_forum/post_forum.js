import './post_form.css';
import { Rating } from 'react-simple-star-rating'
import { observer, inject } from 'mobx-react'
import { useEffect } from 'react';

const PostForum = inject("store")(observer((props) => {

    useEffect(() => {

        props.store.getProductsNameList() //initialize stores names

        props.store.getStoresNameList()  //initialize stores Loocations

        props.store.getStoresLocationList() //initialize products

    }, [props.store])      //should be empty array if OnMount


    return (
        <div className="PostForm">
            <div className="Form">

                <label>Select Store</label>
                <select onChange={props.store.handelInputs} name="storeName" defaultValue={'default'}>
                    <option value="">Choose a Store...</option>
                    {props.store.storesNameList.map(store => {
                        return (
                            <option key={store} value={store}>{store}</option>
                        )
                    })}
                </select>

                <label>Select City</label>
                <select onChange={props.store.handelInputs} name="storeLocation" defaultValue={'default'}>
                    <option value="" >Choose a Location...</option>
                    {props.store.storesLocationList.map(city => {
                        return (
                            <option key={city} value={city}>{city}</option>
                        )
                    })}
                </select>

                <label>Product Name</label>
                <select onChange={props.store.handelInputs} name="productName" defaultValue={'default'}>
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
                        <input onChange={props.store.handelInputs} type='number' name="price" />
                    </div>

                    <div className="scoreDiv">
                        <div>Score</div>
                        <div>
                            <Rating onClick={props.store.handelInputs} name="score" ratingValue={props.store.score} />
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
                        <input type="file" id="img" name="img" accept="image/*" />
                    </div>

                </div>

                <button onClick={props.store.handelAddClick} className="addPostButton">Add Post</button>

            </div>
        </div>
    )
}))

export default PostForum