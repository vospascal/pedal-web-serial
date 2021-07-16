import React, { PureComponent } from 'react';

class Tab extends PureComponent {
    handleClick = () => {
        this.props.handleClick(this.props.tabIndex);
    };

    render() {
        return (
            <li
                className={`Tabs__item ${this.props.selected
                    ? 'Tabs__item--selected'
                    : ''}`}
                onClick={this.handleClick}
            >
                {this.props.title}
            </li>
        );
    }
}

export default Tab;
