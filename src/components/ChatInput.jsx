import React, { useState } from 'react';
import { Box, TextField, IconButton, Tooltip, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { AiOutlineSend } from 'react-icons/ai';
import { CopyToClipboard } from '@uiw/copy-to-clipboard';

const ChatInput = ({ handleSend, loading, aiResponseLoading }) => {
    const [text, setText] = useState('');
    const [isCode, setIsCode] = useState(false);
    const [codeLanguage, setCodeLanguage] = useState('');

    const onSend = () => {
        handleSend(text);
        setText('');
        setIsCode(false);
        setCodeLanguage('');
    };

    const detectCode = (input) => {
        // Detects if the input follows a coding pattern and extracts the language
        const codeBlockPattern = /'''(\w+)\n([\s\S]*?)\n'''---/g;
        const matches = [...input.matchAll(codeBlockPattern)];

        if (matches.length > 0) {
            setIsCode(true);
            setCodeLanguage(matches[0][1]); // Extracted language from the first code block
            setText(matches.map(match => match[2]).join('\n\n')); // Extracted code content from all code blocks
        } else {
            setIsCode(false);
            setCodeLanguage('');
            setText(input);
        }
    };

    return (
        <Box component="form" onSubmit={(e) => { e.preventDefault(); onSend(); }} sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
            <Box display="flex" alignItems="center">
                <TextField
                    fullWidth
                    placeholder="Type your message or paste code block..."
                    value={text}
                    onChange={(e) => detectCode(e.target.value)}
                    disabled={loading || aiResponseLoading}
                    variant="outlined"
                    sx={{ mr: 1, whiteSpace: isCode ? 'pre-wrap' : 'normal' }}
                    InputProps={{
                        sx: { borderRadius: 4 },
                    }}
                    multiline={isCode}
                />
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Tooltip title="Send Message">
                        <IconButton
                            color="primary"
                            onClick={onSend}
                            disabled={loading || aiResponseLoading}
                            size="large"
                        >
                            <AiOutlineSend />
                        </IconButton>
                    </Tooltip>
                </motion.div>
            </Box>
            {isCode && (
                <Box sx={{ mt: 2, p: 2, backgroundColor: '#f5f5f5', borderRadius: 2, position: 'relative' }}>
                    <Typography variant="caption" color="primary" sx={{ fontWeight: 'bold', mb: 1 }}>
                        {codeLanguage.toUpperCase()} Code
                    </Typography>
                    <CopyToClipboard text={text}>
                        <Tooltip title="Copy Code">
                            <IconButton sx={{ position: 'absolute', top: 4, right: 4 }}>
                                📋
                            </IconButton>
                        </Tooltip>
                    </CopyToClipboard>
                    <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', margin: 0 }}>{text}</pre>
                </Box>
            )}
        </Box>
    );
};

export default ChatInput;