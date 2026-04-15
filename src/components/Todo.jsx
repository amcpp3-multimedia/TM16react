import React from 'react';
import { ListItem, ListItemText, ListItemSecondaryAction, IconButton, Paper, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { db } from '../firebase.js';
import { doc, deleteDoc } from 'firebase/firestore';

const Todo = ({ arr }) => {
    return (
        <Paper 
            elevation={2} 
            style={{ 
                marginBottom: '12px', 
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.9)',
                overflow: 'hidden',
                transition: 'transform 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.01)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
            <ListItem style={{ borderLeft: '6px solid #8B00FF' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                    <AutoAwesomeIcon sx={{ color: '#8B00FF', marginRight: '15px', fontSize: '20px' }} />
                    <ListItemText 
                        primary={arr.item.todo} 
                        primaryTypographyProps={{ style: { fontWeight: '600', color: '#2c3e50' } }}
                        secondary="Energia Registada"
                    />
                </Box>
                <ListItemSecondaryAction>
                    <IconButton 
                        edge="end" 
                        onClick={() => deleteDoc(doc(db, 'TM16projectofinal', arr.id))}
                        sx={{ color: '#ff4d4d', '&:hover': { color: '#b30000' } }}
                    >
                        <DeleteIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        </Paper>
    );
};

export default Todo;