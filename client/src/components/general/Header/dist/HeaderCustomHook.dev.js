"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = require("react");

var _reactRedux = require("react-redux");

var _reactRouterDom = require("react-router-dom");

var _flashMessageActions = require("../../../actions/flashMessageActions");

var _recipeActions = require("../../../actions/recipeActions");

var _notificationActions = require("../../../actions/notificationActions");

var _config = _interopRequireDefault(require("../../../assets/js/socket/config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * @function useHeader
 * @description A custom hook that handles header function component
 * @param { function } logoutUser - dipatches action creators that logs out a user
 * @param { function } showModal - dispatches action creators that displays the modal component
 * @returns { object } values - values from input change event handler
 * @returns { function } logOut
 * @returns { function } toggleNav
 * @returns { function } displayModal
 * @returns { function } toggleProfileList
 * @returns { function } inputChangeHandler
 */
var useHeader = function useHeader(_ref) {
  var logoutUser = _ref.logoutUser,
      showModal = _ref.showModal;

  var _useState = (0, _react.useState)({}),
      _useState2 = _slicedToArray(_useState, 2),
      values = _useState2[0],
      setValues = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isNew = _useState4[0],
      setIsNew = _useState4[1];

  var dispatch = (0, _reactRedux.useDispatch)();
  var navigate = (0, _reactRouterDom.useNavigate)();
  var wrapperRef = (0, _react.useRef)();
  var isAuthenticated = (0, _reactRedux.useSelector)(function (state) {
    return state.userAuthReducer.isAuthenticated;
  });
  var user = (0, _reactRedux.useSelector)(function (state) {
    return state.userAuthReducer.user;
  });
  var flashMessageType = (0, _reactRedux.useSelector)(function (state) {
    return state.flashMessageReducer.type;
  });
  var notifications = (0, _reactRedux.useSelector)(function (state) {
    return state.notificationReducer.notifications;
  });
  var isAvailable = notifications ? notifications.length > 0 : false;

  _config["default"].on('event:newNotifications', function (notificationData) {
    if (notificationData.isNew) {
      setIsNew(true);
    }
  });

  var toggleProfileList = function toggleProfileList() {
    var profileDropdown = document.getElementById('profile-dropdown');
    profileDropdown.style.display = profileDropdown.style.display === "block" ? "" : "block";
  };

  var toggleNav = function toggleNav() {
    var topNav = document.getElementById('topnav');
    topNav.style.display = topNav.style.display === "block" ? "" : "block";
  };

  var inputChangeHandler = function inputChangeHandler(event) {
    setValues(_defineProperty({}, event.target.name, event.target.value));
  };

  var submitSearchForm = function submitSearchForm(event) {
    return {};
  };

  var displayRecipeModal = function displayRecipeModal() {
    var form = 'recipeForm';
    dispatch(showModal({
      form: form
    }));
    toggleNav();
  };

  var displayChangePasswordModal = function displayChangePasswordModal() {
    var form = 'changePasswordForm';
    dispatch(showModal({
      form: form
    }));
    toggleNav();
    toggleProfileList();
  };

  var getAllRecipes = function getAllRecipes() {
    dispatch((0, _recipeActions.fetchRecipes)()).then(function () {
      return navigate('/');
    });
  };

  var getSavedRecipes = function getSavedRecipes() {
    dispatch((0, _recipeActions.fetchSavedRecipes)({
      userId: user.id
    })).unwrap().then(function () {
      return navigate('saved-recipes');
    })["catch"](function (error) {
      dispatch((0, _flashMessageActions.addFlashMessage)({
        message: error.message,
        type: 'failure'
      }));
      getAllRecipes();
    });
  };

  var getMyRecipes = function getMyRecipes() {
    dispatch((0, _recipeActions.fetchMyRecipes)(user.id)).unwrap().then(function () {
      return navigate('my-recipes');
    })["catch"](function (error) {
      dispatch((0, _flashMessageActions.addFlashMessage)({
        message: error.message,
        type: 'failure'
      }));
      getAllRecipes();
    });
  };

  var logOut = function logOut() {
    dispatch(logoutUser()).then(function () {
      return getAllRecipes();
    });
  };
  /**
   * Handles outside click event of dropdown on homepage
   * @function handleClickOutside
   * @param {object} event
   * @returns { null }  void
   */


  var handleClickOutside = function handleClickOutside(event) {
    if (!wrapperRef.current) {
      return null;
    }

    if (wrapperRef && !wrapperRef.current.contains(event.target)) {
      var profileDropdown = document.getElementById('profile-dropdown');
      profileDropdown.style.display = "";
    }
  };

  (0, _react.useEffect)(function () {
    document.addEventListener("mousedown", handleClickOutside);

    _config["default"].on('event:notifyContributors', function (data) {
      if (data) {
        dispatch((0, _notificationActions.setNotifications)(data));
      }
    });

    _config["default"].on('event:error', function (error) {});

    return function () {
      return document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return {
    values: values,
    isAuthenticated: isAuthenticated,
    user: user,
    flashMessageType: flashMessageType,
    wrapperRef: wrapperRef,
    isNew: isNew,
    isAvailable: isAvailable,
    logOut: logOut,
    toggleNav: toggleNav,
    displayRecipeModal: displayRecipeModal,
    displayChangePasswordModal: displayChangePasswordModal,
    toggleProfileList: toggleProfileList,
    inputChangeHandler: inputChangeHandler,
    submitSearchForm: submitSearchForm,
    getAllRecipes: getAllRecipes,
    getSavedRecipes: getSavedRecipes,
    getMyRecipes: getMyRecipes
  };
};

var _default = useHeader;
exports["default"] = _default;