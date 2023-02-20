const loadPostBtn = document.querySelector("button");
const postIdInput = document.querySelector("input");
const postContentDiv = document.querySelector(".body");
const postId = document.querySelector(".postid");
const postTitleDiv = document.querySelector(".titleText");
const postUserIdDiv = document.querySelector(".user");
const postCommentsBtn = document.querySelector(".commentsBtn");
const postCommentsDiv = document.querySelector(".comments");

let commentsLoaded = false;

loadPostBtn.addEventListener("click", () => {
  const postId = postIdInput.value;
  if (!postId) {
    alert("Please enter a post ID!");
    return;
  }
  loadPost(postId)
    .then(() => {
      if (!commentsLoaded) {
        postCommentsBtn.style.display = "block";
      }
    })
    .catch((error) => {
      alert(`Error loading post: ${error}`);
    });
});

postCommentsBtn.addEventListener("click", () => {
  const postId = postIdInput.value;

  if (!postId) {
    alert("Please enter a post ID!");
    return;
  }
  if (commentsLoaded) {
    return;
  }
  loadComments(postId)
    .then(() => {
      commentsLoaded = true;
    })
    .catch((error) => {
      alert(`Error loading comments: ${error}`);
    });
});

function loadPost(id) {
  return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then((response) => response.json())
    .then((data) => {
      postContentDiv.textContent = `Body: ${data.body}`;
      postTitleDiv.textContent = `Title: ${data.title}`;
      postUserIdDiv.textContent = `User-id: ${data.userId}`;
      postId.textContent = `Post-id: ${data.id}`;
    });
}

function loadComments(postId) {
  postId = postIdInput.value;

  return fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((comment) => {
        const commentDiv = document.createElement("div");
        commentDiv.textContent = `${comment.email}: ${comment.body}`;
        postCommentsDiv.appendChild(commentDiv);
        postCommentsDiv.classList.add("mr");
        commentDiv.classList.add("mr");
      });
    });
}
