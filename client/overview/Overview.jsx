import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {update} from '../../store/actions/product.js';

	function Overview() {
		const currentProduct = useSelector(state => state.currentProduct);

	return (
    <div className="parent">
			<div className="child1">
				<div className="subchild1-1">
				<img src="https://images.unsplash.com/photo-1619684743280-af5941f82eb3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80" height="120px" width="120px"/>
				</div>
				<input className="subchild1-2" type="search" alt="search"/>
				  <button type="submit" className="subchild1-3">
				  <img src="https://www.kindacode.com/wp-content/uploads/2020/12/search.png" height="30px" width="30px"/>
				  </button>
			</div>
			<div className="child2">
				<h3>{"Site-wide Announcement placeholder"}</h3>
			</div>
			<div className="child3">
				<div className="subchild3-1">
				  <img src="https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80" height="600px" width="450px"/>
				</div>
				<div className="subchild3-2">
				  <div className="subchild3-2-1">
					  <h3>{"Ratings placeholder"}</h3>
					</div>
					<div className="subchild3-2-2">
					  <h3>{currentProduct.category}</h3>
					</div>
					<div className="subchild3-2-3">
					  <h3>{currentProduct.name}</h3>
					</div>
					<div className="subchild3-2-4">
					  <h3>{currentProduct.default_price}</h3>
					</div>
					<div className="subchild3-2-5">
					  <h3>{"Style < Selected Style-Placeholder"}</h3>
					</div>
					<div className="subchild3-2-6">
					  <select>
							<option value="/">Select Size</option>
						</select>
					</div>
					<div className="subchild3-2-7">
					  <select>
							<option value="/">1</option>
						</select>
					</div>
					<div className="subchild3-2-8">
					  <p>{"Add To Bag placeholder"}</p>
					</div>
					<div className="subchild3-2-9">
					  <p>{"Star placeholder"}</p>
					</div>
			  </div>
			</div>
			<div className="child4">
				<p className="subchild4-1">{currentProduct.slogan}</p>
				<p className="subchild4-2">{"| features placeholder"}</p>
			</div>
			<div className="child5">
			  <p className="subchild4-2">{currentProduct.description}</p>
			</div>
		</div>
	)
};

export default Overview;

{/* <div className="box-overview">
<div className="box-logo-search">
	<img className="logo" src="https://images.unsplash.com/photo-1619684743280-af5941f82eb3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80" height="120px" width="120px"/>
	<input className="search" type="search" alt="search"/>
	<button type="submit" className="search">
		<img src="https://www.kindacode.com/wp-content/uploads/2020/12/search.png" height="30px" width="30px"/>
	</button>
</div>

<div className="box-announcement">
	<p>{"Site-wide Announcement placeholder"}</p>
</div>

<div className="box-ratings">
	<span className="ratings">{"Ratings placeholder"}</span>
</div>

<div className="box-product-overview-main">
	 <span className="main-img">
	 <img src="https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80" height="600px" width="450px"/>
 </span>
	<p className="category"> {currentProduct.category}</p>
	<p className="name"> {currentProduct.name}</p>
	<p className="price"> {currentProduct.default_price}</p>
	<p className="style-main"> {"Style < Selected Style-Placeholder"}</p>
</div>

<div className="box-style-views"></div>
<div className="box-drop-downs">
	<div className="box-sort">
		<select>
			<option value="/">Select Size</option>
		</select>
	</div>
	<div className="box-sort">
		<select>
			<option value="/">1</option>
		</select>
	</div>
	<div className="box-sort">
	<p className="star">{"Add To Bag placeholder"}</p>
	</div>
	<div className="box-sort">
		<p className="star">{"Star placeholder"}</p>
	</div>
</div>

<div className="box-product-description">
	<p className="slogan">{currentProduct.slogan}</p>
	<p className="description">{currentProduct.description}</p>
	<p className="features">{"features placeholder"}</p>
</div>
</div> */}