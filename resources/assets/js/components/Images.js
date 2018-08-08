import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Images extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            url: '/api/images',
            pagination: [],
            is_logged_in: false
        }
    }

    componentWillMount() {
        this.fetchImages()
        this.checkAuth()
    }

    loadMore() {
        this.setState({
            url: this.state.pagination.next_page_url
        })

        this.fetchImages()
    }

    fetchImages() {
        let $this = this

        axios.get(this.state.url).then(response => {
            console.log('data is:::::::', $this.state.data)
            $this.setState({
                data: $this.state.data.length > 0 ? $this.state.data.concat(response.data.data) : response.data.data,
                url: response.data.next_page_url
            })

            $this.makePagination(response.data)
        }).catch(error => {
            console.log(error)
        })
    }

    checkAuth() {
        axios.post('/is_user_logged_in', {}).then(response => {
            if(response.data.user) {
                this.setState({
                    is_logged_in: true
                })
            } else {
                this.setState({
                    is_logged_in: false
                })
            }
        }).catch(error => {
            console.log(error)
        })
    }

    logOut() {
        window.location.href = 'logout'
    }

    makePagination(data) {
        const pagination = {
            current_page: data.current_page,
            last_page: data.last_page,
            next_page_url: data.next_page_url,
            prev_page_url: data.prev_page_url
        }

        this.setState({
            pagination
        })
    }

    render() {
        let welcomeMsg, addNewImg = '';

        if(this.state.is_logged_in) {
            welcomeMsg = <React.Fragment><h2>You are logged in: <br /></h2><button onClick={this.logOut}>Log out</button></React.Fragment>
            addNewImg = <a href="/images/create" className="btn btn-primary">Add New Image</a>
        }
        else
            welcomeMsg = <React.Fragment><h2>You are not logged in: <br /></h2><button onClick={() => {location.href = 'login'}}>Go to login page</button></React.Fragment>
        
        return (
            <React.Fragment>           
                {welcomeMsg}
                <hr />
                <h2>Users Listing</h2>
                {addNewImg}
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Image title</th>
                            <th>Uploaded By</th>
                            <th>Description</th>
                            <th>Likes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data.map((image, i) => (
                            <tr key={i}>
                                <td><img src={'/pictures/' + image.path} width="200" /></td>
                                <td>{image.img_title}</td>
                                <td>{image.user_id}</td>
                                <td>{image.description}</td>
                                <td>
                                    0
                                </td>
                            </tr>
                        )
                        )}
                        
                    </tbody>
                </table>
                <div align="center">
                    <button className="btn btn-default" onClick={this.loadMore.bind(this)}>Load More Results</button>
                </div>
                <br/><br/>
            </React.Fragment>
        )
    }
}

if (document.getElementById('app')) {
    ReactDOM.render(<Images />, document.getElementById('app'));
}