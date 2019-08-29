[![Build Status](https://travis-ci.org/didasmbalanya/E-petition.svg?branch=develop)](https://travis-ci.org/didasmbalanya/E-petition)
[![Coverage Status](https://coveralls.io/repos/github/didasmbalanya/E-petition/badge.svg?branch=develop)](https://coveralls.io/github/didasmbalanya/E-petition?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/4b892d6c808d738d04a4/maintainability)](https://codeclimate.com/github/didasmbalanya/E-petition/maintainability)

# E- PETITIONER
An online platform that allows users to create and participate in petitions.
## Vision
The vision of this project is to help the government know it’s citizens concerns faster & easier way without them having to demonstrate.

## API ENDPOINTS
### *BASEURL : `/api/v1/`*

### AUTHENTICATION END POINTS  : `/auth/`

HTTP METHOD | END POINT | AUTHENTICATED | DESCRIPTION
-----------|----------|--------------|------
POST | `/signup` | `False` | Create a New User
POST | `/signin` | `False` | Authenticate The User
GET | `/facebook` | `False` | Login With Facebook

### PETITIONS END POINTS

HTTP METHOD | END POINT | AUTHENTICATED | DESCRIPTION
-----------|----------|--------------|------
GET | `/petitions` | `False` | Get all Petitions
GET | `/petitions/:id` | `False` | Get  specific petition by id
GET | `/petitions?title=name` | `False` | Get petition by title
POST | `/petitions` | `True` | Create a Petition
PATCH | `/petitions/:id/votes/upvote` | `True` | Vote a Petition Up
PATCH | `/petitions/:id/votes/downvote` | `True` | Vote against Petition
DELETE | `/petitions/:id` | `True` | Delete a Petition
