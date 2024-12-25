import mongoose from 'mongoose';
import Post from './database/models/Post.js'; 

mongoose.connect(process.env.uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// const createPost = async () => {
//   try {
//     const post = await Post.create({
//       title: "new title",
//       description: "new description",
//       content: "new content"
//     });
//     console.log('Post created', post);
//   } catch (err) {
//     console.error('Error creating post:', err);
//   }
// };


const UpdatePosts = async () => {
  try {
    const posts = await Post.findByIdAndUpdate(
      "676a98f0e94221eaee1272b4", 
      { title: "sowmya" }, 
      { new: true } 
    )
    console.log('Posts:', posts); 
  } catch (err) {
    console.error('Error retrieving posts:', err);
  }
};
const DeletePosts = async () => {
  try {
    const posts = await Post.findByIdAndDelete(
      "676a97a8600bf6c1272c09b8"
    )
    console.log('Posts:', posts); 
  } catch (err) {
    console.error('Error retrieving posts:', err);
  }
};

const getPosts = async () => {
  try {
    const posts = await Post.find(); 
    // const posts = await Post.findById("676a98f0e94221eaee1272b4"); 
    console.log('Posts:', posts); 
  } catch (err) {
    console.error('Error retrieving posts:', err);
  }
};

// DeletePosts()
getPosts()


