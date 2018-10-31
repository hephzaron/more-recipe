import React from 'react';
import PropTypes from 'prop-types';

const Header = (props) => (
  <header id="wawrecipe-header" class="wawrecipe-header-one">
		<div class="wawrecipe-main-header">
			<div class="container">
				<div class="row">
					<aside class="col-md-2"> <a href="index-2.html" class="logo"><img src="images/logo.png" alt=""></a> </aside>
					<aside class="col-md-10">
						<!--// Navigation \\-->
						<a href="#menu" class="menu-link active"><span></span></a>
						<nav id="menu" class="menu navbar navbar-default">
							<ul class="level-1 navbar-nav">
								<li class="active"><a href="index-2.html"><i class="fa fa-lg fa-home"></i> Home</a></li>
								<li><a href="#"><i class="fa fa-lg fa-align-justify"></i> View Recipes</a><span class="has-subnav"><i class="fa fa-angle-down"></i></span>
									<ul class="sub-menu level-2">
										<li><a href="saved-recipe.html">Saved Recipes<span class="badge pull-right">10</span></a></li>
										<li><a href="recipe-list.html">My Recipes<span class="badge pull-right">7</span></a></li>
										<li><a href="recipe-list.html">All Recipes</a></li>
									</ul>
								</li>
								<li><a href="#"><i class="fa fa-lg fa-pencil"></i> new post</a></li>
								<li><a href=""><i class="fa fa-lg fa-user-circle"></i> Hephzibah</a><span class="has-subnav"><i class="fa fa-angle-down"></i></span>
									<ul class="sub-menu level-2">
										<li><a href=""><i class="fa fa-lg fa-edit"></i> Edit Profile</a></li>
										<li><a href=""><i class="fa fa-lg fa-pencil"></i> Change Password</a></li>
										<li><a href="user-profile.html"><i class="fa fa-lg fa-user-circle-o"></i> View Profile</a></li>
										<li><a href="#"><i class="fa fa-lg fa-question-circle"></i> About Us</a></li>
										<li><a href="#"><i class="fa fa-lg fa-sign-out"></i> Sign Out</a></li>
									</ul>
								</li>
							</ul>
						</nav>
						<!--// Navigation \\-->
						<ul class="wawrecipe-user-list">
							<li><a href="#" class="fa fa-search" data-toggle="modal" data-target="#searchmodal"></a></li>
							<li><a href="#" class="notification fa fa-bell-o"><span>{props.notifications}</span></a>
								{props.children}
							</li>
						</ul>
					</aside>
			 	</div>
			</div>
		</div>
	</header>
)
