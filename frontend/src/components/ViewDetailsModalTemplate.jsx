import React from 'react';

export default class ModalTemplate extends React.Component{

    componentDidMount() {
        const {formModal} = this.refs;
        $(formModal).modal('show');
    }
    componentWillMount(){
    }

    onCancelClick(){
        const {formModal} = this.refs;
        $(formModal).modal('hide');

        this.props['onCancelClick']();
    }
    onStoreClick(){
        const {formModal} = this.refs;
        $(formModal).modal('hide');

        this.props['onStoreClick']();
    }

    render(){


        return(
            <div ref="formModal" className="modal fade"  tabIndex="-1" data-backdrop="static" data-keyboard="false">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="box info-box">
                            <div className="box-header with-border">
                                <h3 className="box-title">{this.props['Title']}</h3>
                            </div>
                            <form className="form-horizontal">
                                <div className="box-body">
                                    {this.props.children}
                                </div>

                                <div className="box-footer">
                                    <button type="button" className="btn btn-danger" onClick={this.onCancelClick.bind(this)} > Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}




