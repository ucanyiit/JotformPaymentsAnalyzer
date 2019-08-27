import axios from 'axios';
import { Body, Container, Content, ListItem, Right, Text, Spinner } from 'native-base';
import React, { Component } from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from './styles';

export default class SubmissionsPage extends Component {

    constructor(props) {
        super(props);
        this.state = { isLoading: true }
    }

    renderRow = (submissionData) => {
        return (
            <ListItem icon style={styles.productItem}>
                <Body>
                    <View style={styles.listItemView}>
                        <View style={{ flex: 9, justifyContent: 'center' }}>
                            <Text style={styles.productText}>
                                {submissionData.title}
                            </Text>
                            <Text style={styles.nameText}>
                                {submissionData.id}
                            </Text>
                        </View>
                        <View style={{ flex: 2 }}>
                            <Right style={{ justifyContent: 'center' }}>
                                <Icon size={32} name="paypal" color="#555" />
                            </Right>
                        </View>
                    </View>
                </Body>
            </ListItem>
        );
    }

    componentDidMount() {
        let that = this;
        return axios.get('https://api.jotform.com/user/submissions', {
            params: {
                apikey: "8876d82ca5bc5f1ded14347d80c49f4c"
            }
        })
            .then(function (response) {
                that.setState({
                    isLoading: false,
                    submissions: response.data.content
                })
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }

    renderWaiting = () => {
        return (
            <Container style={styles.inputItem}>
                <Text style={styles.pleaseText}>Waiting for response...</Text>
                <Spinner />
            </Container>
        );
    }

    renderLogin = () => {
        return (
            <Container>
                <Content>
                    {
                        this.state.submissions.map(data => {
                            return this.renderRow(data)
                        })
                    }
                </Content>
            </Container>
        )
    }

    render() {
        console.log(this.state);
        if (this.state.isLoading) return this.renderWaiting()
        else return this.renderLogin()
    }
}