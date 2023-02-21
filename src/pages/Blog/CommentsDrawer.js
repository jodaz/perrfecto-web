import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import DialogTitle from '../../components/DialogTitle';
import CommentCard from './CommentCard';
import CommentBox from './CommentBox';
import { apiProvider } from '../../api';
import useEffectOnce from '../../utils/useEffectOnce';

const CommentsDrawer = ({ openComments, handleClose, item }) => {
    const [loading, setLoading] = React.useState(true)
    const [comments, setComments] = React.useState([])
    const [commentItem, setCommentItem] = React.useState(item) // Blog by default
    const [isReplying, setIsReplying] = React.useState(false);

    const fetchComments = async () => {
        setLoading(true)

        try {
            const res = await apiProvider.get(`/api/blog/comments/${item.id}`)

            if (res.status >= 200 && res.status < 300) {
                const { data: { data } } = res;

                setComments(data)
                setLoading(false)
            }
        } catch (e) {
            console.log(e);
            setLoading(false)
        }
    }

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

    useEffectOnce(() => { fetchComments() }, []);

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
                    {comments.length
                    ? comments.map(comment => (
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
                    fetchComments={fetchComments}
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
