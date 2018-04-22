/* ------------------------- External Dependencies -------------------------- */
import React from 'react'
import Particles from 'react-particles-js';
/* ------------------------- Internal Dependencies -------------------------- */
import { 
  Flex, Box,
  Button, Container, Heading, Image, Paragraph, Section,
  Absolute,
} from 'atomic'
import DialogOpen from 'containers/dialog/DialogOpen'
import UportCredentialsRequest from 'assimilation/containers/uport/UPortCredentialsRequest'
import PunchTheClock from 'features/PunchTheClock'
/* ------------------------------- Component -------------------------------- */
export default props => 
<Box {...props} px={[20,40]} color='white' pos='relative' >
<Absolute left right top bottom >
  <Particles
    params={{
      "particles": {
        "number": {
          "value": 188,
          "density": {
            "enable": true,
            "value_area": 700
          }
        },
        "color": {
          "value": ["#aa73ff", "#f8c210", "#83d238", "#33b1f8"]
        },
        "shape": {
          "type": "circle",
          "stroke": {
            "width": 0,
            "color": "#000000"
          },
          "polygon": {
            "nb_sides": 25
          }
        },
        "opacity": {
          "value": 0.5,
          "random": false,
          "anim": {
            "enable": false,
            "speed": 1.5,
            "opacity_min": 0.15,
            "sync": false
          }
        },
        "size": {
          "value": 2.5,
          "random": false,
          "anim": {
            "enable": true,
            "speed": 2,
            "size_min": 0.15,
            "sync": false
          }
        },
        "line_linked": {
          "enable": true,
          "distance": 110,
          "color": "#33b1f8",
          "opacity": 0.25,
          "width": 1
        },
        "move": {
          "enable": true,
          "speed": 1.6,
          "direction": "none",
          "random": false,
          "straight": false,
          "out_mode": "out",
          "bounce": false,
          "attract": {
            "enable": false,
            "rotateX": 600,
            "rotateY": 1200
          }
        }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": {
            "enable": false,
            "mode": "repulse"
          },
          "onclick": {
            "enable": false,
            "mode": "push"
          },
          "resize": true
        },
        "modes": {
          "grab": {
            "distance": 400,
            "line_linked": {
              "opacity": 1
            }
          },
          "bubble": {
            "distance": 400,
            "size": 40,
            "duration": 2,
            "opacity": 8,
            "speed": 3
          },
          "repulse": {
            "distance": 200,
            "duration": 0.4
          },
          "push": {
            "particles_nb": 4
          },
          "remove": {
            "particles_nb": 2
          }
        }
      },
      "retina_detect": true
    }}
  />
</Absolute>
  <Container w={[1200]} my={[50,120]} >
    <Flex direction={['column', 'row']} align='center' justify={['center']} >
      <Box w={[1]} color="white" ta="center" >
      <Heading level={[3]} f={[4,5]}mb={25} ta='center' >
        MeshConnect
      </Heading>
      <Paragraph f={[1]}>
        An experiment to merge the physical and digital world.
      </Paragraph>
      </Box>
    </Flex>
  </Container>
</Box>