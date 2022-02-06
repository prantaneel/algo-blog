const mongoose = require("mongoose");
const blogSchema = mongoose.Schema({
  blog_data: {
    type: Object,
  },
  pending_requests: {
    type: Object,
  },
  denied_blogs: {
    type: Object,
  },
  users: {
    type: Array,
  },
  blogIdState: {
    type: Number,
  },
});

const BlogData = mongoose.model("BlogData", blogSchema);
module.exports = BlogData;
