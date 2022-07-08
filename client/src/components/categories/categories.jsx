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
         
          Object.entries(categories).map(([mainCategory, value])  => {
          
          return (

             <select key={mainCategory} onChange={props.products.handelSelectEvent} name={mainCategory} defaultValue={'default'} >
                 <option value="default"  disabled>{mainCategory}</option>
                 {value.map(option => {
                  return ( <option key={option} value={option} >{option}</option> )
                 })}
             </select>
              
          )

         })

         :

         null
       } 

    </div>
  )
}))

export default categories