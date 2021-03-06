import $ from "jquery";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import "./common.css";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import state from "./state.js";
import actions from "./actions.js";

import Recents from "./recents.js";
import Welcome from "./welcome.js";
import AddPeer from "./addPeer.js";
import Contacts from "./contacts.js";
import Settings from "./settings.js";
import Chat from "./chat.js";
import Window from "./window.js";
import QuickPannel from "./quickPannel.js";
import Online from "./online.js";
import { Icon, Switcher, BarButton } from "./global.js";

state.init();

window.state = state;
window.actions = actions;

const dev = 'desktop';

class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.state = { currentPage: 'recents', relayToPage: null }
    }
    componentDidMount() {
        this.parseState();
        window.state.subscribe(() => {
            this.parseState();
        })
    }

    parseState = () => {
        var data = window.state.getState();
        var page = data.nav.page;
        var relay = data.nav.relay;
        this.state.currentPage = page;
        if (relay == undefined) {
            relay = null;
        }
        this.state.relayToPage = relay;
        this.setState(this.state);
    }
    getPage = () => {
        if (this.state.currentPage == 'recents') {
            return (<Recents relay={this.state.relayToPage} />)
        }
        if (this.state.currentPage == 'contacts') {
            return (<Contacts relay={this.state.relayToPage} />)
        }
        if (this.state.currentPage == 'chat') {
            return (<Chat relay={this.state.relayToPage} />)
        }
        if (this.state.currentPage == 'online') {
            return (<Online relay={this.state.relayToPage} />)
        }
        if (this.state.currentPage == 'settings') {
            return (<Settings relay={this.state.relayToPage} />)
        }
        else {
            return (<div className="center" style={{ height: '16rem' }}>🚧</div>)
        }
    }
    getTabsBar = () => {
        return (<div className="center">Tabs</div>)
    }
    render() {
        if (this.state.currentPage == 'welcome') {
            return (<Welcome relay={this.state.relayToPage} />)
        }
        else {
            if (dev == 'desktop') {
                return (
                    <div id="nav_bdy_desktop">
                        <QuickPannel />
                        {this.getPage()}
                        <div id="nav_onlineBar"><Online /></div>
                    </div>
                )
            }
            else {
                if (this.state.currentPage != 'chat') {
                    return (
                        <div id="nav_bdy_mobile">
                            {this.getPage()}
                            {this.getTabsBar()}
                        </div>
                    )
                }
                else {
                    <div id="nav_bdy_mobile">
                        {this.getPage()}
                    </div>
                }
            }
        }

    }
}

ReactDOM.render(
    <div>
        <Nav />
        <Window />
    </div>
    , document.getElementById('root')
);

win.resize = function () {
    if (win.isMaximized()) {
        win.unmaximize();
    }
    else {
        win.maximize();
    }
}
win.showControls = function () {
    $('#controls').css({
        display: 'flex'
    })
    $('#controls').html(getControls());
}
win.hideControls = function () {
    $('#controls').css({
        display: 'none'
    })
}
function getControls() {
    var red = '<div class="bar_butts bar_butt_red" onClick=win.close()></div>';
    var yellow = '<div class="bar_butts bar_butt_yellow" onClick=win.minimize()></div>';
    var green = '<div class="bar_butts bar_butt_green" onClick=win.resize()></div>';
    var grey = '<div class="bar_butts" ></div>';
    var controls = red;
    if (win.isMinimizable()) {
        controls += yellow;
    } else {
        controls += grey;
    }
    if (win.isMaximizable() && win.isResizable()) {
        controls += green;
    }
    return (controls)
}
function getControlsDisabled() {
    var grey = '<div class="bar_butts" ></div>';
    var controls = grey + grey;
    if (win.isMaximizable()) {
        controls += grey;
    }
    return (controls)
}

$('#controls').html(getControls());

win.on('focus', () => {
    $('#controls').html(getControls());
})

win.updateControls = function () {
    $('#controls').html(getControls());
}

win.on('blur', () => {
    $('#controls').html(getControlsDisabled());
})

win.show();