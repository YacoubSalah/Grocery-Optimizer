import React , { useEffect, useState } from 'react'
import './details_component.css'
import { observer, inject } from 'mobx-react'
import GridHeader from './GridHeader' 
import { useLocation } from 'react-router-dom';
import Item from './item'
import { Link } from 'react-router-dom'
import Snackbarcomponent from '../snackbar_component/snackbar_component'

const details_component = inject("carts")(observer((props) => {

  const params = useLocation()

  const [open, setOpen] = useState(false);

  const [item, setItem] = useState('');

  const handleClickEvent = async (itemName , id) =>  {

    await props.carts.getFeedBack(itemName , id)

    setOpen(true)
    setItem(itemName)

  };

  const handleToClose = () =>  {
    setOpen(false);
  }

  useEffect(()=> {

    props.carts.addItemToShow(params.state)

  },[params.state, props.carts, props.storesCartsList])

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
                   return ( 
                        <Item key={key}
                            handelClickOpenSnackbar={handleClickEvent}
                            id={props.carts.itemToShow.id !== null ? props.carts.itemToShow.id : null }
                            item={props.carts.itemToShow.productCart[key]} itemName={key} 
                         />
                         )
                })
                 :
                 null
             }

        </div>
        {props.carts.itemToShow !== null ? 
           <h1>Total Price : {props.carts.sumTotalPriceForStore(props.carts.itemToShow.productCart)}</h1> :
           null
         }
        <Link  to="/stores" ><button className='hideDetailsButton'>hide Details</button></Link>

        <Snackbarcomponent 
          open={open} 
          posts={props.carts.feedBack} 
          storeName = { props.carts.itemToShow.name }
          storeLocation = { props.carts.itemToShow.location}
          itemName = {item}
          handleToClose = {handleToClose} />
      </div>
    </div>
  )
}))

export default details_component