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
        // binding mause events
        this.handleChange = this.handleChange.bind(this);
        this.onDown = this.onDown.bind(this);
        this.onUp = this.onUp.bind(this);
    }

    // mouse event handler
    onDown(e, i) {
        var temp = this.state.prop;
        var iter = this.state.iteration;
        temp[i].zIndex = iter++;

        //calculating of shadowbox
        let hor = Math.sin(temp[i].orientation * (Math.PI / 180)) * 12;
        let ver = Math.cos(temp[i].orientation * (Math.PI / 180)) * 12;
        temp[i].boxShadow = `${hor}px ${ver}px 14px rgba(0, 0, 0, 0.25) `;

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

    // mouse event handler
    onUp(e) {
        if (this.state.drag) {
            var temp = this.state.prop;
            temp[this.state.targetId].boxShadow = '';
            this.setState({ drag: false, prop: temp });
        }
    }

    // mouse event handler
    onMove(e) {
        if (this.state.drag) {
            var temp = this.state.prop;
            temp[this.state.targetId].posX = e.pageX - this.state.x;
            temp[this.state.targetId].posY = e.pageY - this.state.y;
            this.setState({ prop: temp });
        }
    }

    handleChange(e, state) {
        // handling inputs
        var ss = this.state.editable;
        ss[state] = e.target.value;
        this.setState({ editable: ss });
    }

    getRect() {
        //getting random rectangle from server
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
        //rendering X and Y axis
        const centerX = {
            position: 'absolute',
            padding: '1px',
            top: '50%',
            width: '100%',
            zIndex: 999999,
            backgroundColor: 'black',
            opacity: `0.5`,
            pointerEvents: `none`
        };
        const centerY = {
            position: 'absolute',
            padding: '1px',
            height: '100%',
            left: '50%',
            zIndex: 999999,
            backgroundColor: 'black',
            opacity: `0.5`,
            pointerEvents: `none`
        };

        return (
            <div className="row no-margin">
                <div className="col s2 map-col">
                    {/* card of inputs for edit rectangles */}
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
                            {/* mapping all state to render rectangles */}
                            {this.state.prop.map((item, i) => (
                                <div key={i}>
                                    {/* rectangle div */}
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
                            {/* axis X and Y */}
                            <div style={centerX} /> <div style={centerY} />
                        </div>
                    </Card>
                </div>
            </div>
        );
    }
}

export default Rect;
