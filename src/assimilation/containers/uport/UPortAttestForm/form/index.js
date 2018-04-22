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
    Identity Attestation
  </Heading>
    <Field name="identityEmailProfessional" placeholder="Email Professional" component={ReduxField} type="text" {...StyleFieldDefault} />
    <Field name="identityTwitter" placeholder="Twitter" component={ReduxField} type="text" {...StyleFieldDefault} />
    <Field name="identityGithub" placeholder="Github" component={ReduxField} type="text" {...StyleFieldDefault} />
    <Field name="identityRiot" placeholder="Riot" component={ReduxField} type="text" {...StyleFieldDefault} />
  <Box mt={10} >
    <Button type="submit" onClick={handleSubmit} gradient='cherry'w={1} >Submit</Button>
  </Box>
</Form>
)