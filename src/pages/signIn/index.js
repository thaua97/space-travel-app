import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StatusBar, AsyncStorage } from 'react-native'
import { StackActions, NavigationActions } from 'react-navigation'

import api from '../../services/api'

import {
  Container,
  Logo,
  Input,
  ErrorMessage,
  Button,
  ButtonText,
  SignUpLink,
  SignUpLinkText
} from './styles'

navigationOptions = {
  header: null,
}

export default class SignIn extends Component {
    state = {
      email: '',
      password: '',
      error: ''
    }

    static propTypes = {
      navigation: PropTypes.shape({
          navigate: PropTypes.func,
          dispatch: PropTypes.func
      }).isRequired 
    }
  
     handleEmailChange = (email) => {
      this.setState({ email: email})
    }

    handlePasswordChange = (password) => {
      this.setState({ password: password})
    }

    handleSignup = () => {
      this.props.navigation.navigate(('SignUp'))
    }

    handleSignin = async () => {
      if(this.state.email.length === 0 || this.state.password.length === 0) {
        this.setState({ error: 'Preencha as informações!' })
      } else {
        try {
          const res = await api.post('/signin', {
            email: this.state.email,
            password: this.state.password
          })

          await AsyncStorage.setItem('@spaceTravelApp:token', res.data.token)

          const resetAction = StackActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({ routeName: 'Main' }),
            ]
          })
          this.props.navigation.dispatch(resetAction)
        } catch (err) {
          this.setState({ error: `${err}`})
        }
      }
    }

  render () {
    return (
      <Container>
        <StatusBar hidden/>
        <Logo source={require('../../../assets/logo.png')} resizeMode="contain"/>
        <Input
          placeholder="Endereço de e-mail"
          value={this.state.email}
          onChangeText={this.handleEmailChange}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Input 
            placeholder="Senha"
            value={this.state.password}
            onChangeText={this.handlePasswordChange}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry
        />

        {this.state.error.length !== 0 && <ErrorMessage>{this.state.error}</ErrorMessage>}

        <Button onPress={this.handleSignin}>
          <ButtonText>ACESSAR</ButtonText>
        </Button>

        <SignUpLink onPress={this.handleSignup}>
          <SignUpLinkText>Não possuo conta!</SignUpLinkText>
        </SignUpLink>
      </Container>
    )
  }
}