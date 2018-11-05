import React, { Component } from 'react';
import Description from './Description';
import Specifications from './Specifications';
import HighLights from './HighLights';
import ProductSnapshot from './ProductSnapshot';
import PicturesShare from './PicturesShare';
import { exportObj } from '../../../helpers/helperFunctions';

//css
import style from '../css/BoostDetails.css';

// this is contructor;
// it will handle login for rendering Description and Specifications;

export default class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewChange: 'Description',
    };

    this.views = this.views.bind(this);
  }

  views(e) {
    const divBar = e.target.textContent;
    this.setState({
      viewChange: divBar,
    });
  }

  render() {
    //for Specs;
    const specifications = this.props.products.specification;
    const specArr = JSON.parse(specifications);

    return (
      <div className="boostParent">
        <div>
          <h1>Product Details</h1>
          <div>
            <ul className="boostList">
              <li
                className={this.state.viewChange === 'Highlights' ? 'hToggle' : ' boostToggle'}
                onClick={this.views}
              >
                Highlights
              </li>

              {/* Button renders another Div to show either description */}
              <li
                className={this.state.viewChange === 'Description' ? 'dToggle' : 'boostToggle'}
                onClick={this.views}
              >
                Description
              </li>
              {/* Button to render another Div to show Specifications */}
              <li
                className={this.state.viewChange === 'Specification' ? 'sToggle' : ' boostToggle'}
                onClick={this.views}
              >
                Specification
              </li>
              {/* to handle hightlight */}
            </ul>
          </div>

          <div className={this.state.viewChange === 'Description' ? 'productDisplay' : 'hide'}>
            <Description products={this.props.products} />
          </div>

          <div className={this.state.viewChange === 'Specification' ? 'specifications' : 'hide'}>
            <Specifications specs={specArr} />
          </div>

          <div className={this.state.viewChange === 'Highlights' ? 'highlights' : 'hide'}>
            <HighLights highlights={exportObj.highlights} />
          </div>
        </div>
        <div className="snapshot">
          <h1>Product Snapshot</h1>
          <div className="snapshotParent">
            <ProductSnapshot snapshots={exportObj} />
          </div>
        </div>
        <div className="picturesShare">
          <PicturesShare />
        </div>
      </div>
    );
  }
}
