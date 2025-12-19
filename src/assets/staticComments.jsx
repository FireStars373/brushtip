const mockComments = [
  {
    id: 1,
    text: "This is a top-level comment",
    user: {
      id: 10,
      username: "john_doe",
      profileImg: "https://via.placeholder.com/32"
    },
    likes: 3,
    date: "2025-01-01T10:00:00Z",
    replies: [
      {
        id: 2,
        text: "This is a reply to the top-level comment",
        user: {
          id: 11,
          username: "alice",
          profileImg: "https://via.placeholder.com/32"
        },
        likes: 1,
        date: "2025-01-01T10:05:00Z",
        replies: [
          {
            id: 3,
            text: "Reply to a reply (nested)",
            user: {
              id: 12,
              username: "bob",
              profileImg: "https://via.placeholder.com/32"
            },
            likes: 0,
            date: "2025-01-01T10:10:00Z",
            replies: []
          }
        ]
      },
      {
        id: 4,
        text: "Another reply to the top-level comment",
        user: {
          id: 13,
          username: "charlie",
          profileImg: "https://via.placeholder.com/32"
        },
        likes: 2,
        date: "2025-01-01T10:15:00Z",
        replies: []
      }
    ]
  },
  {
    id: 5,
    text: "Second top-level comment",
    user: {
      id: 14,
      username: "diana",
      profileImg: "https://via.placeholder.com/32"
    },
    likes: 5,
    date: "2025-01-01T11:00:00Z",
    replies: []
  }
];

export default mockComments;

