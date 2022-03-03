'use strict'

const e = React.createElement;

class Shortly extends React.Component {
    constructor(props) {
        super(props)
        this.state = { shortUrl: '' };
        this.state = { longUrl: '' };
    }

    handleLongUrl = (event) => {
        this.state.longUrl = event.target.value
    }

    shorten = () => {
        const lUrl = this.state.longUrl
        const reqBody = { fullUrl: lUrl };
        axios.post('/url/shorten', reqBody)
        .then(response => {
            this.setState({shortUrl: response.data.host + ':3000/' + response.data.payload.shortUrl})
        })
        .catch(error => {
            console.log(error)
        })
    }

    copyToClipboard = () => {
        const textField = document.getElementById('shorten-url')
        textField.select()
        textField.setSelectionRange(0, 99999)

        navigator.clipboard.writeText(textField.value)
    }

    render () {
        return  (
            <div>
                <div className="hero-input">
                    <input className="textbox" type="text" placeholder="Paste long URL" onChange={this.handleLongUrl} />
                    <button className="btn btn-shorten" onClick={this.shorten}>Shorten</button>
                    <p>By using our service you accept the <span><a href="#">Terms of Service</a></span> and <span><a href="#">Privacy Policy</a></span></p>
                </div>
                <div className="hero-output">
                    <input className="textbox" type="text" id="shorten-url" value={this.state.shortUrl} />
                    <div className="tooltip">
                    <button className="btn btn-copy" onClick={this.copyToClipboard}>
                        <span className="tooltiptext" id="myTooltip">Copy to clipboard</span>
                        Copy
                    </button>
                    </div>
                </div>
            </div>
        )
    }
}

const domContainer = document.querySelector('#shorten_container');
ReactDOM.render(e(Shortly), domContainer);