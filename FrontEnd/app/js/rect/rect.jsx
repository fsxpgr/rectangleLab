import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';

import { Link, browserHistory } from 'react-router';

import { Button, Toast, CollectionItem, Collection, Card, Modal, Row, Input, Dropdown, Icon, SideNav, SideNavItem } from 'react-materialize';

import './../../css/rect.css';

export class Rect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            prop: [],
            editable: [],
            iteration: 0,
            targetId: 0,
            x: 0,
            y: 0,
            drag: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.onDown = this.onDown.bind(this);
        this.onUp = this.onUp.bind(this);
    }

    onDown(e, i) {
        var temp = this.state.prop;
        var iter = this.state.iteration;
        temp[i].zIndex = iter++;
        temp[i].boxShadow = `rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px`;

        this.setState({
            x: e.pageX - this.state.prop[i].posX,
            y: e.pageY - this.state.prop[i].posY,
            drag: true,
            editable: temp[i],
            targetId: i,
            iteration: iter++,
            prop: temp
        });

        e.stopPropagation();
        e.preventDefault();
    }

    onUp(e) {
        if (this.state.drag) {
            var temp = this.state.prop;
            temp[this.state.targetId].boxShadow = '';
            this.setState({ drag: false, prop: temp });
        }
    }

    onMove(e) {
        if (this.state.drag) {
            var temp = this.state.prop;
            temp[this.state.targetId].posX = e.pageX - this.state.x;
            temp[this.state.targetId].posY = e.pageY - this.state.y;
            this.setState({ prop: temp });
        }
    }

    handleChange(e, state) {
        var ss = this.state.editable;
        ss[state] = e.target.value;
        this.setState({ editable: ss });
    }

    getRect() {
        axios.get('/rect').then(res => {
            let prop = this.state.prop;
            let iter = this.state.iteration;
            res.data.zIndex = iter++;
            res.data.boxShadow = 0;
            prop.push(res.data);
            this.setState({ prop: prop, iteration: iter++ });
        });
    }

    componentWillMount() {
        this.getRect();
    }

    render() {
        //   const rectangle = {
        //position: 'absolute',
        //transformOrigin: 'top left',
        //  height: `${this.state.prop.sizeY}px`,
        //      width: `${this.state.prop.sizeX}px`,
        //    top: `calc(50% + ${this.state.prop.posY}px`,
        //        left: `calc(42% + ${this.state.prop.posX}px`,
        //  backgroundColor: `${this.state.prop.color_body}`,
        //border: `10px solid ${this.state.prop.color_frame}`,
        //      transform: `rotate(${this.state.prop.orientation}deg)`,
        //    zIndex: `999999`,
        //        opacity: `0.9`
        //     };
        const centerX = {
            position: 'absolute',
            padding: '1px',
            top: '50%',
            width: '100%',
            zIndex: 999999,
            backgroundColor: 'black',
            opacity: `0.5`
        };
        const centerY = {
            position: 'absolute',
            padding: '1px',
            height: '100%',
            left: '50%',
            zIndex: 999999,
            backgroundColor: 'black',
            opacity: `0.5`
        };
        let iter = this.state.iteration;
        return (
            <div className="row no-margin">
                <div className="col s2 map-col">
                    <Card className="map-card">
                        <h5 className="center">Edit rectangle</h5>
                        <Row>
                            <div className="col s6">
                                <label className="car-label">posX</label>
                                <Input
                                    type="number"
                                    value={this.state.editable.posX}
                                    onChange={e => {
                                        this.handleChange(e, 'posX');
                                    }}
                                />
                            </div>
                            <div className="col s6">
                                <label className="car-label">posY</label>
                                <Input
                                    type="number"
                                    value={this.state.editable.posY}
                                    onChange={e => {
                                        this.handleChange(e, 'posY');
                                    }}
                                />
                            </div>{' '}
                        </Row>{' '}
                        <Row>
                            <div className="col s6">
                                <label className="car-label">sizeX</label>
                                <Input
                                    type="number"
                                    value={this.state.editable.sizeX}
                                    onChange={e => {
                                        this.handleChange(e, 'sizeX');
                                    }}
                                />
                            </div>
                            <div className="col s6">
                                <label className="car-label">sizeY</label>
                                <Input
                                    type="number"
                                    value={this.state.editable.sizeY}
                                    onChange={e => {
                                        this.handleChange(e, 'sizeY');
                                    }}
                                />
                            </div>{' '}
                        </Row>{' '}
                        <Row>
                            <div className="col s12">
                                <label className="car-label">color_body</label>
                                <Input
                                    value={this.state.editable.color_body}
                                    onChange={e => {
                                        this.handleChange(e, 'color_body');
                                    }}
                                />
                            </div>
                        </Row>
                        <Row>
                            <div className="col s12">
                                <label className="car-label">color_frame</label>
                                <Input
                                    value={this.state.editable.color_frame}
                                    onChange={e => {
                                        this.handleChange(e, 'color_frame');
                                    }}
                                />
                            </div>
                        </Row>
                        <Row>
                            <div className="col s12">
                                <label className="car-label">orientation</label>
                                <Input
                                    type="number"
                                    value={this.state.editable.orientation}
                                    onChange={e => {
                                        this.handleChange(e, 'orientation');
                                    }}
                                />
                            </div>
                        </Row>
                        <Row>
                            <div className="col s12">
                                <Button onClick={this.getRect.bind(this)}>GET RANDOM!</Button>
                            </div>
                        </Row>
                    </Card>
                </div>
                <div className="col s10 map-col">
                    <Card className="map-card " onMouseUp={e => this.onUp(e)} onMouseMove={this.onMove.bind(this)}>
                        <div className="col s10 background">
                            {this.state.prop.map((item, i) => (
                                <div key={i}>
                                    <div
                                        onMouseDown={e => this.onDown(e, i)}
                                        style={{
                                            position: 'absolute',
                                            transformOrigin: 'top left',
                                            height: `${item.sizeY}px`,
                                            width: `${item.sizeX}px`,
                                            top: `calc(50% + ${item.posY}px`,
                                            left: `calc(50% + ${item.posX}px`,
                                            backgroundColor: `${item.color_body}`,
                                            border: `10px solid ${item.color_frame}`,
                                            transform: `rotate(${item.orientation}deg)`,
                                            zIndex: `${item.zIndex}`,
                                            boxShadow: `${item.boxShadow}`,
                                            opacity: `0.9`
                                        }}
                                    />
                                </div>
                            ))}
                            <div style={centerX} /> <div style={centerY} />
                        </div>
                    </Card>
                </div>
            </div>
        );
    }
}

export default Rect;
