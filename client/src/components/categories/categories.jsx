import React from 'react'
import { useEffect } from 'react'
import { observer, inject } from 'mobx-react'

import "./categories.css"

const categories = inject("products")(observer((props) => {

  let categories = props.products.categories
  let mainCategories = categories ? Object.keys(categories) : []

  return (
    <div>
      <p className="allCategories" onClick={props.products.search}>All categories</p>
      {mainCategories.map(mainCategory => {
        let subCategories = categories[mainCategory]
        return (
          <div key={Math.random()}>
            <div
              className='mainCategory' onClick={props.products.getproductsByCategory}
              data-main-category={mainCategory}>{mainCategory}
            </div>
            {subCategories.map(subCategory => <p
              className='subCategory' key={Math.random()} onClick={props.products.getproductsByCategory}
              data-main-category={mainCategory} data-sub-category={subCategory}>{subCategory}
            </p>)}
          </div>
        )
      })}
    </div>
  )

}))

export default categories