import React from 'react'
import './details_component.css'
import { observer, inject } from 'mobx-react'
import GridHeader from './GridHeader' 
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Item from './item'
import { Link } from 'react-router-dom'

const details_component = inject("carts")(observer((props) => {

  const params = useLocation()

  useEffect(()=> {

    props.carts.addItemToShow(params.state)

    props.carts.gettotalPrice()

  })

  return (
    <div className='DetailsContainer'>
      <div className="container">
        <div className="content">
          <h1>{props.carts.itemToShow ? props.carts.itemToShow.name : null}</h1>
          <h3>{props.carts.itemToShow ? props.carts.itemToShow.location : null}</h3>
        </div>
        <div className='gridcontent'>
             <GridHeader />
             {props.carts.itemToShow ? 
                Object.keys(props.carts.itemToShow.productCart).map(key => {
                   return ( <Item key={key} item={props.carts.itemToShow.productCart[key]} itemName={key} /> )
                })
                 :
                 null
             }

        </div>

        <h1>Total Price : {props.carts.totalPrice}</h1>
        <Link  to="/stores" ><button className='hideDetailsButton'>hide Details</button></Link>
      </div>
    </div>
  )
}))

export default details_component