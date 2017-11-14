# Apollo Client Error Template

See pr2513: https://github.com/apollographql/apollo-client/issues/2513

#### to test
- `npm run start`
- Click `REFETCH WITH ERROR`
- click `REFETCH WITH DATA`

#### result
- error not cleared on a successful refetch result
- loading not updated while doing a refetch
- people data not set to undefined on error
