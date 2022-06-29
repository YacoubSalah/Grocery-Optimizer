import React from "react";
import './post_form.css';
import { AiFillStar } from 'react-icons/ai';
/* import { AiOutlineStar } from 'react-icons/ai' */


function postForum() {
    return (
        <div className="PostForm">
            <div className="Form">

                <label for="country">Select Store</label>
                <select id="country" name="country">
                    <option value="australia">Australia</option>
                    <option value="canada">Canada</option>
                    <option value="usa">USA</option>
                </select>

                <label for="country">Select City</label>
                <select id="country" name="country">
                    <option value="australia">Australia</option>
                    <option value="canada">Canada</option>
                    <option value="usa">USA</option>
                </select>
                <div className="PriceAndScore">
                    <div className="priceDiv">
                        <label>Price</label>
                        <input type='number' id="PriceInput" />
                    </div>
                    <div className="scoreDiv">
                        <div>Score</div>
                        <div>
                            <AiFillStar className="star" />
                            <AiFillStar className="star" />
                            <AiFillStar className="star" />
                            <AiFillStar className="star" />
                            <AiFillStar className="star" />
                        </div>
                    </div>
                </div>
                <div className="DescriptionAndImage">
                    <div className="textArea">
                        <label>Note</label>
                        <textarea id="textarea" placeholder="Enter Note here" name="comment" form="usrform"></textarea>
                    </div>
                    <div className="AddIMage">
                        <label>Upload Image</label>
                        <input type="file" id="img" name="img" accept="image/*" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default postForum