var React = require('react');
var ReactDOM = require('react-dom');
var Password = require('client/components/password/index');

class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      initialized: false
    };
  }

  onClick(key, e) {
    switch (key) {
      case 'settings':
        var haloMenu = document.getElementsByClassName('halo-com-menu')[0],
          menu = document.getElementsByClassName('menu')[0];
        ['maxWidth', 'width', 'minWidth'].forEach(m => {
          haloMenu.style[m] = '100px';
          menu.style[m] = '26px';
        });
        var wrapper = document.getElementById('main-wrapper');
        var div = document.createElement('div');
        div.setAttribute('class', 'pwd');
        div.setAttribute('style', ['flex: 1']);
        wrapper.appendChild(div);
        document.getElementById('main').style.display = 'none';
        document.getElementsByClassName('scroll-pane')[0].style.display = 'none';
        var li = document.getElementsByClassName('menu')[0].getElementsByTagName('li');
        for(var i = 0; i < li.length; i++) {
          li[i].style.display = 'none';
        }
        ReactDOM.render(<Password __={this.props.__}/>, document.getElementsByClassName('pwd')[0]);
        break;
      case 'help':
        break;
      case 'en':
        window.location = '/?lang=en';
        break;
      case 'cn':
        window.location = '/?lang=zh-CN';
        break;
      case 'logout':
        window.location = '/auth/logout';
        break;
      default:
        break;
    }
  }

  updateSetting() {
    this.setState({
      initialized: true
    });
  }

  componentDidMount() {
    this.updateSetting();
  }

  setTmpl() {
    var currtLang = HALO.configs.lang;
    var __ = this.props.__;

    var config = [{
      title: __.personal_settings,
      key: 'settings',
      icon: 'setting'
    }, {
      key: 'lang',
      icon: 'global'
    }, {
      title: __.logout,
      key: 'logout',
      icon: 'logout'
    }];

    return config.map((item, index) => {
      if (item.key === 'lang') {
        return (
          <li className="lang" key={index}>
            <i className={'glyphicon icon-' + item.icon} />
            <a className={currtLang === 'en' ? 'disabled' : 'active'}
              onClick={currtLang === 'en' ? null : this.onClick.bind(null, 'en')}>English</a>
            <span>|</span>
            <a className={currtLang === 'zh-CN' ? 'disabled' : 'active'}
              onClick={currtLang === 'zh-CN' ? null : this.onClick.bind(null, 'cn')}>中文</a>
          </li>
        );
      } else {
        return (
          <li key={index} onClick={this.onClick.bind(this, item.key)}>
            <i className={'glyphicon icon-' + item.icon} />
            <a>{item.title}</a>
          </li>
        );
      }

    });
  }

  render() {
    return (
      <ul className="settings-dropdown">
        {this.state.initialized ? this.setTmpl() : null}
      </ul>
    );
  }
}

module.exports = Settings;
