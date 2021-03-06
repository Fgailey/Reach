import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loader from '../../pages/loadingGif/Loader';
import PostItem from './PostItem';
import PostForm from './PostForm';
import { getPostsByUser } from '../../actions/Post';

const PostsDashboard = ({ getPostsByUser, post: { posts, loading }, user }) => {
  useEffect(() => {
    getPostsByUser(user._id);
  }, [getPostsByUser, user]);

  return loading ? (
    <Loader />
  ) : (
    <Fragment>
      <div className='d-flex justify-content-center mb-0 pt-2'>
        <h2 className='prim'>Your Posts</h2>
      </div>
      <PostForm />
      <div className='posts'>
        {posts.map(post => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </Fragment>
  );
};

PostsDashboard.propTypes = {
  getPostsByUser: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post,
  user: state.auth.user
});

export default connect(mapStateToProps, { getPostsByUser })(PostsDashboard);
