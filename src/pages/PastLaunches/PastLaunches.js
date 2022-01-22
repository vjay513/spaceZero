
import React, { Fragment } from "react";
import { gql, useQuery } from "@apollo/client";

import Loader from "./../../components/Loader";
import Error from "./../../components/Error";
import LaunchesFeed from "../../components/LaunchesFeed/LaunchesFeed";

const GET_lAUNCHES_QUERY = gql`
{
    launchesPast {
      mission_name
      launch_site {
        site_name_long
      }
      links {
        article_link
        flickr_images
      }
      id
    }
  }
  
`;

const PastLaunches = () => {
    const { data, loading, error } = useQuery(GET_lAUNCHES_QUERY);

    if (loading) return <Loader />;
    if (error) return <Error error={error} />;


    const launches = data.launchesPast.filter(
        launch => launch.links.article_link && launch.links.flickr_images.length > 0
    )

    return (
        <Fragment>
            <h1 className="display-4 text-center my-5 pt-5">Past Launches</h1>
            <LaunchesFeed launches={launches} />
        </Fragment>
    );
};

export default PastLaunches;
