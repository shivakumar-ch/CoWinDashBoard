import {Component} from 'react'
import Loader from 'react-loader-spinner'

import {
  Container,
  Card,
  LoaderDiv,
  Head,
  Title,
  LogoImg,
  EachCard,
  EachCardTitle,
} from './styledComponents'
import VaccinationByAge from '../VaccinationByAge'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'

const apiReq = {
  intiation: 'INTIATED',
  isLoading: 'LOADING',
  isSuccess: 'SUCCESS',
  isFailure: 'FAILURE',
}

class CowinDashBoard extends Component {
  state = {
    apiStatus: apiReq.intiation,
    data: {},
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({apiStatus: apiReq.isLoading})
    const covidVaccinationDataApiUrl =
      'https://apis.ccbp.in/covid-vaccination-data'
    const options = {
      method: 'GET',
    }
    const response = await fetch(covidVaccinationDataApiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = {
        last7DaysVaccination: data.last_7_days_vaccination.map(day => ({
          dose1: day.dose_1,
          dose2: day.dose_2,
          vaccineDate: day.vaccine_date,
        })),
        vaccinationByAge: data.vaccination_by_age,
        vaccinationByGender: data.vaccination_by_gender,
      }
      this.setState({data: {...updatedData}, apiStatus: apiReq.isSuccess})
    } else {
      this.setState({apiStatus: apiReq.isFailure})
    }
  }

  renderSections = () => {
    const {data, apiStatus} = this.state

    switch (apiStatus) {
      case apiReq.isLoading:
        return (
          <LoaderDiv data-testid="loader">
            <Loader type="ThreeDots" color="#ffffff" width={80} height={80} />
          </LoaderDiv>
        )
      case apiReq.isSuccess:
        return (
          <>
            <EachCard>
              <EachCardTitle>Vaccination Coverage</EachCardTitle>
              <VaccinationCoverage
                last7DaysVaccination={data.last7DaysVaccination}
              />
            </EachCard>
            <EachCard>
              <EachCardTitle>Vaccination by gender</EachCardTitle>
              <VaccinationByGender
                vaccinationByGender={data.vaccinationByGender}
              />
            </EachCard>
            <EachCard>
              <EachCardTitle>Vaccination by age</EachCardTitle>
              <VaccinationByAge vaccinationByAge={data.vaccinationByAge} />
            </EachCard>
          </>
        )
      case apiReq.isFailure:
        return (
          <LoaderDiv>
            <img
              alt="failure view"
              src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
            />
            <h1>Something Went Wrong</h1>
          </LoaderDiv>
        )
      default:
        return null
    }
  }

  render() {
    return (
      <Container>
        <Card>
          <Head>
            <LogoImg
              alt="website logo"
              src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            />
            Co-WIN
          </Head>
          <Title>CoWIN Vaccination in india</Title>
          {this.renderSections()}
        </Card>
      </Container>
    )
  }
}

export default CowinDashBoard
