import { gql } from "@apollo/client";
export const POSTS = gql`
  query Posts {
    posts {
      is_liked
      is_saved
      id
      file
      content
      like_count
      comments_count
      created_at
      user {
        id
        name
        username
        profile_photo
      }
      likes {
        id
        user_id
        user {
          id
          name
          username
          profile_photo
        }
      }
      saves {
        post_id
        id
        user {
          id
          name
          username
        }
      }
      post_replies {
        id
        content
        like_count
        created_at
        updated_at
        user {
          id
          name
          username
          profile_photo
        }
      }
      post_tagged {
        id
        user {
          id
          name
          username
        }
      }
    }
  }
`;

export const GET_SINGLE_POST = gql`
  query Query($postId: Int!) {
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
