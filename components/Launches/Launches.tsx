import type { LaunchesQuery } from '../../libs/graphql/__generated__'
import type { ApolloQueryResult } from '@apollo/client'

export interface LaunchesPropTypes {
  response: ApolloQueryResult<LaunchesQuery>,
  error: { message: String, exist: Boolean }
}

const Launches: React.FC<LaunchesPropTypes> = ({ response, error }) => {
  console.log(response)
  return <div className='px-12'>
      <ul>
        {response?.data?.launches?.map(launch => (
          <li key={launch?.id}>
            <h3 className='font-bold'>{launch?.mission_name} - {launch?.launch_year}</h3>
            <p className='font-thin text-indigo-600'>Rocket: {launch?.rocket?.rocket_name}</p>
          </li>
        ))}
      </ul>
    </div>

}

export default Launches
