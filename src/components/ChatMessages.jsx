import React from 'react';
import { Box, Typography, CircularProgress, Paper } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

const ChatBubble = ({ message }) => (
    <Paper
        elevation={3}
        sx={{
            p: 1,
            mb: 1,
            maxWidth: '70%',
            alignSelf: message.position === 'right' ? 'flex-end' : 'flex-start',
            bgcolor: message.position === 'right' ? 'primary.main' : 'grey.200',
            color: message.position === 'right' ? 'primary.contrastText' : 'text.primary',
            borderRadius: 2,
        }}
    >
        <Typography variant="body2">{message.text}</Typography>
    </Paper>
);

const ChatMessages = ({ bubbleData, aiResponseLoading }) => {
    return (
        <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2, display: 'flex', flexDirection: 'column' }}>
            {bubbleData.map((message, index) => (
                <ChatBubble key={index} message={message} />
            ))}
            <AnimatePresence>
                {aiResponseLoading && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
                            <CircularProgress size={20} sx={{ mr: 1 }} />
                            <Typography variant="body2">AI is thinking...</Typography>
                        </Box>
                    </motion.div>
                )}
            </AnimatePresence>
        </Box>
    );
};

export default ChatMessages;
