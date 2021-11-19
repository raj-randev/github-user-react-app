import React, { Fragment, useEffect, useContext } from 'react'
import Spinner from '../layout/Spinner';
import Repos from '../repos/Repos'
import { Link } from 'react-router-dom';
import GithubContext from '../../context/github/githubContext';


const User = ({match}) => {
    const githubContext = useContext(GithubContext)
    const {getUser, loading, user, repos, getUserRepos} = githubContext
    useEffect(() =>{
        getUser(match.params.login);
        getUserRepos(match.params.login);
        //eslint-disable-next-line
    }, []);
    
        
        const {
            name, 
            avatar_url,
            location,
            bio,
            blog,
            login,
            html_url,
            company,
            followers, 
            following,
            public_repos,
            public_gists,
            hireable
        } = user;

        
        if(loading) {
            <Spinner/>
        }
        return (
            <Fragment>
                <Link to='/' className='btn btn-Light'>Back to Search</Link>
                Hireable: {''}
                {hireable ? 
                (<i className='fas fa-check text-sucess' />) 
                :
                (<i className='fas ta-times-circle text-danger' />)
                }
                <div className='card grid-2'>
                    <div className='all-center' >
                        <img src={avatar_url} alt='' className='round-img' style={{ width: '150px' }}  />  
                        <h1>{name}</h1>
                        <p>{location}</p>
                    </div> 
                    <div>
                        {bio && (<Fragment>
                            <h3>Bio</h3>
                            <p>{bio}</p>
                            </Fragment>
                        )}
                        <a href={html_url} className='btn btn-dark my-1'>
                            Vist Github Profile
                        </a>
                        <ul>
                            <li>
                                {login && <Fragment>
                                    <b>Username: </b> {login}
                                    </Fragment>
                                }
                            </li>
                            <li>
                                {company && <Fragment>
                                    <b>Company: </b> {company}
                                    </Fragment>
                                }
                            </li>
                            <li>
                                {blog && <Fragment>
                                    <b>Website: </b> {blog}
                                    </Fragment>
                                }
                            </li>
                        </ul>
                    </div>        
                </div>
                <div className=' card text-center'>
                    <div className='badge badge-primary'>Followers: {followers}</div>
                    <div className='badge badge-success'>Following: {following}</div>
                    <div className='badge badge-light'>Public Repos: {public_repos}</div>
                    <div className='badge badge-dark'>Public Gists: {public_gists}</div>
                </div>

                <Repos repos={repos} />
            </Fragment>
        )
    }




export default User