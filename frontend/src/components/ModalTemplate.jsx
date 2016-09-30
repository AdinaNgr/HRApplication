import React from 'react';

export default class ModalTemplate extends React.Component{
    
    componentDidMount(){
        const formModal=this.refs.formModal;
        $(formModal).modal('show');

        $(formModal).on('hidden.bs.modal', function () {
            this.onCancelClick();
        }.bind(this))
        this.componentWillReceiveProps({formIsValid: false})
    }

    componentWillReceiveProps(props){
        if(! props.formIsValid){
            $(this.refs.storeButton).attr('disabled',true);
        }else{
            $(this.refs.storeButton).removeAttr('disabled');
        }
    }


    onStoreClick(){
        const formModal=this.refs.formModal;
        $(formModal).modal('hide');
        this.props.onStoreClick();
    }
    
    onCancelClick(){
        console.log('xxx')
        const formModal=this.refs.formModal;
        $(formModal).modal('hide');
        this.props.onCancelClick();
    }
    render(){
        //


        const storeLabel="Save";
        // const that=this;
        // window.addEventListener('mouseup',function(event) {
        //     var form=document.getElementsByClassName('modal');
        //     console.log(form[0].className);
        //     console.log(event.target.className);
        //     if(event.target.className == form[0].className){
        //         console.log('omgggggg',that.onCancelClick)
        //         // that.onCancelClick.bind(that)();
        //     }
        //
        // })

        // <div>
        // <a href="#" id="showbox">Show Div</a>
        // </div>
        // <div style="width:500px; height:200px; background-color: #000; color: #fff; display: none;" id="bigbox">
        //     Click inside the black box, nothing happens. Click outside, it disappears  </div>  <script type="text/javascript">
        //     $('#showbox').click(function(){
        //         $('#bigbox').show(function(){
        //             document.body.addEventListener('click', boxCloser, false);
        //         });
        //     });
        // function boxCloser(e){
        //     if(e.target.id != 'bigbox'){
        //         document.body.removeEventListener('click', boxCloser, false);
        //         $('#bigbox').hide();
        //     }
        // }
        
        return(
            <div ref="formModal" className="modal fade " role="dialog"  tabIndex="-1" >
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
                                    <button type="button" ref='storeButton' className="storeButton btn btn-success" onClick={this.onStoreClick.bind(this)} > {storeLabel}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}