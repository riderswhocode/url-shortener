'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var e = React.createElement;

var Shortly = function (_React$Component) {
    _inherits(Shortly, _React$Component);

    function Shortly(props) {
        _classCallCheck(this, Shortly);

        var _this = _possibleConstructorReturn(this, (Shortly.__proto__ || Object.getPrototypeOf(Shortly)).call(this, props));

        _this.handleLongUrl = function (event) {
            _this.state.longUrl = event.target.value;
        };

        _this.shorten = function () {
            var lUrl = _this.state.longUrl;
            var reqBody = { fullUrl: lUrl };
            axios.post('/url/shorten', reqBody).then(function (response) {
                _this.setState({ shortUrl: response.data.host + ':3000/' + response.data.payload.shortUrl });
            }).catch(function (error) {
                console.log(error);
            });
        };

        _this.copyToClipboard = function () {
            var textField = document.getElementById('shorten-url');
            textField.select();
            textField.setSelectionRange(0, 99999);

            navigator.clipboard.writeText(textField.value);
        };

        _this.state = { shortUrl: '' };
        _this.state = { longUrl: '' };
        return _this;
    }

    _createClass(Shortly, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'div',
                    { className: 'hero-input' },
                    React.createElement('input', { className: 'textbox', type: 'text', placeholder: 'Paste long URL', onChange: this.handleLongUrl }),
                    React.createElement(
                        'button',
                        { className: 'btn btn-shorten', onClick: this.shorten },
                        'Shorten'
                    ),
                    React.createElement(
                        'p',
                        null,
                        'By using our service you accept the ',
                        React.createElement(
                            'span',
                            null,
                            React.createElement(
                                'a',
                                { href: '#' },
                                'Terms of Service'
                            )
                        ),
                        ' and ',
                        React.createElement(
                            'span',
                            null,
                            React.createElement(
                                'a',
                                { href: '#' },
                                'Privacy Policy'
                            )
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'hero-output' },
                    React.createElement('input', { className: 'textbox', type: 'text', id: 'shorten-url', value: this.state.shortUrl }),
                    React.createElement(
                        'div',
                        { className: 'tooltip' },
                        React.createElement(
                            'button',
                            { className: 'btn btn-copy', onClick: this.copyToClipboard },
                            React.createElement(
                                'span',
                                { className: 'tooltiptext', id: 'myTooltip' },
                                'Copy to clipboard'
                            ),
                            'Copy'
                        )
                    )
                )
            );
        }
    }]);

    return Shortly;
}(React.Component);

var domContainer = document.querySelector('#shorten_container');
ReactDOM.render(e(Shortly), domContainer);