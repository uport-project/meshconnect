/* ------------------------- External Dependencies -------------------------- */
import React from 'react'
import { Switch } from 'react-router-dom';
/* ------------------------- Internal Dependencies -------------------------- */
import { site as siteRoutes } from 'routes'
import { 
  Route, Absolute
 } from 'atomic'

import SiteHeader from 'layout/zones/site/SiteHeader'
import SiteMain from 'layout/zones/site/SiteMain'
import SiteFooter from 'layout/zones/site/SiteFooter'
import { Footer }  from 'components/zones'

/* ---------------------------- Module Package ------------------------------ */
export default props => (
<Absolute left right top bottom>
  {/* Header Zone */}
  {!props.zones.header ? null: (
    <SiteHeader {...props.header.layout} >
      <Switch>
        { siteRoutes.map(route=> !route.header ? null : <Route exact path={route.path} component={route.header} />)}
      </Switch>
    </SiteHeader>
  )}


  {/* Main Zone */}
  {!props.zones.main ? null: (
    <SiteMain {...props.main.layout}>
      <Switch>
        { siteRoutes.map(route=> !route.main ? null : <Route exact path={route.path} component={route.main} />)}
      </Switch>
    </SiteMain>
  )}

  {/* Footer Zone */}
  {!props.zones.footer ? null :(
    <SiteFooter {...props.footer.layout}>
      <Footer/>
    </SiteFooter>
  )}
</Absolute>)

