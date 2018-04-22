import FrontHeader from 'views/site/header/Front'
import FrontMain from 'views/site/main/Front'

export default [
  {
    path: "/",
    header: FrontHeader,
    main: FrontMain,
    meta: {
      exact: true,
    }
  },

  
]