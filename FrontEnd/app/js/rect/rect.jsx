import React from 'react';
import axios from 'axios';

import { Link, browserHistory } from 'react-router';

import { Button, Toast, CollectionItem, Collection, Card, Modal, Row, Input, Dropdown, Icon, SideNav, SideNavItem } from 'react-materialize';

import './../../css/rect.css';

export class Rect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            prop: {
                posX: '',
                posY: '',
                sizeX: '',
                sizeY: '',
                color_body: '',
                color_frame: '',
                orientation: ''
            }
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e, state) {
        var ss = this.state.prop;
        ss[state] = e.target.value;
        this.setState({ prop: ss });
    }

    getRect() {
        axios.get('/rect').then(res => this.setState({ prop: res.data }, () => console.log(this.state.prop)));
    }
    componentWillMount() {
        this.getRect();
    }

    render() {
        const rectangle = {
            position: 'absolute',
            transformOrigin: 'top left',
            height: `${this.state.prop.sizeY}px`,
            width: `${this.state.prop.sizeX}px`,
            top: `calc(50% + ${this.state.prop.posY}px`,
            left: `calc(42% + ${this.state.prop.posX}px`,
            backgroundColor: `${this.state.prop.color_body}`,
            border: `10px solid ${this.state.prop.color_frame}`,
            transform: `rotate(${this.state.prop.orientation}deg)`,
            zIndex: `999999`,
            opacity: `0.9`
        };
        const center = {
            position: 'absolute',
            padding: '1px',
            top: '50%',
            left: '42%',
            zIndex: 999999,
            backgroundColor: 'black',
            opacity: `0.9`
        };
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
                                    value={this.state.prop.posX}
                                    onChange={e => {
                                        this.handleChange(e, 'posX');
                                    }}
                                />
                            </div>
                            <div className="col s6">
                                <label className="car-label">posY</label>
                                <Input
                                    type="number"
                                    value={this.state.prop.posY}
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
                                    value={this.state.prop.sizeX}
                                    onChange={e => {
                                        this.handleChange(e, 'sizeX');
                                    }}
                                />
                            </div>
                            <div className="col s6">
                                <label className="car-label">sizeY</label>
                                <Input
                                    type="number"
                                    value={this.state.prop.sizeY}
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
                                    value={this.state.prop.color_body}
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
                                    value={this.state.prop.color_frame}
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
                                    value={this.state.prop.orientation}
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
                    <Card className="map-card ">
                        <div className="col s10 background">
                            <div style={rectangle} />
                            <div style={center} />
                        </div>
                    </Card>
                </div>
            </div>
        );
    }
}

export default Rect;
