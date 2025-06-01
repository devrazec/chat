import React, { useEffect, Suspense, useContext, useState } from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';

import {
  Box,
  Typography,
  Avatar,
  IconButton,
  TextField,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Badge,
  Chip,
} from '@mui/material';

import {
  Search as SearchIcon,
  KeyboardArrowDown as ArrowDownIcon,
  Menu as MenuIcon,
  Phone as PhoneIcon,
  VideoCall as VideoCallIcon,
  Info as InfoIcon,
  MoreVert as MoreVertIcon,
  AttachFile as AttachFileIcon,
  EmojiEmotions as EmojiIcon,
  Send as SendIcon,
} from '@mui/icons-material';

import PersonIcon from '@mui/icons-material/Person';

// Context
import { DataContext } from '../context/DataProvider';

const contacts = [
  {
    id: 1,
    name: 'Alene',
    role: 'Technical Department',
    avatar: '',
    lastSeen: '2h ago',
    unreadCount: 2,
    isOnline: true,
    isActive: true,
  },
  {
    id: 2,
    name: 'Keefe',
    role: 'Support Executive',
    avatar: '',
    lastSeen: '1:20 AM',
    unreadCount: 2,
    isOnline: true,
  },
  {
    id: 3,
    name: 'Lazaro',
    role: 'Resource Investigator',
    avatar: '',
    lastSeen: 'Yesterday',
    unreadCount: 1,
    isOnline: true,
  },
  {
    id: 4,
    name: 'Hazle',
    role: 'Teamworker',
    avatar: '',
    lastSeen: '4/25/2021',
    unreadCount: 0,
  },
  {
    id: 5,
    name: 'Herman Essertg',
    role: 'Co-ordinator',
    avatar: '',
    lastSeen: '4/25/2021',
    unreadCount: 0,
  },
  {
    id: 6,
    name: 'Wilhelmine Durrg',
    role: 'Monitor Evaluator',
    avatar: '',
    lastSeen: '4/25/2021',
    unreadCount: 0,
  },
  {
    id: 7,
    name: 'Agillulf Fuxg',
    role: 'Specialist',
    avatar: '',
    lastSeen: '4/25/2021',
    unreadCount: 0,
  },
  {
    id: 8,
    name: 'Herman Essertg',
    role: 'Co-ordinator',
    avatar: '',
    lastSeen: '4/25/2021',
    unreadCount: 0,
  },
  {
    id: 9,
    name: 'Wilhelmine Durrg',
    role: 'Monitor Evaluator',
    avatar: '',
    lastSeen: '4/25/2021',
    unreadCount: 0,
  },
  {
    id: 10,
    name: 'Agillulf Fuxg',
    role: 'Specialist',
    avatar: '',
    lastSeen: '4/25/2021',
    unreadCount: 0,
  },
];

const messages = [
  {
    id: 1,
    text: 'Hi Good Morning!',
    time: '11:23 AM',
    isSent: true,
  },
  {
    id: 2,
    text: 'Hey. Very Good morning. How are you?',
    time: '11:23 AM',
    isSent: false,
  },
  {
    id: 3,
    text: 'Good. Thank you',
    time: '11:23 AM',
    isSent: true,
  },
  {
    id: 4,
    text: 'I need your minute, are you available?',
    time: '11:23 AM',
    isSent: false,
  },
  {
    id: 5,
    text: 'Hi Good Morning!',
    time: '11:23 AM',
    isSent: true,
  },
  {
    id: 6,
    text: 'Hey. Very Good morning. How are you?',
    time: '11:23 AM',
    isSent: false,
  },
  {
    id: 7,
    text: 'Good. Thank you',
    time: '11:23 AM',
    isSent: true,
  },
  {
    id: 8,
    text: 'I need your minute, are you available?',
    time: '11:23 AM',
    isSent: false,
  },
  {
    id: 9,
    text: 'Hi Good Morning!',
    time: '11:23 AM',
    isSent: true,
  },
  {
    id: 10,
    text: 'Hey. Very Good morning. How are you?',
    time: '11:23 AM',
    isSent: false,
  },
  {
    id: 11,
    text: 'Good. Thank you',
    time: '11:23 AM',
    isSent: true,
  },
  {
    id: 12,
    text: 'I need your minute, are you available?',
    time: '11:23 AM',
    isSent: false,
  },
];

