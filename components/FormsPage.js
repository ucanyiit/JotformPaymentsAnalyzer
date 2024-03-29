import { Body, Container, Content, Header, Left, List, ListItem, Picker, Right, Text, Title } from 'native-base';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formsRequest, navigateTo } from '../redux/actions';
import Logout from './LogoutButton';
import { WaitingPage } from './pages';
import styles from './styles';

class FormsPage extends Component {

    constructor(props) {
        super(props);
        this.state = { selected: 'all' };

        if (!this.props.user.loggedIn) this.props.navigateTo({ page: 'Login' });
        else this.props.formsRequest(this.state.selected);
    }

    onValueChange(value: string) {
        this.setState({ selected: value });
        this.props.formsRequest(value);
    }

    renderRow = (form) => {
        return (
            <ListItem button onPress={() => { this.props.navigateTo({ page: 'FormDetails', id: form.id }) }} style={styles.productItem}>
                <Body>
                    <Text style={styles.listTitleText}>{form.title}</Text>
                    <Text style={styles.listSubtitleText}>{form.url}</Text>
                </Body>
            </ListItem>
        );
    }

    renderHeader() {
        return (
            <Header androidStatusBarColor='#fa8900' style={styles.orangeBackground}>
                <Left />
                <Body>
                    <Title style={styles.white}>Forms</Title>
                </Body>
                <Right>
                    <Picker
                        mode='dropdown'
                        style={styles.white}
                        selectedValue={this.state.selected}
                        onValueChange={this.onValueChange.bind(this)}>
                        <Picker.Item label='All Forms' value='all' />
                        <Picker.Item label='Subscriptions' value='subscription' />
                        <Picker.Item label='One Time Payments' value='product' />
                    </Picker>
                </Right>
            </Header>
        )
    }

    renderForms() {
        if (this.props.user.isLoading) return <WaitingPage />
        else return (
            <Content>
                <List>
                    {this.props.user.forms && this.props.user.forms.map(data => { return this.renderRow(data) })}
                </List>
            </Content>
        )
    }

    render() {
        return (
            <Container style={styles.darkBackground}>
                {this.renderHeader()}
                {this.renderForms()}
                <Logout />
            </Container>
        )
    }
}

const mapStateToProps = state => {
    const user = state.user;
    return { user };
};

const mapDispatchToProps = dispatch => {
    return {
        formsRequest: content => { dispatch(formsRequest(content)) },
        navigateTo: content => { dispatch(navigateTo(content)) }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormsPage);