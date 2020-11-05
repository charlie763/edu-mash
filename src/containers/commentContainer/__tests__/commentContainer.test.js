import React from 'react'
import ReactDOM from 'react-dom'
import CommentContainer from '../CommentContainer'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../../../reducers/rootReducer'
import { render } from '@testing-library/react'

const comments = [
  {
    id: 4,
    text: 'My kids love this!',
    resource_id: 4,
    user_id: 3,
    created_at: '2020-10-21T16:54:41.856Z',
    updated_at: '2020-10-21T16:54:41.856Z',
    user: {
      username: 'Nanibah'
    }
  },
  {
    id: 5,
    text: 'This is a test comment!',
    resource_id: 4,
    user_id: 1,
    created_at: '2020-10-21T16:54:41.856Z',
    updated_at: '2020-10-21T16:54:41.856Z',
    user: {
      username: 'Charlie'
    }
  }
]

let store
beforeEach(() => {
  store = createStore(rootReducer, applyMiddleware(thunk))
})

const div = document.createElement('div')


it ('renders without crashing', ()=> {
  ReactDOM.render(<Provider store={store}>
                    <Router>
                      <CommentContainer 
                        relativePath={"/resources/:id"} 
                        resourceId={1} />
                    </Router>
                  </Provider>, 
                  div
                  )
})

it ('loads comments upon rendering', ()=> {
  expect(store.getState().comments.loadStatus).toBe(null)
  render(<Provider store={store}>
            <Router>
            <CommentContainer 
              relativePath={"/resources/:id"} 
              resourceId={1}
            />
          </Router>
        </Provider>
        )
 
  expect(store.getState().comments.loadStatus).not.toBe(null)
})

it ('authorizes users upon rendering', ()=> {

})

it ('fetches comments again if the resources loads after the first fetch', ()=> {

})

it ('renders a Comments component', ()=> {

})

describe('new comment routing', ()=> {
  it ('renders a CommentForm component if there is a valid user', ()=> {

  })
  it ('renders a login modal if there is NOT a valid user', ()=> {

  })
})

