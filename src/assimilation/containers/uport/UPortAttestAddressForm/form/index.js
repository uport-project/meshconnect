/* ------------------------- External Dependencies -------------------------- */
import React from 'react'
import { Field } from 'redux-form'

/* ------------------------- Internal Dependencies -------------------------- */
import { Box, Button, Heading, ReduxField } from 'atomic'
import Form from 'molecules/Form'
import StyleFieldDefault from 'static/style/StyleFieldDefault'
/* ---------------------------- Form Component ------------------------------ */
export default ({ handleSubmit, isSubmitting, styled, ...props}) => (
<Form {...styled}>
  <Heading level={[3]} f={[3]}>
    Location Attestation
  </Heading>
    <Field name="identityAddressStreet" placeholder="Street" component={ReduxField} type="text" {...StyleFieldDefault} />
    <Field name="identityAddressCity" placeholder="City" component={ReduxField} type="text" {...StyleFieldDefault} />
    <Field name="identityAddressState" placeholder="State" component={ReduxField} type="text" {...StyleFieldDefault} />
    <Field name="identityAddressCountry" placeholder="Country" component={ReduxField} type="text" {...StyleFieldDefault} />
  <Box mt={10} >
    <Button type="submit" onClick={handleSubmit} gradient='cherry'w={1} >Submit</Button>
  </Box>
</Form>
)