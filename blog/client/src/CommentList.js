import React from "react";

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ comments }) => {
  const renderedComments = comments.map((comment) => {

    let content;

    if(comment.status==='approved'){
      content = comment.content;
    };
    if(comment.status==='pending'){
      content ='This Comment Needs Moderations';
    };
    if(comment.status==='rejected'){
     content ='This Comment Has Been Rejected';
    
    };
    // return <li key={comment.id}>{comment.content}</li>;
    return <li key={comment.id}>{content}</li>;
  });

  return <ul>{renderedComments}</ul>;
};
