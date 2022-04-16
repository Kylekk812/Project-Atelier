import React from 'react';
import axios from 'axios';
import ProductCard from './ProductCard.jsx';
import Modal from './Modal.jsx';

// related products are same for every customer(display associated with the current product)
// realted products list are the same each time load
// action button - star icon => open modal window comparing the DETAILS of products (current page product vs selected product from the list)

class RelatedProductsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      comparisionArray: [],
      currentPosition: 0,
      positionIndex: 0
    };
    this.moveLeft = this.moveLeft.bind(this);
    this.moveRight = this.moveRight.bind(this);
    this.updateModal = this.updateModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  moveRight() {
    var newPosition = this.state.currentPosition - 45;
    var newIndex = this.state.positionIndex + 1;
    this.setState({
      currentPosition: newPosition,
      positionIndex: newIndex,
    });
  }

  moveLeft() {
    var newPosition = this.state.currentPosition + 45;
    var newIndex = this.state.positionIndex - 1;
    this.setState({
      currentPosition: newPosition,
      positionIndex: newIndex,
    });
  }

  updateModal(currentProductInfo, relatedProductInfo) {
    this.setState({
      showModal: true,
      comparisionArray: [currentProductInfo, relatedProductInfo],
    });
  }

  closeModal() {
    this.setState({
      showModal: false,
    });
  }

  render() {
    const { showModal, comparisionArray, currentPosition, positionIndex } = this.state;
    const { relatedProductsIDs, relatedProductsInfo, productID, selectedProductInfo, updateProduct } = this.props;

    if (relatedProductsInfo.length === 0) {
      return (
        <div id="relatedProductsList" className="list-container">
          <div className="list-header">
            <h3 className="list-title">RELATED PRODUCTS</h3>
          </div>
          <div>Loading...</div>
        </div>
        );
    }

    return (
      <div id="relatedProductsList" className="list-container">
        <div className="list-header">
          <h3 className="list-title">RELATED PRODUCTS</h3>
        </div>
        <div className="carousel-container">
          {positionIndex === 0 ? null : <button className="handles left-handle" onClick={this.moveLeft} >&#8249;</button>}
          <div className="carousel-slider" style={{ transform: `translateX(${currentPosition}%)` }}>
            {relatedProductsInfo.map(productInfo => (
              <ProductCard key={productInfo.id} productInfo={productInfo} productInfoOfCurrentPage={selectedProductInfo} action={'relatedProducts'} updateModal={this.updateModal} onClick={updateProduct} />
            ))}
          </div>
          {positionIndex === relatedProductsIDs.length - 3 ? null : <button className="handles right-handle" onClick={this.moveRight} >&#x203A;</button>}
        </div>
        {showModal ? <Modal onClose={this.closeModal} comparisionArray={comparisionArray} /> : null}
      </div>
    );
  }
}

export default RelatedProductsList;