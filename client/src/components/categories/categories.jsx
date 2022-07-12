import React from 'react'
import { observer, inject } from 'mobx-react'

import "./categories.css"

const categories = inject("products")(observer((props) => {

  let categories = props.products.categories
  let mainCategories = categories ? Object.keys(categories) : []

  return (
    <div>
      <h3 className="allCategories" onClick={props.products.search}>All categories</h3>
      {mainCategories.map(mainCategory => {
        let subCategories = categories[mainCategory]
        return (
          <div key={Math.random()}>
            <h4
              className='mainCategory' onClick={props.products.getproductsByCategory}
              data-main-category={mainCategory}>{mainCategory}
            </h4>
            {subCategories.map(subCategory => <h5
              className='subCategory' key={Math.random()} onClick={props.products.getproductsByCategory}
              data-main-category={mainCategory} data-sub-category={subCategory}>{subCategory}
            </h5>)}
          </div>
        )
      })}
    </div>
  )

}))

export default categories