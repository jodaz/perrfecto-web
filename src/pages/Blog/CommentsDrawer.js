import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import DialogTitle from '../../components/DialogTitle';
import CommentCard from './CommentCard';
import CommentBox from './CommentBox';

const CommentsDrawer = ({ openComments, handleClose, item }) => {
    const [commentItem, setCommentItem] = React.useState(item) // Blog by default
    const [isReplying, setIsReplying] = React.useState(false);

    const toggleReply = (comment = null) => {
        if (comment) {
            setCommentItem(comment)
        } else {
            setCommentItem(item)
        }

        setIsReplying(!isReplying)
    };

    const toggleDrawer = () => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
    };

    const list = (anchor) => (
        <>
            <DialogTitle onClose={() => handleClose()}>
                Comentarios
            </DialogTitle>
            <Divider />
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                overflowY: 'auto',
                height: '100%'
            }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    overflowY: 'auto',
                    height: '100%'
                }}>
                    {item.Comments.length
                    ? item.Comments.map(comment => (
                        <CommentCard
                            {...comment}
                            openReply={() => toggleReply(comment)}
                        />
                    ))
                    : (
                        <Box m={1}>
                            Sin comentarios
                        </Box>
                    )}
                </Box>
                <Divider />
                <CommentBox
                    item={commentItem}
                    isReplying={isReplying}
                    closeReply={() => toggleReply()}
                />
            </Box>
        </>
    );

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Drawer
                    anchor={'bottom'}
                    open={openComments}
                    onClose={toggleDrawer('bottom', false)}
                    sx={{
                        '& .MuiPaper-root': {
                            position: 'absolute',
                            borderTopLeftRadius: '12px',
                            borderTopRightRadius: '12px',
                            width: '99%',
                            bottom: 0,
                            height: '50%'
                        },
                    }}
                    PaperProps={{ style: { position: 'absolute' } }}
                    BackdropProps={{ style: { position: 'absolute' } }}
                    ModalProps={{
                        container: document.getElementById('comments-drawer-container'),
                        style: { position: 'absolute' }
                    }}
                >
                    {list('bottom')}
                </Drawer>
            </Box>
        </Box>
    );
}

export default CommentsDrawer
