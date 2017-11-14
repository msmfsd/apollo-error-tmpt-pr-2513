import { graphql, print } from "graphql";
import { ApolloLink, Observable } from "apollo-link";
import { schema } from "./schema";

let toggle = true

export const link = new ApolloLink(operation => {
  return new Observable(observer => {
    const { query, operationName, variables } = operation;
    delay(2000)
      .then(() =>
        graphql(schema, print(query), null, null, variables, operationName)
      )
      .then(result => {
        const res = toggle ? result : new Error('an error')
        toggle = !toggle
        observer.next(res);
        observer.complete();
      })
      .catch(observer.error.bind(observer));
  });
});

function delay(ms) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}
