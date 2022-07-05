import './post_form.css';
import { Rating } from 'react-simple-star-rating'
import { observer, inject } from 'mobx-react'

const PostForum = inject("store")(observer((props) => {
    return (
        <div className="PostForm">
            <div className="Form">

                <label for="country">Select Store</label>
                <select onChange={props.store.handelInputs} name="storeName">
                    <option value="Basem">Basem</option>
                    <option value="Yacoubs">Yacoubs</option>
                    <option value="USA">USA</option>
                </select>

                <label for="country">Select City</label>
                <select onChange={props.store.handelInputs} name="cityName">
                    <option value="Australia">Australia</option>
                    <option value="Jerusalem">Jerusalem</option>
                    <option value="USA">USA</option>
                </select>
                <div>
                    <label>item Name</label>
                    <input onChange={props.store.handelInputs} name="itemName" className='productNameInput'  />
                </div>
                <div className="PriceAndScore">
                    <div className="priceDiv">
                        <label>Price</label>
                        <input onChange={props.store.handelInputs} type='number' name="price" />
                    </div>
                    <div className="scoreDiv">
                        <div>Score</div>
                        <div>
                           <Rating onClick={props.store.handelInputs} name="score" ratingValue={props.store.score}/>
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