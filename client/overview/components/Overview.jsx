import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {update} from '../../../store/actions/product.js';
import axios from 'axios';
// import token from '../env/config.js';

import Announcement from './Announcement.jsx';
import Description from './Description.jsx';
import LogoSearch from './Logo-Search.jsx';
import PhotoParent from './Photo-Parent.jsx';

	function Overview(props) {
		const currentProduct = useSelector(state => state.currentProduct);

	return (
		<div className="overviewContainer">
    <div className="overview">
			<LogoSearch />
			<Announcement />
			<PhotoParent setCurrentChosenStyle={props.setCurrentChosenStyle} togglePopupOutfit={props.togglePopupOutfit} isOpenOutfit={props.isOpenOutfit}/>
			<Description />
		</div>
		</div>
	)
};

export default Overview;