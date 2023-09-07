import { gql } from "@apollo/client";
export const REGISTER = gql`
  mutation Register(
    $name: String!
    $username: String!
    $email: String!
    $password: String!
  ) {
    register(
      name: $name
      username: $username
      email: $email
      password: $password
    ) {
      token
      user {
        id
        name
        email
        username
      }
    }
  }
`;

export const LOGIN = gql`
  mutation Login($identifier: String!, $password: String!) {
    login(identifier: $identifier, password: $password) {
      token
      user {
        id
        name
        username
        email
        profile_photo
        post_count
        followings_count
        followers_count
      }
    }
  }
`;
export const SEND_RESET_EMAIL = gql`
  mutation SendResetEmail($email: String!) {
    sendResetEmail(email: $email)
  }
`;
export const RESET_PASSWORD = gql`
  mutation ResetPassword($token: String!, $newPassword: String!) {
    resetPassword(token: $token, newPassword: $newPassword)
  }
`;
