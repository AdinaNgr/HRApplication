import * as React from 'react';
import config from '../helper';
import Context from '../../context/Context';
import Accessors from '../../context/Accessors';
import '../../assets/less/index.less';
import Controller from './OfficeController';
import SidebarTile from './OfficeSidebarTile'
export default class OfficesList extends React.Component{
    constructor(){
        super();
    }
    componentWillMount(){

        Controller.GetPartial();
    }
    
    
    render(){
        const items = Accessors.sidebarOffices(Context.cursor).map ( (office, index) => {
            return (
                <SidebarTile
                    name={office.Name}
                    link={"office/departments/"+office.Id}
                    key={index}
                    index={index}
                />
            );
        })

        return (
            <div>
                {items}
            </div>
        )
    }
}