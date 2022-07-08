import React from 'react'
import { useEffect } from 'react'
import { observer, inject } from 'mobx-react'
import { toJS } from 'mobx'

const categories = inject("products")(observer((props) => {

  let categories = toJS(props.products.categories)

  console.log(categories)

  useEffect(() => {

    props.products.initializeCategories()

  }, [props.products])

  return (
    <div className='categories'>

      {  categories !== null 
          
          ? 
         
          Object.entries(categories).map(([key, value])  => {
          
          return (
               <p>{key} - {value}</p>
          )

         })

         :

         null
       } 

    </div>
  )
}))

export default categories