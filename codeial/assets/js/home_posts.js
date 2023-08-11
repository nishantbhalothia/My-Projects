{
  console.log("Home Posts JS Loaded");
  let createPost = function () {
    let newPostForm = $("#new-post-form");
    newPostForm.submit(function (e) {
      e.preventDefault();

      $.ajax({
        type: "post",
        url: "/posts/create",
        data: newPostForm.serialize(),
        success: function (data) {
          console.log(data);
          let newPost = newPostDom(data.data.post);
          $("#posts-list-container>ul").prepend(newPost);
          deletePost($(" .delete-post-button", newPost));

          // call the create comment class
          new ToggleLike($(" .toggle-like-button", newPost));

          new Noty({
            theme: "relax",
            text: "Post published!",
            type: "success",
            layout: "topRight",
            timeout: 1500,
          }).show();
        },
        error: function (error) {
          console.log(error.responseText);
        },
      });
    });
  };

  // method to create a post in DOM
  let newPostDom = function (post) {
    return $(`<li id="post-${post._id}">
        
        <div class="post-content">
                <span class="post-content">${post.content}</span> </br>
                <span class="post-user">Posted By : &nbsp;${post.user.name}</span> </br>
                <span class="post-date">Posted at :${post.createdAt}</span> </br>
                <span>
                <% if (locals.user){ %>
                    <a class="toggle-like-button " data-likes="<%= post.likes.length %>" href="/likes/toggle/?id=${post._id}&type=Post">
                        <i class="fa-regular fa-heart" style="color: #d20f53;"></i></i>likes
                    </a>
                <%} %>
            </span>
                <form action="/posts/destroy/${post._id}" method="post">
                    <button props="/posts/destroy/${post._id}" class="delete-post-button" type="submit">Delete Post</button>
                </form>
        </div>
        <div class="post-comments">

                <form action="/comments/create" method="POST">
                    <input type="text" name="content" placeholder="Type Here to add comment..." required>
                    <input type="hidden" name="post" value="${post._id}">
                    <input type="submit" value="Add Comment">
                </form>

            <div class="post-comments-list">
                <ul id="post-comments-${post._id}">

                </ul>
            </div>
        </div>

    </li>`);
  };

  // method to delete a post from DOM

  let deletePost = function (deleteLink) {
    $(deleteLink).click(function (e) {
      e.preventDefault();

      let deleteURL = $(deleteLink).attr("props"); // Get the delete URL from the delete button
      console.log(deleteURL,deleteLink);
      $.ajax({
        type: "post",
        url: deleteURL, // Use the extracted delete URL
        success: function (data) {
          console.log(data.data);
          $(`#post-${data.data.post_id}`).remove();
          new Noty({
            theme: "relax",
            text: "Post Deleted!",
            type: "success",
            layout: "topRight",
            timeout: 1500,
          }).show();
        },
        error: function (error) {
          console.log(error.responseText);
        },
      });
    });
  };

  


  createPost();
}

{
  //   create comment
  let createComment = function () {
    let newCommentForm = $("#new-comment-form");
    newCommentForm.submit(function (e) {
      e.preventDefault();

      $.ajax({
        type: "post",
        url: "/comments/create",
        data: newCommentForm.serialize(),
        success: function (data) {
          console.log(data);
          let newComment = newCommentDom(data.data.comment);
          $(`#post-comments-${data.data.comment.post}`).prepend(newComment);
          deleteComment(
            $(`#comment-${data.data.comment._id} .delete-comment-button`)
          );
          new Noty({
            theme: "relax",
            text: "Comment published!",
            type: "success",
            layout: "topRight",
            timeout: 1500,
          }).show();
        },
        error: function (error) {
          console.log(error.responseText);
        },
      });
    });
  };

  // method to create a comment in DOM
  let newCommentDom = function (comment) {
    return $(`<li id="comment-${comment._id}">
                <span class="post-comment-user">By :&nbsp;${comment.user.name}</span> </br>
                <span class="post-comment-content">${comment.content}</span> </br>

                    <form action="/comments/destroy/${comment._id}" method="post">
                        <button type="submit">Delete Comment</button>
                    </form>
            </li>`);
  };

  //   delete comment
  let deleteComment = function (deleteLink) {
    $(deleteLink).click(function (e) {
      e.preventDefault();

      $.ajax({
        type: "get",
        url: $(deleteLink).prop("href"),
        success: function (data) {
          console.log(data);
          $(`#comment-${data.data.comment_id}`).remove();
          new Noty({
            theme: "relax",
            text: "Comment Deleted!",
            type: "success",
            layout: "topRight",
            timeout: 1500,
          }).show();
        },
        error: function (error) {
          console.log(error.responseText);
        },
      });
    });
  };

  createComment();
}
