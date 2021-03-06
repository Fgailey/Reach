import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/Post';
import { MDBContainer, MDBModal, MDBModalBody } from 'mdbreact';
import Emoji from '../emoji/emojiPicker';
import SmilePic from '../emoji/smily.png';

class PostForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      toggle: false
    };

    this.setText = this.setText.bind(this);
    this.setToggle = this.setToggle.bind(this);
  }

  setToggle(toggle) {
    this.setState({ toggle });
  }

  setText(text) {
    this.setState({ text });
  }

  appendEmoji(emoji) {
    this.setText(this.state.text + emoji);
  }

  render() {
    const { text, toggle } = this.state;

    return (
      <div className='post-form'>
        <form
          className='form my-1'
          onSubmit={e => {
            e.preventDefault();
            this.props.addPost({ text });
            this.setText('');
          }}
        >
          <textarea
            className='form-control z-depth-1'
            name='text'
            rows='5'
            placeholder='Write something here...'
            value={text}
            onChange={e => this.setText(e.target.value)}
            required
          />
          <input
            type='submit'
            className='btn peach-gradient btn-sm my-1'
            value='Submit'
            id='postSubmit'
          />
        </form>

        <div onClick={() => this.setToggle(true)}>
          <img className='smilyPic' src={SmilePic} alt='Smiley face' />
        </div>
        <MDBContainer>
          <MDBModal
            size='sm'
            side
            position='bottom-right'
            toggle={() => this.setToggle(false)}
            isOpen={toggle}
          >
            <MDBModalBody>
              <Emoji appendEmoji={this.appendEmoji.bind(this)} />
            </MDBModalBody>
          </MDBModal>
        </MDBContainer>
      </div>
    );
  }
}

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired
};

export default connect(null, { addPost })(PostForm);
