/* ------------------------- External Dependencies -------------------------- */
import React from 'react'
import Flex from 'atoms/Flex'
/* ------------------------- Internal Dependencies -------------------------- */
import MenuDrawer from 'components/menus/MenuDrawer'
/* ------------------------------- Component -------------------------------- */
export default props => 
<div>
  <Flex direction='column' w={[1]} >
    <MenuDrawer owner="aside" />
  </Flex>
</div>
