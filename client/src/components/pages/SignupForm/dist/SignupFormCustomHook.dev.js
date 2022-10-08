"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = require("react");

var _reactRedux = require("react-redux");

var _reactRouterDom = require("react-router-dom");

var _user = require("../../../utils/validators/user");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * @function useSignupForm
 * @description A custom hook to handle user registration
 * @param {function} registerUser - dispatch action creator to register a user
 * @param {function} addFlashMessage - dispatch action creators to add flash message page
 * @returns  { object } { userInput, formErrors, flashMesageType, inputChangeHandler, submitUserForm }
 */
var useSignupForm = function useSignupForm(_ref) {
  var addFlashMessage = _ref.addFlashMessage,
      registerUser = _ref.registerUser,
      loginUser = _ref.loginUser,
      set = _ref.set;
  var userProfile = (0, _reactRedux.useSelector)(function (state) {
    return state.userAuthReducer.user;
  });

  var _useState = (0, _react.useState)({
    username: userProfile.username || '',
    email: userProfile.email || '',
    firstName: userProfile.firstName || '',
    lastName: userProfile.lastName || '',
    age: userProfile.age || '',
    password: '',
    confirmPassword: ''
  }),
      _useState2 = _slicedToArray(_useState, 2),
      userInput = _useState2[0],
      setUserInput = _useState2[1];

  var _useState3 = (0, _react.useState)({}),
      _useState4 = _slicedToArray(_useState3, 2),
      formErrors = _useState4[0],
      setFormErrors = _useState4[1];

  var dispatch = (0, _reactRedux.useDispatch)();
  var navigate = (0, _reactRouterDom.useNavigate)();

  var _useLocation = (0, _reactRouterDom.useLocation)(),
      pathname = _useLocation.pathname;
  /**
   * Handles input changes in field entries
   * @function inputChangeHandler
   * @memberof useSignupForm
   * @param {object} event
   * @returns {null} void
   */


  var inputChangeHandler = function inputChangeHandler(event) {
    event.persist();
    var _event$target = event.target,
        name = _event$target.name,
        value = _event$target.value;
    setUserInput(function (prevState) {
      return _objectSpread({}, prevState, _defineProperty({}, name, value));
    });
  };
  /**
   * Submit completed SignupForm
   * @function submitUserForm
   * @memberof SignupForm
   * @param {object} event
   * @returns {null} void
   */


  var submitUserForm = function submitUserForm(event) {
    if (event) {
      event.preventDefault();
    }

    var _validateUserForm = (0, _user.validateUserForm)(userInput),
        validationErrors = _validateUserForm.validationErrors,
        isValid = _validateUserForm.isValid;

    setFormErrors(_objectSpread({}, validationErrors));

    if (isValid) {
      dispatch(registerUser(_objectSpread({}, userInput, {
        age: parseInt(userInput.age, 10)
      }))).unwrap().then(function (response) {
        var email = userInput.email,
            password = userInput.password;
        var user = response.userPayload.user;
        dispatch(addFlashMessage({
          message: response.message,
          type: 'success'
        }));
        dispatch(loginUser({
          email: email,
          password: password
        }));
        dispatch(set({
          user: user
        }));
        navigate('/');
      })["catch"](function (error) {
        return dispatch(addFlashMessage({
          message: error.message,
          type: 'failure'
        }));
      });
    }
  };

  return {
    userInput: userInput,
    formErrors: formErrors,
    pathname: pathname,
    inputChangeHandler: inputChangeHandler,
    submitUserForm: submitUserForm
  };
};

var _default = useSignupForm;
exports["default"] = _default;