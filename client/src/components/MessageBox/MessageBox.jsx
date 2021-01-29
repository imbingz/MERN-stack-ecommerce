import React from 'react';

function MessageBox(props) {
    return (
        <div className={`alert alert-${props.variant}  ||  "info" `}>
            {props.children}
        </div>
    );
}

export default MessageBox;
