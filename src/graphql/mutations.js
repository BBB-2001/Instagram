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

export const CREATE_COMMENT = gql`
  mutation CreateComment($postId: Int!, $content: String!) {
    createComment(postId: $postId, content: $content) {
      content
      comments_count
      created_at
      id
      like_count
      original_reply_id
      post_id
      updated_at
      user_id
      user {
        id
        username
        name
      }
      replies {
        replies {
          comments_count
          content
          created_at
          id
          like_count
          post {
            id
            user_id
          }
          post_id
          updated_at
          user {
            id
            post_count
            updated_at
            username
            created_at
            email
            followers_count
            name
          }
          user_id
        }
      }
    }
  }
`;

export const GET_SINGLE_POST = gql`
  mutation GetSinglePost($postId: Int!) {
    getSinglePost(postId: $postId) {
      comments_count
      content
      created_at
      file
      id
      is_liked
      is_saved
      like_count
      likes {
        user {
          username
          id
        }
        user_id
      }
      post_replies {
        content
        id
        created_at
        original_reply_id
        user {
          id
          username
        }
        user_id
      }
      post_tagged {
        id
        user {
          username
          id
        }
      }
      user {
        username
        id
        name
        profile_photo
      }
      user_id
    }
  }
`;
