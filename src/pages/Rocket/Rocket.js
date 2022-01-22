import React from 'react';
import {gql, useQuery} from '@apollo/client';

import Loader from "./../../components/Loader";
import Error from "./../../components/Error";
import Rocket from "./../../components/Rocket";

import './style.scss';


const GET_ROCKET_INFO = gql`
query GET_ROCKET_INFO($rocketId: ID!)
{
    rocket(id: $rocketId) {
      name
      height {
        feet
        meters
      }
      diameter {
        feet
        meters
      }
      stages
      cost_per_launch
      engines {
        type
        number
        propellant_1
        propellant_2
        thrust_to_weight
      }
    }
  }
  
`;

const RocketPage = ({ match }) => {
    const rocketId = match.params.id;

    const {  data, loading, error } = useQuery(GET_ROCKET_INFO,{
        variables: { rocketId },
    });

    if (loading) return <Loader />;
    if (error) return <Error error={error} />;

    console.log(data.rocket.name);


    return <Rocket rocket={{ ...data.rocket, id: rocketId}} />;
};

export default RocketPage;
