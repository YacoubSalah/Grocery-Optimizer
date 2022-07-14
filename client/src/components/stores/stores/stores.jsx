import React from 'react'
import { useEffect } from 'react'
import { observer, inject } from 'mobx-react'
import SearchBar from '../search_bar/search_bar'
import StoresElem from '../stores_elem/stores-elem'
import { Snackbar } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

import './stores.css'

const StoresSearch = inject("carts", "products")(observer((props) => {

  useEffect(() => {

    props.carts.calculateTotalPrices(props.products.cart)

  }, [props.products.cart])


  const action = (
    <React.Fragment>
      <CircularProgress />
    </React.Fragment>
  );

  return (
    <div className='containerStores'>

      <Snackbar
        message={ props.carts.requsetStoresStatus ? 'Loading Stores!!' : 'Error while loadin stores!!'}
        open={props.carts.loadingStoresSnackBar}
        onClose={props.carts.handleLoadinStoresSnackBar}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        action={action}
      />

      <SearchBar />
      <StoresElem />
    </div>
  )
}))

export default StoresSearch