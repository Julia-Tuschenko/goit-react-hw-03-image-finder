import styles from './Modal.module.css';
import { createPortal } from 'react-dom';
import React, { Component } from 'react';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.hendelKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.hendelKeyDown);
  }
  hendelKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.showModal();
    }
  };
  hendelBecdropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.showModal();
    }
  };

  render() {
    return createPortal(
      <div className={styles.Overlay} onClick={this.hendelBecdropClick}>
        <div className={styles.Modal}>{this.props.children}</div>
      </div>,
      modalRoot,
    );
  }
}
