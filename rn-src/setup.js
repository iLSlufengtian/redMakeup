/**
 *@author: meekoMa
 *@date: 19/05/15 10:12:24
 *@desc: 入口文件
 */
'use strict';
import React, {PureComponent} from 'react';
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'
import Routers from './pages/Routers';
import Store from './store/configureStore';
import BackAndroidUtils from "./utils/BackAndroidUtil";

import Toast from "./components/ToastView";
console.disableYellowBox = true;
class setup extends PureComponent {
    componentDidMount() {
        BackAndroidUtils.addBackAndroidListener();
    }

    componentWillUnmount(): void {
        BackAndroidUtils.removeBackAndroidListener();
    }

    render() {
        return (
            <Provider store={Store.store}>
                <PersistGate loading={null} persistor={Store.persistor}>
                    <Routers/>
                </PersistGate>
                <Toast  ref={(ref) => {
                    global.toastRef = ref;
                }}/>
            </Provider>
        );
    }
}
module.exports = setup;
