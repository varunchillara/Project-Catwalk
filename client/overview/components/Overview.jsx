import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {update} from '../../../store/actions/product.js';
import axios from 'axios';
// import token from '../env/config.js';

import Announcement from './Announcement.jsx';
import Description from './Description.jsx';
import LogoSearch from './Logo-Search.jsx';
import PhotoParent from './Photo-Parent.jsx';

	function Overview() {
		const currentProduct = useSelector(state => state.currentProduct);

	return (
    <div className="overview">
			<LogoSearch />
			<Announcement />
			<PhotoParent />
			<Description />
		</div>
	)
};

export default Overview;