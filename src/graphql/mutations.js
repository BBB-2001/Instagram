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

export const POST_FRAGMENT = gql`
  fragment PostDetails on Post {
    is_liked
    is_saved
    content
    comments_count
    created_at
    file
    id
    like_count
    user {
      id
      name
      username
      profile_photo
    }
    likes {
      id
      user {
        id
        name
        username
        profile_photo
      }
    }
    post_replies {
      id
      content
      like_count
      comments_count
      original_reply_id
      created_at
      updated_at
      user {
        name
        username
        profile_photo
        id
      }
    }
    saves {
      post_id
      id
      user {
        id
        name
        username
        profile_photo
      }
    }
  }
`;

export const LIKE = gql`
  mutation likePost($postId: Int!) {
    likePost(postId: $postId) {
      ...PostDetails
    }
  }
  ${POST_FRAGMENT}
`;

export const UNLIKE = gql`
  mutation unlikePost($postId: Int!) {
    unlikePost(postId: $postId) {
      ...PostDetails
    }
  }
  ${POST_FRAGMENT}
`;

export const SAVE_POST = gql`
  mutation savePost($postId: Int!) {
    savePost(postId: $postId) {
      ...PostDetails
    }
  }
  ${POST_FRAGMENT}
`;

export const UNSAVE_POST = gql`
  mutation unsavePost($postId: Int!) {
    unsavePost(postId: $postId) {
      ...PostDetails
    }
  }
  ${POST_FRAGMENT}
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
