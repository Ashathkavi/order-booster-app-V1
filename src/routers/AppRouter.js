import {Router, Route, Switch} from 'react-router-dom'
import Header from '../components/Header'
import NotFoundPage from '../components/NotFoundPage'
import MainDashboardPage from '../components/MainDashboardPage'
import {connect} from 'react-redux'


import FoodDashboardPage from '../components/ManageFood/FoodDashboardPage'
import EditFoodPage from '../components/ManageFood/EditFoodPage'
import AddFoodPage from '../components/ManageFood/AddFoodPage'

import OrderDashboardPage from '../components/ManageOrder/OrderDashboardPage'
import EditOrderPage from '../components/ManageOrder/EditOrderPage'
import AddOrderPage from '../components/ManageOrder/AddOrderPage'
import LoginPage from '../components/LoginPage'
import createHistory from 'history/createBrowserHistory'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'
import MemberRoute from './MemberRoute'
import ConfirmedFoodsPage from '../components/ManageOrder/ConfirmedFoodsPage'

import { startLogout } from '../actions/auth'




import React from 'react'

export const history = createHistory()


const AppRouter = (props) => {

    return (
        <Router history={history}>
            <div>
                <Header startLogout={props.startLogout}/>
                <Switch>
                    <PublicRoute path="/"  component={LoginPage} exact={true}/>

                    <MemberRoute path="/dashboard"  component={MainDashboardPage} exact={true}/>

                    <MemberRoute path="/food"  component={FoodDashboardPage } exact={true}/>
                    <PrivateRoute path="/food/create"  component={AddFoodPage }/>
                    <PrivateRoute path="/food/edit/:id"  component={ EditFoodPage}/>

                    <MemberRoute path="/order"  component={props.autherizedAs === 'cook' ? ConfirmedFoodsPage : OrderDashboardPage  } exact={true}/>
                    <PrivateRoute path="/order/create"  component={AddOrderPage  }/>
                    <PrivateRoute path="/order/edit/:id"  component={EditOrderPage }/>


                    <Route component={NotFoundPage}/>
                </Switch>    
            </div>           
        </Router>

    )
}


const mapStateToProps = (state) => ({
    autherizedAs:state.auth.role
})

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
})

export default connect(mapStateToProps, mapDispatchToProps)(AppRouter)
