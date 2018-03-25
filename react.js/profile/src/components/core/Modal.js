// @flow

import React, {Component} from 'react';
import ReactDOM from 'react-dom';


type Props = {
    onClose: () => void,
    dialogClass?: string,
    buttons?: Array<{
        props: {},
        text: string
    }>,
    children: any
}

let body: any = document.body,
    modalRoot: any = document.getElementById('modalDialog');

if (!modalRoot) {
    modalRoot = document.createElement('div');
    modalRoot.id = 'modalDialog';

    body.appendChild(modalRoot);
}

export default class Modal extends Component<Props> {
    componentWillMount () {
        body.classList.add('modal-active');
    }

    componentWillUnmount () {
        body.classList.remove('modal-active');
    }

    handleClick = (e: SyntheticEvent<>):void => e.stopPropagation();

    render () {
        let dialogClass = 'modal-dialog' + (this.props.dialogClass ? ` ${this.props.dialogClass}` : ''),
            cancelText = this.props.cancelText ? this.props.cancelText : 'Ok';

        return (
            ReactDOM.createPortal(
                <div className='modal' onClick={this.props.onClose}>
                    <div className={dialogClass} onClick={this.handleClick}>
                        {this.props.children}

                        <div className='modal-dialog__btn-container'>
                            {
                                this.props.buttons &&
                                this.props.buttons.map((button, i) => {
                                    return (
                                        <div key={i} className='modal-dialog__btn'>
                                            <button {...button.props}>
                                                {button.text}
                                            </button>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>,
                modalRoot
            )
        );
    }
}
