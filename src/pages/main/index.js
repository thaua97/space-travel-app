import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { weather, W_TOKEN } from '../../services/weather'
import { AsyncStorage } from 'react-native'

import { 
  Container, 
  InfoText, 
  CardInfos, 
  InfosContainer,
  Button,
  ButtonText,
  InfosTrips,
  InfoTripInfo,
  InfoTitle,
  InfoNumb,
  Logout,
  Temp
} from './styles'

export default class Main extends Component {
  state = {
    loggedInUser: [],
    error: null,
    clima: [],
    city: []
  }

  async componentDidMount () {

    try {
      const cl = await weather.get('/weather/locale/5326/current', {
        params: {
          "token": W_TOKEN
        }
      })
      
      this.setState({ clima: cl.data.data, city: cl.data })
      
      } catch(err) {
        this.setState({ error: 'sem temperatu'})
      }


    const user = JSON.parse( await AsyncStorage.getItem('@SpaceApi:user'))
    const token = await AsyncStorage.getItem('@SpaceApi:token')

    if (token && user ) {
      this.setState({ loggedInUser: user, tokenAuth: token })
    } else {
      this.setState({ error: 'sem user'})
    }

    
  }

  handleLogout = async () => {
    await AsyncStorage.clear()
    
    this.props.navigation.navigate(('SignIn'))
  }


  render() {
    return (
      <Container>
        
        <CardInfos>
          <Logout onPress={this.handleLogout}>
            <InfoNumb style={{ color: '#3c3c3c'}}>X</InfoNumb>
          </Logout>
          <InfosContainer>
            {this.state.error && <Text>{this.state.error}</Text>}
            <InfoText>{this.state.loggedInUser.username}</InfoText>
            <Button>
              <ButtonText>NOVA VIAGEM</ButtonText>
            </Button>
            <InfosTrips>
              <InfoTripInfo>
                <InfoNumb>10</InfoNumb>
                <InfoTitle>Malas Feitas</InfoTitle>
              </InfoTripInfo>
              <InfoTripInfo>
                <InfoNumb>5</InfoNumb>
                <InfoTitle>Viagens</InfoTitle>
              </InfoTripInfo>
              <InfoTripInfo>
                <InfoNumb>3</InfoNumb>
                <InfoTitle>Locais Favoritos</InfoTitle>
              </InfoTripInfo>
            </InfosTrips>

          </InfosContainer>
        </CardInfos>
        <Temp>{`${this.state.clima.temperature} ºc`}</Temp>
        <Temp>{this.state.city.name}</Temp>
        {this.state.error && <Temp>{this.state.error}</Temp>}
      </Container>
    )
  }
}
