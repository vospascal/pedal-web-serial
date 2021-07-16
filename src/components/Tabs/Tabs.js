/* eslint-disable indent */
import React, { PureComponent, Children, cloneElement } from 'react';
import './Tabs.css';

class Tabs extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            selectedTabIndex: 0,
        };
    }

    getAdditionalProps = (index, props) => ({
        handleClick: this.handleTabClick,
        tabIndex: index,
        selected: index === this.state.selectedTabIndex,
        ...props,
    });

    getChildrenTabsWithProps = () => {
        return Children.map(this.props.children, (child, index) =>
            cloneElement(child, this.getAdditionalProps(index, child.props)),
        );
    };

    getActiveTabContent = () => {
        const { children } = this.props;
        const { selectedTabIndex } = this.state;
        const currentChildren = children[selectedTabIndex];

        if (currentChildren) {
            return currentChildren.props.children;
        }

        return false;
    };

    handleTabClick = tabIndex => {
        this.setState({ selectedTabIndex: tabIndex });
    };

    sub(){
        if(this.props.sub){
            return 'sub'
        }
        return '';
    }

    render() {
        const childrenTabsWithProps = this.getChildrenTabsWithProps();
        const tabContent = this.getActiveTabContent();

        return (
            <div className={`Tabs ${this.sub()}`} >
                <ul className="Tabs__list">{childrenTabsWithProps}</ul>
                <div className="Tabs__content">{tabContent}</div>
            </div>
        );
    }
}

export default Tabs;
