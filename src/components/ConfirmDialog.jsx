import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Box,
  Typography,
  IconButton
} from '@mui/material';
import { Warning } from '@mui/icons-material';

export const ConfirmDialog = ({
  open,
  onClose,
  onConfirm,
  title,
  content,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle id="alert-dialog-title">
        <Box display="flex" alignItems="center">
          <Warning color="warning" sx={{ fontSize: 30, mr: 1 }} />
          <Typography variant="h6">{title}</Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined">
          {cancelText}
        </Button>
        <Button 
          onClick={onConfirm} 
          color="error" 
          variant="contained"
          autoFocus
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};