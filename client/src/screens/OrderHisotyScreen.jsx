import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listOrderMine } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

function OrderHisotyScreen(props) {
    // get loading, error, orders info from redux store
    const orderMineList = useSelector((state) => state.orderMineList);
    const { loading, error, orders } = orderMineList;

    //dispatch get order histoy (listOrderMine) action when screen loads
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listOrderMine());
    }, [dispatch]);

    return (
        <div>
            <h1>Order History</h1>
            {
                loading ? <LoadingBox /> 
                    : error ? <MessageBox variant='danger'> {error} </MessageBox>
                        : (
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>DATE</th>
                                        <th>TOTAL</th>
                                        <th>PAID</th>
                                        <th>DELIVERED</th>
                                        <th>ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        orders.length > 0 && orders.map((order) => (
                                            <tr key={order._id}>
                                                <td>{order._id}</td>
                                                <td>{order.createdAt.slice(0,10)}</td>
                                                <td>${order.totalPrice}</td>
                                                <td>{order.paidAt ? order.paidAt.slice(0,10) : 'No'}</td>
                                                <td>{ order.deliveredAt ? order.deliveredAt.slice(0,10): 'No'}</td>
                                                <td>
                                                    <button type='button' className='small'
                                                        onClick={() => {props.history.push(`/order/${order._id}`);}}
                                                    >
                                                      Details
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        )
            }
        </div>
    );
}

export default OrderHisotyScreen;
