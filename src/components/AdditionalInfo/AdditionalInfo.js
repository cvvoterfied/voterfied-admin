import React from 'react';
import { connect } from 'react-redux';

class AdditionalInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    render() {

        return (          
                this.props.links.map(
                (j) =>   
                    <div className="linkBox">
                        <div className="titleBox">{j.name}</div>
                        <div className="urlBox"> <a href={j.linkURL} alt={j.name}>{j.linkURL}</a></div>
                    </div>
                )
                
        );
    }
}

function mapStateToProps(state) {
    return {
        logintoken: state.loginReducer.loginToken,       
        user: state.loginReducer.user
    }
}

export default connect(mapStateToProps, { })(AdditionalInfo);

