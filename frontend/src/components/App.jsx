import React, { Component } from 'react';
import Header from './layout/Header.jsx';
import Sidebar from './layout/Sidebar.jsx';
import Context from '../context/Context';
import '../assets/less/index.less';
class App extends Component {

    componentWillMount() {
        console.log(Context.cursor.toJS());
    }

    render() {
        const margin = {
            marginLeft: "230px"
        };
        return (
            <div  className="wrapper">
                <Header/>
                <Sidebar/>
                <section className="content" style={margin}>
                    {this.props.children}
                </section>
            </div>
        );
    }
}

export default App;
