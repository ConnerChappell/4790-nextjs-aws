# 4790 Next.js App Project

Deployed at [connerchappell.xyz](https://connerchappell.xyz/)

Created using [TheSportsDB API](https://www.thesportsdb.com/) and AWS Amplify

## Requirements/Features:

#### Effectively use conditional logic, JavaScript array methods, and front-end framework elements to render large lists on the web client

- [Line 90](https://github.com/ConnerChappell/4790-nextjs-aws/blob/main/src/pages/teams/index.js) – map is used to display a list of saved teams
- [Line 28](https://github.com/ConnerChappell/4790-nextjs-aws/blob/main/src/components/TeamFoundDialog.js) – map is used to display a list of searched teams
- [Line 118](https://github.com/ConnerChappell/4790-nextjs-aws/blob/main/src/pages/teams/index.js) – conditional logic is used to replace the jersey if it's null
- [Line 123](https://github.com/ConnerChappell/4790-nextjs-aws/blob/main/src/pages/teams/index.js) – conditional logic is used to determine if the logged in user is the owner of the saved team

#### Work with the proper libraries to create and manage the NextJS front-end portion of your project using a real development toolset

- [Line 1](https://github.com/ConnerChappell/4790-nextjs-aws/blob/main/src/pages/teams/index.js) – React imported here and throughout the project to manage the front-end
- [Line 7 - 17](https://github.com/ConnerChappell/4790-nextjs-aws/blob/main/src/pages/teams/index.js) – MUI components imported here and throughout the project

#### Work with Yarn/NPM, Amplify CLI, and Amplify Studio to create and manage the back-end portion of your project

- [package.json file](https://github.com/ConnerChappell/4790-nextjs-aws/blob/main/package.json)
- [Amplify Folder](https://github.com/ConnerChappell/4790-nextjs-aws/tree/main/amplify)

#### Use Amplify to create, use, and manage:

- A GraphQL Data Model and associated API
    - [GraphQL Data Model](https://github.com/ConnerChappell/4790-nextjs-aws/blob/main/amplify/backend/api/4790nextjsaws/schema.graphql)
- An Authentication workflow using AWS Cognito users to signup, login, and logout users via a valid email address
    - [Line 31](https://github.com/ConnerChappell/4790-nextjs-aws/blob/main/src/pages/_app.js) – Authenticator from AWS Amplify wraps the entire app and enables a user to sign up, sign in, and sign out
- A mix of Page and API routes within your NextJS code
    - [Pages Folder](https://github.com/ConnerChappell/4790-nextjs-aws/tree/main/src/pages)
    - [API Route](https://github.com/ConnerChappell/4790-nextjs-aws/blob/main/src/pages/api/team.js)
-   A simple example of Authorization using Cognito users to conditionally render UI or access a page route
    - [Line 123](https://github.com/ConnerChappell/4790-nextjs-aws/blob/main/src/pages/teams/index.js) – conditional logic is used to determine if the logged in user is the owner of the saved team