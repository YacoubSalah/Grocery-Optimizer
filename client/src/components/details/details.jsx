import React, { useEffect, useState } from 'react'
import { observer, inject } from 'mobx-react'
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom'

import GridHeader from './GridHeader'
import Snackbarcomponent from './snackbar_component/snackbar_component'
import Item from './item'

import background from '../../images/no_cart.jpg'
import './details.css'

const details_component = inject("carts")(observer((props) => {

  const params = useLocation()

  const [open, setOpen] = useState(false);

  const [item, setItem] = useState('');

  const handleClickEvent = async (itemName, id) => {

    await props.carts.getFeedBack(itemName, id)

    setOpen(true)
    setItem(itemName)

  };

  const handleToClose = () => {
    setOpen(false);
  }

  useEffect(() => {

    props.carts.addItemToShow(params.state)

  }, [params.state, props.carts, props.storesCartsList])

  return (
    <div className="detailsContainer">

      <img className='background' src={background} alt='background'></img>

      <div className="detailsStoreData">

        <div>
          <span className='detailsStoreName'>{props.carts.itemToShow ? props.carts.itemToShow.name : null} Store</span>
          <span className='detailsStoreLocation'> {props.carts.itemToShow ? props.carts.itemToShow.location : null}</span>
        </div>

        <div className='detailsTotalPriceContainer' >
          <span className='detailsTotalPriceTitle'>Total Price :</span>
          {props.carts.itemToShow !== null ?
          <span className='detailsTotalPriceValue'> {Math.round(props.carts.sumTotalPriceForStore(props.carts.itemToShow.productCart)*100)/100}  ₪</span> : null
          }
        </div>

      </div>

      <div className='gridcontent'>

        <GridHeader />

        {
          props.carts.itemToShow ?
            Object.keys(props.carts.itemToShow.productCart).map(key => {
              return (
                <Item key={key}
                  handelClickOpenSnackbar={handleClickEvent}
                  id={props.carts.itemToShow.id !== null ? props.carts.itemToShow.id : null}
                  item={props.carts.itemToShow.productCart[key]} itemName={key}
                />
              )
            })
            :
            null
        }

      </div>

      {props.carts.itemToShow !== null ?
        <h1>Total Price : {props.carts.itemToShow.totalPrice}  ₪</h1> :
        null
      }
      <Link to="/stores" ><button className='hideDetailsButton'>Back to stores</button></Link>

      <Snackbarcomponent
        open={open}
        posts={props.carts.feedBack}
        storeName={props.carts.itemToShow ? props.carts.itemToShow.name : null}
        storeLocation={props.carts.itemToShow ? props.carts.itemToShow.location : null}
        itemName={item}
        handleToClose={handleToClose}
      />

    </div>
  )
}))

export default details_component