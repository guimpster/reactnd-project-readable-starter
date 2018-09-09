## FrontEnd Server

To install and start the Frontend server, run the following commands in this directory:

* `npm install`
* `npm start`

## Files description
```bash
├── README.md - This file.
├── package.json # npm package manager file.
├── public
│   ├── favicon.ico # React default Icon
│   └── index.html # app root start
└── src
    ├── actions 
    │   └── index.js # redux actions and action creators
    ├── api     
    │   └── index.js # backend server api helpers
    ├── components 
    │   ├── CommentFormDialog.js # material-ui dialog for comments
    │   ├── If.js # simple if react directive
    │   ├── OrderByButton.js # orderby button using material-ui tables
    │   ├── PostCard.js # a simple post entry
    │   └── PostFormDialog.js # material-ui dialog for posts
    ├── constants
    │   └── ActionTypes.js # redux action types
    ├── containers # all components that use redux' 'connect' are here
    │   ├── App.js # main system component container
    │   ├── CategoriesHeader.js # application header container
    │   ├── PostCardDetails.js # post details container
    │   └── PostsView.js # posts list container
    ├── reducers 
    │   ├── categories.js # categories reducers
    │   ├── comments.js # comments reducers
    │   ├── index.js # merges all reducers in this folder
    │   ├── posts.js # posts reducers
    │   └── utils.js # common functions used in some reducers
    ├── store
    │   └── configureStore.js # global redux store configuration
    ├── App.css # Styles for your app.
    ├── index.css # Global styles.
    └── index.js # DOM rendering, redux store root and react-router-dom.
```

## Contributing

This repository is private only. Therefore, pull requests will most likely not be accepted.
