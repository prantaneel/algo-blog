const axios = require("axios");

function deleteFromArray(arr, blogid, OUT_OF_BOUNDS) {
    var returnData = OUT_OF_BOUNDS;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].blog_id === blogid) {
        returnData = arr[i];
        arr.splice(i, 1);
        break;
      }
    }
    return returnData;
};
function findInArr(arr, blogid, OUT_OF_BOUNDS) {
    var returnVar = OUT_OF_BOUNDS;
    arr.forEach((element) => {
      if (element.blog_id === blogid) {
        returnVar = element;
      }
    });
    return returnVar;
};
function adminApprove(
    approveBody,
    pendingArray,
    declinedArray,
    blogArray,
    OUT_OF_BOUNDS
  ) {
    var appCode = parseInt(approveBody.approve_code);
    var blogid = parseInt(approveBody.blog_id);
    var rev = parseInt(approveBody.rev);
    var addData = deleteFromArray(pendingArray, blogid, OUT_OF_BOUNDS);
    if (addData === OUT_OF_BOUNDS)
      addData = deleteFromArray(declinedArray, blogid, OUT_OF_BOUNDS);
    if (appCode === 1) {
      if (rev > 0) {
        for (articles in blog_data.blogs) {
          if (blog_data.blogs[articles].blog_id === blogid) {
            //console.log(blog_data.blogs[articles]);
            blog_data.blogs[articles].blog_title = addData.blog_title;
            blog_data.blogs[articles].blog_html = addData.blog_html;
            return;
          }
        }
      }
      if (addData !== OUT_OF_BOUNDS) blogArray.push(addData);
    } else {
      if (addData !== OUT_OF_BOUNDS) declinedArray.push(addData);
    }
};
async function getTime(url = "") {
    var responseData = await axios.get(url).then((response) => {
      //console.log(response);
      return response;
    });
    return responseData.data;
};

module.exports={
    getTime,
    adminApprove,
    findInArr,
    deleteFromArray,
};