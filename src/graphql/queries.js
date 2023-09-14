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