export default function Chat() {
  const { darkMode, setDarkMode } = useContext(DataContext);
  const location = useLocation();
  const navigate = useNavigate();

  const [selectedContact, setSelectedContact] = useState(contacts[0]);
  const [messageText, setMessageText] = useState('');

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // Handle sending message
      setMessageText('');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const getAvatarContent = (avatar) => (
    <Avatar src={avatar || undefined} sx={{ width: 40, height: 40 }}>
      {!avatar && <PersonIcon fontSize="small" />}
    </Avatar>
  );

  return (
    <>
      <Box sx={{ display: 'flex', height: '100vh', bgcolor: '#f5f5f5' }}>
        {/* Left Sidebar */}
        <Box
          sx={{
            width: 320,
            overflow: 'auto',
            bgcolor: 'white',
            borderRight: '1px solid #e0e0e0',
          }}
        >
          {/* User Profile Header */}
          <Box sx={{ p: 2, borderBottom: '1px solid #e0e0e0' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <div style={{ width: 40, height: 40 }}></div>
                <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                  React Chat + AceBase
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Contacts List */}
          <List sx={{ px: 1 }}>
            {contacts.map((contact) => (
              <ListItem
                key={contact.id}
                onClick={() => setSelectedContact(contact)}
                sx={{
                  borderRadius: 2,
                  mb: 0.5,
                  cursor: 'pointer',
                  bgcolor: contact.isActive ? '#e3f2fd' : 'transparent',
                  '&:hover': {
                    bgcolor: contact.isActive ? '#e3f2fd' : '#f5f5f5',
                  },
                }}
              >
                <ListItemAvatar>
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    badgeContent={
                      contact.isOnline ? (
                        <Box
                          sx={{
                            width: 12,
                            height: 12,
                            borderRadius: '50%',
                            bgcolor: '#4caf50',
                            border: '2px solid white',
                          }}
                        />
                      ) : null
                    }
                  >
                    {getAvatarContent(contact.avatar)}
                  </Badge>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography
                      component="div"
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <span>{contact.name}</span>
                      <span style={{ fontSize: 12, color: '#757575' }}>{contact.lastSeen}</span>
                    </Typography>
                  }
                  secondary={
                    <Typography
                      component="div"
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mt: 0.5,
                      }}
                    >
                      <span>{contact.role}</span>
                      {contact.unreadCount > 0 && (
                        <Chip
                          label={contact.unreadCount}
                          size="small"
                          sx={{
                            bgcolor: '#9c27b0',
                            color: 'white',
                            height: 20,
                            fontSize: '12px',
                            '& .MuiChip-label': { px: 1 },
                          }}
                        />
                      )}
                    </Typography>
                  }
                />

              </ListItem>
            ))}
          </List>
        </Box>

        {/* Main Chat Area */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Chat Header */}
          <Box
            sx={{ p: 2, bgcolor: 'white', borderBottom: '1px solid #e0e0e0' }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              {/* Search Bar */}
              <Box sx={{}}>
                <TextField
                  fullWidth
                  placeholder="Search Message"
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      bgcolor: '#f8f9fa',
                    },
                  }}
                />
              </Box>
            </Box>
          </Box>

          {/* Messages Area */}
          <Box sx={{ flex: 1, p: 2, overflow: 'auto', bgcolor: '#f8f9fa' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {messages.map((message) => (
                <Box
                  key={message.id}
                  sx={{
                    display: 'flex',
                    justifyContent: message.isSent ? 'flex-end' : 'flex-start',
                  }}
                >
                  <Paper
                    sx={{
                      p: 2,
                      maxWidth: '70%',
                      bgcolor: message.isSent ? '#e3f2fd' : '#f3e5f5',
                      borderRadius: 2,
                      borderBottomRightRadius: message.isSent ? 0 : 2,
                      borderBottomLeftRadius: message.isSent ? 2 : 0,
                    }}
                  >
                    <Typography variant="body1" sx={{ mb: 0.5 }}>
                      {message.text}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {message.time}
                    </Typography>
                  </Paper>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Message Input */}
          <Box sx={{ p: 2, bgcolor: 'white', borderTop: '1px solid #e0e0e0' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <TextField
                fullWidth
                placeholder="Type a Message"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyPress={handleKeyPress}
                size="small"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 3,
                    bgcolor: '#f8f9fa',
                  },
                }}
              />
              <IconButton
                onClick={handleSendMessage}
                sx={{
                  bgcolor: '#2196f3',
                  color: 'white',
                  '&:hover': { bgcolor: '#1976d2' },
                }}
              >
                <SendIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
