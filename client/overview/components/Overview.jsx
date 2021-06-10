import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {update} from '../../../store/actions/product.js';
import axios from 'axios';
// import token from '../env/config.js';

import Announcement from './Announcement.jsx';
import Carousel from './Carousel-Main.jsx';
import Description from './Description.jsx';
import Features from './Features.jsx';
import LogoSearch from './Logo-Search.jsx';
import ProductInfo from './ProductInfo.jsx';

	function Overview() {
		const currentProduct = useSelector(state => state.currentProduct);

	return (
    <div className="overview">
			<LogoSearch />
			<Announcement />
			<div className="overview-main">
				<Carousel />
				<ProductInfo />
			</div>
			<div className="description-features">
			  <Description />
				<Features />
			</div>
		</div>
	)
};

export default Overview;