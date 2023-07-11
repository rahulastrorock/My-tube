import React from "react";
const CommentsData = [
  {
    name: "Rahul Singh",
    text: "This is a comment",
    replies: [
      {
        name: "Rohit Singh",
        text: "This is a reply",
        replies: [
          {
            name: "Sakshi Singh",
            text: "This is a reply",
            replies: [],
          },
        ],
      },
    ],
  },
  {
    name: "Aryan Singh",
    text: "This is a comment",
    replies: [
      {
        name: "Rahul Singh",
        text: "This is a reply",
        replies: [
          {
            name: "Dhananjai Singh",
            text: "This is a reply",
            replies: [],
          },
        ],
      },
    ],
  },
  {
    name: "Rahul Singh",
    text: "This is a comment",
    replies: [
      {
        name: "Rohit Singh",
        text: "This is a reply",
        replies: [
          {
            name: "Sakshi Singh",
            text: "This is a reply",
            replies: [],
          },
        ],
      },
    ],
  },
  {
    name: "Aryan Singh",
    text: "This is a comment",
    replies: [
      {
        name: "Rahul Singh",
        text: "This is a reply",
        replies: [
          {
            name: "Dhananjai Singh",
            text: "This is a reply",
            replies: [],
          },
        ],
      },
    ],
  },
  {
    name: "Rahul Singh",
    text: "This is a comment",
    replies: [
      {
        name: "Rohit Singh",
        text: "This is a reply",
        replies: [
          {
            name: "Sakshi Singh",
            text: "This is a reply",
            replies: [],
          },
        ],
      },
    ],
  },
  {
    name: "Aryan Singh",
    text: "This is a comment",
    replies: [
      {
        name: "Rahul Singh",
        text: "This is a reply",
        replies: [
          {
            name: "Dhananjai Singh",
            text: "This is a reply",
            replies: [],
          },
        ],
      },
    ],
  },
  {
    name: "Rahul Singh",
    text: "This is a comment",
    replies: [
      {
        name: "Rohit Singh",
        text: "This is a reply",
        replies: [
          {
            name: "Sakshi Singh",
            text: "This is a reply",
            replies: [],
          },
        ],
      },
    ],
  },
  {
    name: "Aryan Singh",
    text: "This is a comment",
    replies: [
      {
        name: "Rahul Singh",
        text: "This is a reply",
        replies: [
          {
            name: "Dhananjai Singh",
            text: "This is a reply",
            replies: [],
          },
        ],
      },
    ],
  },
  {
    name: "Rahul Singh",
    text: "This is a comment",
    replies: [
      {
        name: "Rohit Singh",
        text: "This is a reply",
        replies: [
          {
            name: "Sakshi Singh",
            text: "This is a reply",
            replies: [],
          },
        ],
      },
    ],
  },
  {
    name: "Aryan Singh",
    text: "This is a comment",
    replies: [
      {
        name: "Rahul Singh",
        text: "This is a reply",
        replies: [
          {
            name: "Dhananjai Singh",
            text: "This is a reply",
            replies: [],
          },
        ],
      },
    ],
  },
  {
    name: "Rahul Singh",
    text: "This is a comment",
    replies: [
      {
        name: "Rohit Singh",
        text: "This is a reply",
        replies: [
          {
            name: "Sakshi Singh",
            text: "This is a reply",
            replies: [],
          },
        ],
      },
    ],
  },
  {
    name: "Aryan Singh",
    text: "This is a comment",
    replies: [
      {
        name: "Rahul Singh",
        text: "This is a reply",
        replies: [
          {
            name: "Dhananjai Singh",
            text: "This is a reply",
            replies: [],
          },
        ],
      },
    ],
  },
];

const Comment = ({ data }) => {
  const { name, text, replies } = data;
  return (
    <div className="flex shadow-sm bg-gray-100 p-2 rounded-lg my-2">
      <img
        className="w-12 h-12 "
        alt="user"
        src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
      />
      <div
        className="
      px-3"
      >
        <p className="font-bold">{name}</p>
        <p>{text}</p>
      </div>
    </div>
  );
};

const CommentList = ({ comments }) => {
  //disclaimer: dont use index as key, use id instead
  return comments.map((comment, index) => (
    <div>
      <Comment key={index} data={comment} />
      <div className="pl-6 border border-l-black ml-5">
        {/* nested comments where we are calling the same component recursively  */}
        <CommentList comments={comment.replies} />
      </div>
    </div>
  ));
};

const CommentsContainer = () => {
  return (
    <div className="m-5 p-2">
      <h1 className="text-2xl font-bold">Comments:</h1>
      <CommentList comments={CommentsData} />
    </div>
  );
};

export default CommentsContainer;
