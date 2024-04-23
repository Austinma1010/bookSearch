import { gql } from '@apollo/client';

export const QUERY_BOOKS = gql`
query Query($id: ID!) {
    user(_id: $id) {
      username
      savedBooks {
        title
        link
        image
        description
        bookId
        authors
      }
    }
  }
`;
