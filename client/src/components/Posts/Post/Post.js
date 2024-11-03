import React, { useState } from 'react';
import { CardContent, Button, Typography } from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ThumbUpAltOutlined from '@mui/icons-material/ThumbUpAltOutlined';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

import { likePost, deletePost } from '../../../actions/posts';
import { StyledCard, StyledMedia, Overlay, Overlay2, Details, Title, CardActions, CardAction } from './styles';
import defaultImage from '../../../images/defaultImage.jpg';

function Likes({ likes, userId }) {
  if (likes.length > 0) {
    return likes.find((like) => like === userId) ? (
      <>
        <ThumbUpAltIcon fontSize="small" />
        &nbsp;
        {likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}`}
      </>
    ) : (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}
      </>
    );
  }
  return (
    <>
      <ThumbUpAltOutlined fontSize="small" />
      &nbsp;Like
    </>
  );
}

export default function Post({ post, setCurrentId }) {
  const user = JSON.parse(localStorage.getItem('profile'));
  const [likes, setLikes] = useState(post?.likes);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId = user?.result.googleId || user?.result?._id;
  const hasLikedPost = post.likes.find((like) => like === userId);

  const handleLike = async () => {
    dispatch(likePost(post._id));

    if (hasLikedPost) {
      setLikes(post.likes.filter((id) => id !== userId));
    } else {
      setLikes([...post.likes, userId]);
    }
  };

  const openPost = () => {
    navigate(`/posts/${post._id}`);
  };

  return (
    <StyledCard raised elevation={6}>
      <CardAction component="span" onClick={openPost}>
        <StyledMedia image={post.selectedFile || defaultImage} title={post.title} />
        <Overlay>
          <Typography variant="h6">{post.name}</Typography>
          <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
        </Overlay>
        {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
          <Overlay2 name="edit">
            <Button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentId(post._id);
              }}
              style={{ color: 'white' }}
              size="small"
            >
              <MoreHorizIcon fontSize="default" />
            </Button>
          </Overlay2>
        )}
        <Details>
          <Typography variant="body2" color="textSecondary" component="h2">
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
        </Details>
        <Title>
          <Typography gutterBottom variant="h5" component="h2">
            {post.title}
          </Typography>
        </Title>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {post.message.split(' ').splice(0, 20).join(' ')}...
          </Typography>
        </CardContent>
      </CardAction>
      <CardActions>
        <Button size="small" color="primary" disabled={!user?.result} onClick={handleLike}>
          <Likes likes={likes} userId={userId} />
        </Button>
        {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
          <Button size="small" color="secondary" onClick={() => dispatch(deletePost(post._id))}>
            <DeleteIcon fontSize="small" /> &nbsp; Delete
          </Button>
        )}
      </CardActions>
    </StyledCard>
  );
}
