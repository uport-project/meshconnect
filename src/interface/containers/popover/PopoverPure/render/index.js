/* ------------------------- External Dependencies -------------------------- */
import React from 'react'
import Popover from 'react-popover'
/* ------------------------- Internal Dependencies -------------------------- */
/* --------------------------- Styled Components ---------------------------- */
import Item from 'components/core/Item'
/* ------------------------------- Component -------------------------------- */
export default (props) =>(
    <Popover
    isOpen={props.isOpen}
    place={props.place || 'below'}
    preferPlace={props.preferPlace || 'below'}
    body={
      !props.body 
      ? <Item foundry={props.foundry} {...props} /> 
      : (typeof props.body === 'function')
        ? React.createElement(props.body, props)
        : React.cloneElement(props.body, props)
    }
    tipSize={0.1}
    onOuterAction={() =>{props.togglePopover(n => n = n ? false : true); props.popoverClose()}  }
  >
    <div onClick={() => {props.togglePopover(n => n = n ? false : true); props.popoverOpen()}}>
    {props.children}
    </div>
  </Popover>
)