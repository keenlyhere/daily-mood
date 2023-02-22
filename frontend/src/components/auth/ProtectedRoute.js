import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = props => {
  const user = useSelector(state => state.session.user)
  // console.log("ProtectedRoute - user logged in ? :", user)
  return (
    <Route {...props}>
      {/* {(user)? props.children  : "" } */}
      {(user)? props.children  : <Redirect to='/login' />}
    </Route>
  )
};


export default ProtectedRoute;
