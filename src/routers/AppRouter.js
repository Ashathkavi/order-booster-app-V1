import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Header from '../components/Header'
import NotFoundPage from '../components/NotFoundPage'
import MainDashboardPage from '../components/MainDashboardPage'


import FoodDashboardPage from '../components/ManageFood/FoodDashboardPage'
import EditFoodPage from '../components/ManageFood/EditFoodPage'
import AddFoodPage from '../components/ManageFood/AddFoodPage'

import OrderDashboardPage from '../components/ManageOrder/OrderDashboardPage'
import EditOrderPage from '../components/ManageOrder/EditOrderPage'
import AddOrderPage from '../components/ManageOrder/AddOrderPage'


import React from 'react'
import persistStore from 'redux-persist/es/persistStore'

const AppRouter = (props) => {


return (
    <BrowserRouter>
        <div>
            <Header/>
            <Switch>
                <Route path="/"  component={MainDashboardPage} exact={true}/>

                <Route path="/food"  component={FoodDashboardPage } exact={true}/>
                <Route path="/food/create"  component={AddFoodPage }/>
                <Route path="/food/edit/:id"  component={ EditFoodPage}/>

                <Route path="/order"  component={OrderDashboardPage  } exact={true}/>
                <Route path="/order/create"  component={AddOrderPage  }/>
                <Route path="/order/edit/:id"  component={EditOrderPage }/>


                <Route component={NotFoundPage}/>
            </Switch>    
        </div>
         

    </BrowserRouter>

)
}

export default AppRouter