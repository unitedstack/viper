require('./style/index.less');

var React = require('react');
var Input = require('client/components/modal_common/subs/input');
var RadioList = require('./radioList');
var resources = '/static/assets/bill/bank_logo.png';

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectValue: HALO.settings.enable_alipay ? 'alipay' : 'paypal'
    };

    ['onAction', 'renderRadio', 'onSelectedValueChanged'].forEach((m) => {
      this[m] = this[m].bind(this);
    });
  }

  shouldComponentUpdate(nextProps) {
    if (!this.props.visible && !nextProps.visible) {
      return false;
    }
    return true;
  }

  onAction(field, actionType, data) {
    var func = this.props.onAction;
    func && func(field, actionType, this.refs, data);
  }

  renderRadio() {
    var alipayClass = {
      background: 'url(' + resources + ') 0 0 no-repeat',
      backgroundPosition: -150
    };
    var paypalClass = {
      background: 'url(' + resources + ') 0 0 no-repeat',
      backgroundPosition: -480
    };
    var alipay = {
      id: 1,
      name: 'payment',
      value: 'alipay',
      styleClass: alipayClass
    };
    var paypal = {
      id: 2,
      name: 'payment',
      value: 'paypal',
      styleClass: paypalClass
    };
    var enableAlipay = HALO.settings.enable_alipay;
    var enablePaypal = HALO.settings.enable_paypal;
    var listItems = [];
    if (enableAlipay) {
      listItems.push(alipay);
    }
    if (enablePaypal) {
      listItems.push(paypal);
    }

    return listItems.map((item, index) => {
      return (
        <RadioList
          key={index}
          id={index}
          name={item.name}
          value={item.value}
          styleClass={item.styleClass}
          checked={this.state.selectValue === item.value}
          onSelectedValueChanged={this.onSelectedValueChanged} />
      );
    });
  }

  onSelectedValueChanged(e) {
    this.setState({
      selectValue: e.target.value
    });
    this.forceUpdate();
  }

  render() {
    var props = this.props;
    var __ = props.__;

    return (
      <div className="charge-table">
        <div className="charge-num">
          <div>{__.recharge_num + ': '}</div>
          <Input ref="input" input-type="text" value={10} onAction={this.onAction}/>
        </div>
        <div ref="payment" className="payment">
          <div className="p-l">{this.props.__.payment + ': '}</div>
          {this.renderRadio()}
        </div>
      </div>
    );
  }
}

module.exports = Main;