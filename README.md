# Happy

This is my first full project using React and node.js

It was made following the Rocketseat's next level week #3

Many things I have done by the book, many things I made it my own way, always experimentig

This project is not meant to be run on production, this is a study case

### How do I get it working?
**Requirements**
- Node.js
- yarn
- expo-cli

**Instructions**

#### Clone this repo

```bash
git clone git@github.com:swalker2/nlw3-happy.git
```

#### Create your `.env` files and make changes as you wish:
- `backend/.env`
- `web/.env`
- `mobile/.env`


#### Install dependencies

```bash
cd nlw3-happy \
 && cd backend && yarn \
 && cd ../web && yarn \
 && cd ../mobile && yarn && \
 cd ..
```

#### Run the project
concurrently will start all 3 projects at the same time

```bash
yarn dev
```

---
### Backend
#### Use cases
- Orphanages
  - Save location and images
  - All orphanages (active)
  - Orphanage details
- Management
  - User registration and authentication
  - List Orphanages
  - Approve Orphanage created on web/mobile
  - Edit Orphanage

#### Tools
- Node.js
  - Express for routing
  - TypeORM for database management (used sqlite in this case)
  - Yup for validation
  - multer for file uploads

---
### Web
#### Use cases
- Include orphanages
  - Select the location on map
  - Especify all information and save
- List Orphanages
  - Show locations on map
  - Show name with details link on click

#### Tools
- React
  - Leaflet for maps
  - Made my own validation [error handling class](https://github.com/swalker2/nlw3-happy/blob/master/web/src/util/errors.tsx)
  - react-router-dom for navigation
  - axios for api requests

---
### Mobile
#### Use cases
- Orphanages
  - Set location by taping on map
  - Load images from phone
  - Detect current location
  - List all active orphanages
  - Orphanage details

#### Tools
- React native
  - Expo for components
  - react-native-maps for map
  - react-native-svg, converted images using [React SVGR](https://react-svgr.com/playground/?native=true)
- Made my own [Onboarding](https://github.com/swalker2/nlw3-happy/blob/master/mobile/src/pages/Onboarding.tsx) using ScrollView
