import './post_form.css';
import { Rating } from 'react-simple-star-rating'
import { observer, inject } from 'mobx-react'
import { useEffect } from 'react';

const PostForum = inject("store")(observer((props) => {

    useEffect(() => {

        props.store.getProductsNameList()

        props.store.getStoresNameList()

        props.store.getStoresLocationList()

    }, [props.store])
    
    return (
        <div className="PostForm">
            <div className="Form">

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
                        <input type="file" id="img" name="img" accept="image/*" />
                    </div>

                </div>

                <button onClick={props.store.handelAddClick} className="addPostButton">Add Post</button>

            </div>
        </div>
    )

}))

export default PostForum