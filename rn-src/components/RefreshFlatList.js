/**
 * @flow meekoma
 * 下拉刷新，上啦分页加载的flatlist
 */
'use strict';
import React, {PureComponent} from 'react';
import {
    View,
    StyleSheet,
    Animated,
    InteractionManager,
    FlatList,
    ActivityIndicator,
    TouchableWithoutFeedback,
    RefreshControl,
    Text,
    ScrollView
} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Network from '../utils/Network';
import {width, uW, statusBarHeight} from '../utils/DeviceUtil'
import Colors from "../common/Colors";

let pageNum = {};//页数
const pageSize = 10; //每页数据条数
let mainData = {};

class RefreshFlatList extends PureComponent {

    static propTypes = {
        name: PropTypes.string.isRequired,
        reloadFetchConfig: PropTypes.func.isRequired,
        limitText: PropTypes.string,
        offsetText: PropTypes.string,
        getItemFn: PropTypes.func,
        ListEmptyComponent: PropTypes.func,
        renderItem: PropTypes.func.isRequired,
        progressViewOffset: PropTypes.number,
        showFootContent: PropTypes.bool,
        errorTitle: PropTypes.string,
        footerEndText: PropTypes.string,
        footerLoadingText: PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.state = {
            foot: 'hide',
        }
    }

    static defaultProps = {
        footerLoadingText: '加载中',
        showFootContent: true,
        footerEndText: "已经到底了"
    };

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.reloadData("init");
        });
    }

    clearData = () => {
        this.loadFoot = false;//是否显示没有更多数据,
        this.reloadType ="init"
        mainData[this.props.name] = [];
        pageNum[this.props.name] = 0;
        this.setState({loaded: false, foot: 'hide', positionY: 0, noData: false});
        if (!this.state.refreshAlive) {
            this.setState({refreshAlive: true});
        }
    };


    reloadData = (type) => {
        if (type != 'loadMore') {
            this.clearData();
        }
        this.reloadType = type;

        let conf = this.props.reloadFetchConfig();
        if (!conf) return;
        let params = conf.params || {};

        let limitText = this.props.limitText || "limit";
        let offsetText = this.props.offsetText || "offset";
        params[offsetText] = pageNum[this.props.name] || 0;
        params[limitText] = params[limitText] || pageSize;

        conf.params = params;

        let onSuccess = (data, dispatch) => {
            let currentCount;

            let items = [];

            if (this.props.getItemFn) {
                items = this.props.getItemFn(data);
            } else {
                items = data;
            }

            if (!items || items.length == 0) {
                items = [];
                currentCount = 0;
                this.setState({noData: true});
            } else {
                currentCount = items.length;
            }

            items.forEach((item) => {
                mainData[this.props.name].push(item);
            });

            if (currentCount < pageSize) {
                this.loadFoot = true;//是否显示没有更多数据
                this.setState({foot: 'loaded'});
            } else {
                this.loadFoot = false;
                this.setState({foot: 'hide'});
            }

            if(this.props.setData){
                this.props.setData(mainData[this.props.name])
            }

            this.setState({
                dataSource: mainData[this.props.name],
                refreshAlive: false,
                loaded: true,
            }, () => {
                // if (!this.loadFoot && type == "init") {
                //     this.reloadType = "loadMore"
                // }
            });

        };

        let onFailure = (error, dispatch) => {
            this.setState({
                error: true,
                loaded: true,
                refreshAlive: false,
            });
        };

        this.props.dispatch(Network.fetch(conf, onSuccess, onFailure))

    };

    endReached = () => {
        if(!this.loadFoot && this.reloadType =="init"){
            this.reloadType = "loadMore";
            return;
        }

        if (!this.loadFoot&& (this.reloadType == "loadMore" || this.reloadType == "refresh")) {
            this.setState({foot: 'loading'});
            pageNum[this.props.name]++;
            this.reloadData('loadMore');
        }
    };

    listEmptyComponent = () => {
        if (this.state.noData) {
            if (this.props.ListEmptyComponent) {
                return this.props.ListEmptyComponent();
            } else {
                return (
                    <View style={{alignItems: 'center', marginTop: 20}}>
                        <Text>暂无数据</Text>
                    </View>
                );
            }
        } else if (this.state.error) {
            return (
                <View>
                    <Text>错误</Text>
                </View>
            )
        } else {
            return <View/>
        }
    };

    _renderFootorComponent = (type) => {
        if (this.state.noData) {
            return <View/>
        }
        if (type === 'loaded' && this.props.showFootContent) { //加载完毕
            return (
                <View style={styles.noMoreWrapper}>
                    <View style={styles.footerLeft}/>
                    <Text style={styles.footerText}>{this.props.footerEndText}</Text>
                    <View style={styles.footerRight}/>
                </View>
            );
        } else if (type === 'loading' && this.props.showFootContent) { //加载中
            return (
                <View style={styles.loadedWrapper}>
                    <ActivityIndicator color={"red"}/>
                    <Text style={styles.footerTextLoading}>{this.props.footerLoadingText}</Text>
                </View>
            );
        } else {
            return (<View style={styles.loadedWrapper}/>)
        }
    };

    render() {
        return (
            <View style={{flex: 1}}>
                <FlatList
                    {...this.props}
                    ListEmptyComponent={() => this.listEmptyComponent()}
                    ref={(ref) => this.flatList = ref}
                    data={this.state.dataSource}
                    renderItem={this.props.renderItem}
                    onEndReachedThreshold={0.01}
                    onEndReached={() => this.endReached()}
                    ListFooterComponent={() => this._renderFootorComponent(this.state.foot)}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshAlive}
                            onRefresh={() => this.reloadData("refresh")}
                            tintColor='red'
                            colors={['#ff0000', '#00ff00', '#0000ff', '#3ad564']}
                            progressBackgroundColor="#ffffff"
                            title={'刷新中....'}
                        />
                    }
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    loadedWrapper: {
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadedWrapperone: {
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
        backgroundColor: 'white',
        width: width,
        borderTopColor: Colors.bacColor,
    },
    noMoreWrapper: {
        height: 40,
        flexDirection: 'row',
        // justifyContent:'financing',
        alignItems: 'center',
        backgroundColor: Colors.bacColor,
        width: width
    },
    footerLeft: {
        flex: 1,
        height: 0.5,
        backgroundColor: Colors.borderColor,
        marginLeft: 15
    },
    footerRight: {
        flex: 1,
        height: 0.5,
        backgroundColor: Colors.borderColor,
        marginRight: 15
    },
    footerText: {
        flex: 1,
        textAlign: 'center',
        fontSize: 15
    },
    footerTextLoading: {
        marginLeft: 5,
        color: Colors.mainText
    },
});

function select(store) {
    return {};
}

module.exports = connect(select)(RefreshFlatList);